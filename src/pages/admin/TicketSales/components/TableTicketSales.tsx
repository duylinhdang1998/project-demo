import CancelPresentationOutlinedIcon from '@mui/icons-material/CancelPresentationOutlined';
import { Box } from '@mui/material';
import { ColumnsType } from 'antd/es/table';
import { MapPinIcon } from 'assets';
import ActionTable, { ActionItem } from 'components/ActionTable/ActionTable';
import AntTable from 'components/AntTable/AntTable';
import { AntTableColumnDisplayAsTypograph } from 'components/AntTableColumnTitle/AntTableColumnDisplayAsTypograph';
import { AntTableColumnTitle } from 'components/AntTableColumnTitle/AntTableColumnTitle';
import EditIcon from 'components/SvgIcon/EditIcon';
import { ViewIcon } from 'components/SvgIcon/ViewIcon';
import Tag from 'components/Tag/Tag';
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import dayjs from 'dayjs';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { PaymentStatusBackgroundColorMapping, PaymentStatusColorMapping, PaymentStatusLabelMapping } from 'models/PaymentStatus';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TicketTypeLabelMapping } from 'services/models/TicketSale';
import { selectAuth } from 'store/auth/selectors';
import { selectTicketSales } from 'store/ticketSales/selectors';
import { ticketSalesActions } from 'store/ticketSales/ticketSalesSlice';
import { getPaginationFromAntdTable } from 'utils/getPaginationFromAntdTable';
import { getSorterParamsFromAntdTable } from 'utils/getSorterParamsFromAntdTable';
import { v4 } from 'uuid';
import { ticketSaleModelToColumnTicket } from '../utils/ticketSaleModelToColumnTicket';
import { ColumnTicket } from './ColumnTicket';
import { DialogConfirmChangeStatusToCancel } from './DialogConfirmChangeStatusToCancel';
import { TicketStatus } from 'components/TicketStatus/TicketStatus';

