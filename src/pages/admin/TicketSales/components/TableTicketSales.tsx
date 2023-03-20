import { Box, Typography } from '@mui/material';
import { ColumnsType } from 'antd/es/table';
import { MapPinIcon } from 'assets';
import AntTable from 'components/AntTable/AntTable';
import Tag from 'components/Tag/Tag';
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';
import dayjs from 'dayjs';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { RECORDS_PER_PAGE } from 'services/TicketSale/getTicketSales';
import { selectAuth } from 'store/auth/selectors';
import { selectTicketSales } from 'store/ticketSales/selectors';
import { ticketSalesActions } from 'store/ticketSales/ticketSalesSlice';
import { getPaginationFromAntdTable } from 'utils/getPaginationFromAntdTable';
import { getSorterParamsFromAntdTable } from 'utils/getSorterParamsFromAntdTable';
import { getPaymentStatusTag } from '../utils/getPaymentStatusTag';
import { ticketSaleModelToColumnTicket } from '../utils/ticketSaleModelToColumnTicket';
import { ColumnTicket } from './ColumnTicket';

export const TableTicketSales = () => {
  const { t } = useTranslation(['ticketSales', 'translation']);

  const navigate = useNavigate();

  const { statusGetTicketSales, ticketSales, totalRows, currentPage, currentSearcher } = useAppSelector(selectTicketSales);
  const { userInfo } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const isAgent = userInfo?.role === 'agent';

  const columns: ColumnsType<ColumnTicket> = useMemo(() => {
    return [
      {
        key: 'passengers.lastName',
        dataIndex: 'passengers.lastName',
        width: 90,
        title: () => t('ticketSales:lastName'),
        render: (_, row) => {
          return (
            <Typography sx={{ cursor: 'pointer' }} fontSize="14px">
              {row.lastName}
            </Typography>
          );
        },
      },
      {
        key: 'passengers.firstName',
        dataIndex: 'passengers.firstName',
        width: 90,
        title: () => t('ticketSales:firstName'),
        render: (_, row) => {
          return (
            <Typography sx={{ cursor: 'pointer' }} fontSize="14px">
              {row.firstName}
            </Typography>
          );
        },
      },
      {
        key: 'trip',
        dataIndex: 'trip',
        width: 180,
        title: () => t('ticketSales:trip'),
        render: (_, row) => {
          return (
            <>
              <TextWithIcon icon={MapPinIcon} text={row.departurePoint} typography={{ fontSize: '14px' }} color="#1AA6EE" />
              <TextWithIcon icon={MapPinIcon} text={row.arrivalPoint} typography={{ fontSize: '14px' }} color="#1AA6EE" />
            </>
          );
        },
      },
      {
        key: 'createdAt',
        dataIndex: 'createdAt',
        title: () => t('ticketSales:dateTime'),
        width: 140,
        sorter: () => 0,
        render: (_, row) => {
          return <Typography>{dayjs(row.dateTime).format('MM/DD/YYYY - HH:mm')}</Typography>;
        },
      },
      {
        key: 'totalPax',
        dataIndex: 'totalPax',
        title: () => t('ticketSales:paxCount'),
        width: 120,
        align: 'center',
        sorter: () => 0,
        render: (_, row) => {
          return <Typography>{row.rawData.totalPax}</Typography>;
        },
      },
      {
        key: 'paymentStatus',
        dataIndex: 'paymentStatus',
        title: () => t('ticketSales:payment_status'),
        width: 120,
        align: 'center',
        sorter: () => 0,
        render: (_, row) => {
          const { color, backgroundColor } = getPaymentStatusTag(row.paymentStatus);
          return <Tag color={color} backgroundColor={backgroundColor} text={row.paymentStatus} />;
        },
      },
      {
        key: 'orderCode',
        dataIndex: 'orderCode',
        title: () => t('ticketSales:order_id'),
        width: 80,
        align: 'center',
        sorter: () => 0,
        render: (_, row) => {
          return <Typography>{row.orderId}</Typography>;
        },
      },
      {
        key: 'creator',
        dataIndex: 'creator',
        title: () => t('ticketSales:createdBy'),
        width: 120,
        align: 'center',
        sorter: () => 0,
        render: (_, row) => {
          return <Typography>{row.createdBy}</Typography>;
        },
      },
    ];
  }, [t]);

  const dataSource: ColumnTicket[] = useMemo(() => {
    const result: ColumnTicket[] = [];
    ticketSales.forEach(ticketSale => {
      ticketSale.passengers.forEach(passenger => {
        result.push(ticketSaleModelToColumnTicket(ticketSale, passenger));
      });
    });
    return result;
  }, [ticketSales]);

  return (
    <Box my="30px">
      <AntTable
        loading={statusGetTicketSales === 'loading'}
        columns={columns}
        dataSource={dataSource}
        rowKey={record => record._id}
        onRow={record => {
          return {
            onClick: () => {
              const nextUrl = isAgent ? '/agent/ticket-sales/' : '/admin/ticket-sales/';
              navigate(nextUrl + record.rawData.orderCode, { state: record });
            },
          };
        }}
        pagination={{
          total: totalRows,
          showLessItems: true,
          showSizeChanger: false,
          pageSize: RECORDS_PER_PAGE,
          current: currentPage + 1,
        }}
        onChange={(pagination, _, sorter, extra) => {
          dispatch(
            ticketSalesActions.getTicketSalesRequest({
              page: getPaginationFromAntdTable({ pagination, extra }),
              sorter: getSorterParamsFromAntdTable({ sorter }),
              searcher: currentSearcher,
            }),
          );
        }}
      />
    </Box>
  );
};
