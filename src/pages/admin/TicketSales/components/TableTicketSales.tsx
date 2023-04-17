import { Box } from '@mui/material';
import { ColumnsType } from 'antd/es/table';
import { MapPinIcon } from 'assets';
import ActionTable from 'components/ActionTable/ActionTable';
import AntTable from 'components/AntTable/AntTable';
import { AntTableColumnDisplayAsTypograph } from 'components/AntTableColumnTitle/AntTableColumnDisplayAsTypograph';
import { AntTableColumnTitle } from 'components/AntTableColumnTitle/AntTableColumnTitle';
import Tag from 'components/Tag/Tag';
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';
import dayjs from 'dayjs';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { PaymentStatusBackgroundColorMapping, PaymentStatusColorMapping, PaymentStatusLabelMapping } from 'models/PaymentStatus';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { RECORDS_PER_PAGE } from 'services/TicketSale/getTicketSales';
import { selectAuth } from 'store/auth/selectors';
import { selectTicketSales } from 'store/ticketSales/selectors';
import { ticketSalesActions } from 'store/ticketSales/ticketSalesSlice';
import { getPaginationFromAntdTable } from 'utils/getPaginationFromAntdTable';
import { getSorterParamsFromAntdTable } from 'utils/getSorterParamsFromAntdTable';
import { v4 } from 'uuid';
import { ticketSaleModelToColumnTicket } from '../utils/ticketSaleModelToColumnTicket';
import { ColumnTicket } from './ColumnTicket';
import { useStyles } from './styles';

export const TableTicketSales = () => {
  const { t } = useTranslation(['ticketSales', 'translation']);
  const classes = useStyles();

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
        width: 85,
        title: () => <AntTableColumnTitle>{t('ticketSales:lastName')}</AntTableColumnTitle>,
        render: (_, row) => {
          return <AntTableColumnDisplayAsTypograph>{row.lastName}</AntTableColumnDisplayAsTypograph>;
        },
      },
      {
        key: 'passengers.firstName',
        dataIndex: 'passengers.firstName',
        width: 88,
        title: () => <AntTableColumnTitle>{t('ticketSales:firstName')}</AntTableColumnTitle>,
        render: (_, row) => {
          return <AntTableColumnDisplayAsTypograph>{row.firstName}</AntTableColumnDisplayAsTypograph>;
        },
      },
      {
        key: 'trip',
        dataIndex: 'trip',
        width: 140,
        title: () => <AntTableColumnTitle>{t('ticketSales:trip')}</AntTableColumnTitle>,
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
        key: 'departureTime',
        dataIndex: 'departureTime',
        title: () => <AntTableColumnTitle>{t('ticketSales:departureTime')}</AntTableColumnTitle>,
        width: 145,
        sorter: () => 0,
        render: (_, row) => {
          return <AntTableColumnDisplayAsTypograph>{dayjs(row.departureTime).format('MM/DD/YYYY - HH[H]mm')}</AntTableColumnDisplayAsTypograph>;
        },
      },
      {
        key: 'totalPax',
        dataIndex: 'totalPax',
        title: () => <AntTableColumnTitle>{t('ticketSales:paxCount')}</AntTableColumnTitle>,
        width: 110,
        align: 'center',
        sorter: () => 0,
        render: (_, row) => {
          return <AntTableColumnDisplayAsTypograph>{row.rawData.totalPax}</AntTableColumnDisplayAsTypograph>;
        },
      },
      {
        key: 'paymentStatus',
        dataIndex: 'paymentStatus',
        title: () => <AntTableColumnTitle>{t('ticketSales:payment_status')}</AntTableColumnTitle>,
        width: 120,
        align: 'center',
        sorter: () => 0,
        render: (_, row) => {
          return (
            <Tag
              color={PaymentStatusColorMapping[row.paymentStatus]}
              backgroundColor={PaymentStatusBackgroundColorMapping[row.paymentStatus]}
              text={PaymentStatusLabelMapping[row.paymentStatus]}
            />
          );
        },
      },
      {
        key: 'orderCode',
        dataIndex: 'orderCode',
        title: () => <AntTableColumnTitle>{t('ticketSales:order_id')}</AntTableColumnTitle>,
        width: 100,
        align: 'center',
        sorter: () => 0,
        render: (_, row) => {
          return <AntTableColumnDisplayAsTypograph>{row.orderId}</AntTableColumnDisplayAsTypograph>;
        },
      },
      {
        key: 'creator',
        dataIndex: 'creator',
        title: () => <AntTableColumnTitle>{t('ticketSales:createdBy')}</AntTableColumnTitle>,
        width: 120,
        align: 'center',
        sorter: () => 0,
        render: (_, row) => {
          return <AntTableColumnDisplayAsTypograph>{row.createdBy}</AntTableColumnDisplayAsTypograph>;
        },
      },
      {
        key: 'creator',
        dataIndex: 'creator',
        title: () => <AntTableColumnTitle>{t('ticketSales:createdBy')}</AntTableColumnTitle>,
        width: 120,
        align: 'center',
        sorter: () => 0,
        render: (_, row) => {
          return <AntTableColumnDisplayAsTypograph>{row.createdBy}</AntTableColumnDisplayAsTypograph>;
        },
      },
      {
        key: 'action',
        title: () => <AntTableColumnTitle>{t('translation:action')}</AntTableColumnTitle>,
        render: (_, row) => <ActionTable actions={[]} row={row} />,
        align: 'center',
        width: 70,
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
        rowKey={() => v4()}
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
        rowClassName={classes.cursor}
      />
    </Box>
  );
};
