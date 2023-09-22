import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ColumnsType } from 'antd/es/table';
import { MapPinIcon } from 'assets';
import AntTable from 'components/AntTable/AntTable';
import { AntTableColumnDisplayAsTypograph } from 'components/AntTableColumnTitle/AntTableColumnDisplayAsTypograph';
import { AntTableColumnTitle } from 'components/AntTableColumnTitle/AntTableColumnTitle';
import Tag from 'components/Tag/Tag';
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';
import { TicketStatus } from 'components/TicketStatus/TicketStatus';
import dayjs from 'dayjs';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { PaymentStatusBackgroundColorMapping, PaymentStatusColorMapping, PaymentStatusLabelMapping } from 'models/PaymentStatus';
import { useStyles } from 'pages/admin/Routers/components/DialogMultiStopTripDetail/SubRoute';
import { memo, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ReportTicketSale } from 'services/models/ReportTicketSale';
import { SeatType } from 'services/models/TicketSale';
import { reportsActions } from 'store/report/reportSlice';
import { selectReports } from 'store/report/selectors';
import { getPaginationFromAntdTable } from 'utils/getPaginationFromAntdTable';
import { getSorterParamsFromAntdTable } from 'utils/getSorterParamsFromAntdTable';
import { v4 } from 'uuid';

const SeatTypeMappingToTagColor: Record<SeatType, string> = {
  VIP: 'rgba(255, 182, 0, 1)',
  ECO: 'rgba(51, 204, 127, 1)',
};

function TableReporting() {
  const classes = useStyles();
  const { t } = useTranslation(['reportings']);

  const { statusGetTicketSales, ticketSales, totalRows, currentPage, currentSearcher } = useAppSelector(selectReports);
  const dispatch = useAppDispatch();

  const columns: ColumnsType<ReportTicketSale> = useMemo(() => {
    return [
      {
        key: 'passengers.lastName',
        dataIndex: 'passengers.lastName',
        width: 140,
        title: () => <AntTableColumnTitle>{t('reportings:lastName')}</AntTableColumnTitle>,
        render: (_, row) => {
          return <AntTableColumnDisplayAsTypograph>{row.passengers.lastName}</AntTableColumnDisplayAsTypograph>;
        },
      },
      {
        key: 'passengers.firstName',
        dataIndex: 'passengers.firstName',
        width: 140,
        title: () => <AntTableColumnTitle>{t('reportings:firstName')}</AntTableColumnTitle>,
        render: (_, row) => {
          return <AntTableColumnDisplayAsTypograph>{row.passengers.firstName}</AntTableColumnDisplayAsTypograph>;
        },
      },
      {
        key: 'trip',
        dataIndex: 'trip',
        width: 135,
        title: () => <AntTableColumnTitle>{t('reportings:trip')}</AntTableColumnTitle>,
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
        title: () => <AntTableColumnTitle>{t('reportings:departureTime')}</AntTableColumnTitle>,
        width: 145,
        sorter: () => 0,
        render: (_, row) => {
          return (
            <Box>
              <AntTableColumnDisplayAsTypograph>{dayjs(row.departureTime).format('DD/MM/YYYY')}</AntTableColumnDisplayAsTypograph>
              <AntTableColumnDisplayAsTypograph>{dayjs(row.departureTime).format('HH[H]mm')}</AntTableColumnDisplayAsTypograph>
            </Box>
          );
        },
      },
      {
        key: 'paymentStatus',
        dataIndex: 'paymentStatus',
        title: () => <AntTableColumnTitle>{t('reportings:status')}</AntTableColumnTitle>,
        width: 140,
        align: 'center',
        render: (_, row) => {
          return (
            <Tag
              color={PaymentStatusColorMapping[row.paymentStatus]}
              backgroundColor={PaymentStatusBackgroundColorMapping[row.paymentStatus]}
              text={t(`translation:${PaymentStatusLabelMapping[row.paymentStatus]}`)}
            />
          );
        },
      },
      {
        key: 'ticketStatus',
        dataIndex: 'ticketStatus',
        title: () => <AntTableColumnTitle>{t('reportings:ticket_status')}</AntTableColumnTitle>,
        width: 140,
        align: 'center',
        render: (_, row) => {
          return (
            <TicketStatus
              sx={{
                border: 'none !important',
                textTransform: 'capitalize !important',
                fontSize: '12px !important',
                fontWeight: '400 !important',
                display: 'inline-block !important',
                padding: '2px 16px !important',
              }}
              status={row.ticketStatus}
            />
          );
        },
      },
      {
        key: 'type',
        title: () => <AntTableColumnTitle>{t('reportings:type')}</AntTableColumnTitle>,
        width: 140,
        align: 'center',
        render: (_, record) => {
          return <Typography> {t(`translation:${record.passengers?.typeTicket}`)}</Typography>;
        },
      },
      {
        key: 'classes',
        title: () => <AntTableColumnTitle>{t('reportings:classes')}</AntTableColumnTitle>,
        width: 100,
        align: 'center',
        render: (_, record) => {
          return (
            <Box margin="auto" bgcolor={SeatTypeMappingToTagColor[record.passengers?.seatsType]} className={classes.ticketTypeIcon}>
              {t(`routers:${record.passengers?.seatsType}`)}
            </Box>
          );
        },
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

  useEffect(() => {
    dispatch(
      reportsActions.getTicketSalesRequest({
        page: 0,
        searcher: {},
        sorter: {},
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box my="8px">
      <AntTable
        loading={statusGetTicketSales === 'loading'}
        columns={columns}
        dataSource={ticketSales.items}
        rowKey={() => v4()}
        pagination={{
          total: totalRows,
          showLessItems: true,
          showSizeChanger: false,
          pageSize: undefined,
          current: currentPage + 1,
        }}
        onChange={(pagination, _, sorter, extra) => {
          dispatch(
            reportsActions.getTicketSalesRequest({
              page: getPaginationFromAntdTable({ pagination, extra }),
              sorter: getSorterParamsFromAntdTable({ sorter }),
              searcher: currentSearcher,
            }),
          );
        }}
      />
    </Box>
  );
}

export default memo(TableReporting);