export const TableTicketSales = () => {
  const { t } = useTranslation(['ticketSales', 'translation']);

  const [openConfirmCancel, setOpenConfirmCancel] = useState<ColumnTicket | null>(null);

  const navigate = useNavigate();

  const { statusGetTicketSales, queueUpdateOrderStatus, ticketSales, totalRows, currentPage, currentSearcher } = useAppSelector(selectTicketSales);
  const { userInfo } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const isAgent = userInfo?.role === 'agent';

  const handleOpenDialogConfirmCancel = (row: ColumnTicket) => {
    setOpenConfirmCancel(row);
  };

  const handleCloseDialogConfirmCancel = () => {
    setOpenConfirmCancel(null);
  };

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
        width: 85,
        title: () => <AntTableColumnTitle>{t('ticketSales:firstName')}</AntTableColumnTitle>,
        render: (_, row) => {
          return <AntTableColumnDisplayAsTypograph>{row.firstName}</AntTableColumnDisplayAsTypograph>;
        },
      },
      {
        key: 'trip',
        dataIndex: 'trip',
        width: 135,
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
        width: 125,
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
        key: 'totalPax',
        dataIndex: 'totalPax',
        title: () => <AntTableColumnTitle>{t('ticketSales:paxCount')}</AntTableColumnTitle>,
        width: 120,
        align: 'center',
        sorter: () => 0,
        render: (_, row) => {
          return <AntTableColumnDisplayAsTypograph>{row.totalPax}</AntTableColumnDisplayAsTypograph>;
        },
      },
      {
        key: 'ticketStatus',
        dataIndex: 'ticketStatus',
        title: () => <AntTableColumnTitle>{t('ticketSales:ticket_status')}</AntTableColumnTitle>,
        width: 90,
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
        key: 'paymentStatus',
        dataIndex: 'paymentStatus',
        title: () => <AntTableColumnTitle>{t('ticketSales:payment_status')}</AntTableColumnTitle>,
        width: 120,
        align: 'center',
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
        width: 85,
        align: 'center',
        render: (_, row) => {
          return <AntTableColumnDisplayAsTypograph>{row.orderCode}</AntTableColumnDisplayAsTypograph>;
        },
      },
      {
        key: 'ticketType',
        dataIndex: 'ticketType',
        title: () => <AntTableColumnTitle>{t('ticketSales:type')}</AntTableColumnTitle>,
        width: 80,
        align: 'center',
        render: (_, row) => {
          return <AntTableColumnDisplayAsTypograph>{TicketTypeLabelMapping[row.ticketType]}</AntTableColumnDisplayAsTypograph>;
        },
      },
      {
        key: 'action',
        title: () => <AntTableColumnTitle>{t('translation:action')}</AntTableColumnTitle>,
        render: (_, row) => {
          const actions: ActionItem<ColumnTicket>[] = [
            {
              id: v4(),
              label: 'detail',
              icon: <ViewIcon />,
              onClick() {
                const nextUrl = isAgent ? '/agent/ticket-sales/' : '/admin/ticket-sales/';
                navigate(nextUrl + row.rawData.orderCode);
              },
            },
            {
              id: v4(),
              label: 'edit',
              icon: <EditIcon />,
              onClick: () => {
                navigate(isAgent ? `/agent/ticket-sales/${row.rawData.orderCode}/edit` : `/admin/ticket-sales/${row.rawData.orderCode}/edit`);
              },
            },
          ];
          if (row.ticketStatus !== 'USED' && row.ticketStatus !== 'CANCELLED') {
            actions.push({
              id: v4(),
              label: 'cancel',
              icon: <CancelPresentationOutlinedIcon color="error" />,
              onClick: () => {
                handleOpenDialogConfirmCancel(row);
              },
              color: '#FF2727',
            });
          }
          return <ActionTable actions={actions} row={row} />;
        },
        align: 'center',
        width: 60,
      },
    ];
  }, [isAgent, navigate, t]);

  const dataSource: ColumnTicket[] = useMemo(() => {
    let result: ColumnTicket[] = [];
    ticketSales.forEach(ticketSale => {
      ticketSale.passengers.forEach(passenger => {
        result = result.concat(ticketSaleModelToColumnTicket(ticketSale, passenger));
      });
    });
    return result;
  }, [ticketSales]);

  const renderDialogConfirmCancel = () => {
    if (!openConfirmCancel) {
      return null;
    }
    return (
      <DialogConfirmChangeStatusToCancel
        isUpdating={queueUpdateOrderStatus.includes(openConfirmCancel._id)}
        onCancel={handleCloseDialogConfirmCancel}
        onOk={values => {
          dispatch(
            ticketSalesActions.updateOrderStatusRequest({
              orderCode: openConfirmCancel.orderCode,
              targetTicket: openConfirmCancel.rawData,
              ticketStatus: 'CANCELLED',
              reason: values.confirm_description_to_change_cancel,
              onSuccess: () => {
                handleCloseDialogConfirmCancel();
                toast(
                  <ToastCustom
                    type="success"
                    text={t('translation:edit_type_success', {
                      type: t('ticketSales:ticket').toLowerCase(),
                    })}
                  />,
                  { className: 'toast-success' },
                );
              },
              onFailure: message => {
                toast(
                  <ToastCustom
                    type="error"
                    text={t('translation:edit_type_error', {
                      type: t('ticketSales:ticket').toLowerCase(),
                    })}
                    description={message}
                  />,
                  { className: 'toast-error' },
                );
              },
            }),
          );
        }}
      />
    );
  };

  return (
    <Box my="30px">
      <AntTable
        loading={statusGetTicketSales === 'loading'}
        columns={columns}
        dataSource={dataSource}
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
            ticketSalesActions.getTicketSalesRequest({
              page: getPaginationFromAntdTable({ pagination, extra }),
              sorter: getSorterParamsFromAntdTable({ sorter }),
              searcher: currentSearcher,
            }),
          );
        }}
      />
      {renderDialogConfirmCancel()}
    </Box>
  );
};
