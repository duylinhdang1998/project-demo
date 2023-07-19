import React, { memo, useMemo } from 'react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ColumnsType } from 'antd/es/table';
import { MapPinIcon } from 'assets';
import ActionTable from 'components/ActionTable/ActionTable';
import { AntTableColumnTitle } from 'components/AntTableColumnTitle/AntTableColumnTitle';
import EditIcon from 'components/SvgIcon/EditIcon';
import { ViewIcon } from 'components/SvgIcon/ViewIcon';
import Tag from 'components/Tag/Tag';
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';
import i18n from 'locales/i18n';
import { get } from 'lodash-es';
import { OrderStatus, PackageSale } from 'models/PackageSales';
import { EPaymentStatus } from 'models/PaymentStatus';
import { v4 } from 'uuid';
import CancelPresentationOutlinedIcon from '@mui/icons-material/CancelPresentationOutlined';
import { SortOrder, getTotal } from '../constants';
import AntTable from 'components/AntTable/AntTable';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { TableProps } from 'antd';
import { getPaginationFromAntdTable } from 'utils/getPaginationFromAntdTable';
import { DialogConfirmChangeStatusToCancel } from 'pages/admin/TicketSales/components/DialogConfirmChangeStatusToCancel';
import { useCancelPackage } from 'services/PackageSales/updateDeliveryStatus';
import { getNotifcation } from 'utils/getNotification';
import { toast } from 'react-toastify';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import { ServiceException } from 'services/utils/ServiceException';

interface Props {
  sortOrder: SortOrder;
  loading?: boolean;
  dataSource: PackageSale[];
  pagination: {
    totalRows: number;
    totalPages: number;
  };
  onFilter?: TableProps<PackageSale>['onChange'];
  onRefresh?: () => void;
}

function TablePackageSales({ sortOrder, loading, dataSource, pagination, onFilter, onRefresh }: Props) {
  const { t } = useTranslation(['packageSales', 'translation']);
  const navigate = useNavigate();

  const [openConfirmCancel, setOpenConfirmCancel] = React.useState<PackageSale | null>(null);

  const [currentPage, setCurrentPage] = React.useState(0);
  const { loading: cancelLoading, run: cancelPackage } = useCancelPackage({
    onSuccess: (data: any) => {
      getNotifcation({
        code: data.code,
        error: t('translation:cancel_package_error'),
        success: t('translation:cancel_package_success'),
        onSuccess: () => {
          onRefresh?.();
        },
      });
      setOpenConfirmCancel(null);
    },
    onError(data) {
      toast(<ToastCustom type="error" text={t(`translation:${data.name}`)} description={ServiceException.getMessageError(data)} />, {
        className: 'toast-error',
        autoClose: 2000,
      });
    },
  });

  const handleCloseDialogConfirmCancel = () => {
    setOpenConfirmCancel(null);
  };

  const columnsPackage: ColumnsType<PackageSale> = useMemo(() => {
    return [
      {
        key: 'orderCode',
        dataIndex: 'orderCode',
        align: 'center',
        width: 140,
        title: () => <div>{i18n.t('packageSales:orderId')}</div>
      },
      {
        key: 'destination',
        dataIndex: 'trip',
        width: 250,
        align: 'left',
        title: () => <div>{i18n.t('packageSales:destination')}</div>,
        render: (_, item: PackageSale) => {
          return (
            <div>
              <TextWithIcon
                icon={MapPinIcon}
                text={item.departurePoint}
                typography={{
                  fontSize: '14px',
                }}
                color="#1AA6EE"
              />
              <TextWithIcon icon={MapPinIcon} text={item.arrivalPoint} typography={{ fontSize: '14px' }} color="#1AA6EE" />
            </div>
          );
        },
      },
      {
        key: 'sender',
        dataIndex: 'sender',
        align: 'left',
        title: () => <div>{i18n.t('packageSales:from')}</div>,
        render: (value: PackageSale['sender']) => (
          <div>
            <Typography fontSize="14px" color="#0C1132">
              {`${value?.firstName} ${value?.lastName}`}
            </Typography>
            <Typography fontSize="12px" color="#0C1132">
              {value?.mobile}
            </Typography>
          </div>
        ),
      },
      {
        key: 'recipent',
        dataIndex: 'recipent',
        align: 'left',
        title: () => <div>{i18n.t('packageSales:recipient')}</div>,
        render: (value: PackageSale['recipent']) => (
          <div>
            <Typography fontSize="14px" color="#0C1132">
              {`${value?.firstName} ${value?.lastName}`}
            </Typography>
            <Typography fontSize="12px" color="#0C1132">
              {value?.mobile}
            </Typography>
          </div>
        )
      },
      {
        key: 'totalQuantity',
        dataIndex: 'totalQuantity',
        align: 'center',
        title: () => <div>{i18n.t('packageSales:qty')}</div>,
        // render: (value) => (
        //   <div>
        //     <Typography fontSize="14px" color="#0C1132">
        //       {value?.totalQuantity}
        //     </Typography>
        //   </div>
        // ),
        sorter: () => 0,
        sortOrder: get(sortOrder, 'totalQuantity', null),
      },
      {
        key: 'totalWeight',
        dataIndex: 'merchandises',
        align: 'center',
        title: () => <div>{i18n.t('packageSales:weight')}</div>,
        render: (value: PackageSale['merchandises']) => (
          <div>
            <Typography fontSize="14px" color="#0C1132">
              {getTotal(value, 'weight')}kg
            </Typography>
          </div>
        ),
        sorter: () => 0,
        sortOrder: get(sortOrder, 'totalWeight', null),
      },
      {
        key: 'totalPrice',
        dataIndex: 'merchandises',
        align: 'center',
        title: () => <div>{i18n.t('packageSales:price')}</div>,
        render: (value: PackageSale['merchandises']) => (
          <div>
            <Typography fontSize="14px" color="#0C1132">
              {getTotal(value, 'price')}$
            </Typography>
          </div>
        ),
        sorter: () => 0,
        sortOrder: get(sortOrder, 'price', null),
      },
      {
        key: 'paymentStatus',
        dataIndex: 'paymentStatus',
        align: 'center',
        title: () => <div>{i18n.t('packageSales:payment_status')}</div>,
        render: (paymentStatus: PackageSale['paymentStatus']) => (
          <Box display="flex" alignItems="center" justifyContent="center">
            <Tag text={!!paymentStatus ? paymentStatus : 'NONE'} variant={paymentStatus === EPaymentStatus.APPROVED ? 'success' : 'error'} />
          </Box>
        )
      },
      {
        key: 'orderStatus',
        dataIndex: 'orderStatus',
        title: () => <AntTableColumnTitle>{t('packageSales:order_status')}</AntTableColumnTitle>,
        width: 90,
        align: 'center',
        render: (value: OrderStatus) => {
          return (
            <Box display="flex" alignItems="center" justifyContent="center">
              <Tag text={value} variant={value === OrderStatus.SUCCESS ? 'success' : 'error'} />
            </Box>
          );
        }
      },
      {
        key: 'action',
        title: () => <AntTableColumnTitle>{t('translation:action')}</AntTableColumnTitle>,
        render: (_, row) => (
          <ActionTable
            actions={[
              {
                id: v4(),
                label: 'detail',
                icon: <ViewIcon />,
                onClick: record => {
                  const nextUrl = record.orderCode;
                  navigate(nextUrl);
                },
              },
              {
                id: v4(),
                label: 'edit',
                icon: <EditIcon />,
                onClick: () => {
                  navigate(`edit/${row.orderCode}`, {
                    state: {
                      defaultPackage: row,
                    },
                  });
                },
              },
              {
                id: v4(),
                label: 'cancel',
                icon: <CancelPresentationOutlinedIcon color="error" />,
                onClick: () => {
                  setOpenConfirmCancel(row);
                },
                color: '#FF2727',
              },
            ]}
            row={row}
          />
        ),
        align: 'center',
        width: 100,
      },
    ];
  }, [navigate, sortOrder, t]);

  const renderDialogConfirmCancel = () => {
    if (!openConfirmCancel) {
      return null;
    }
    return (
      <DialogConfirmChangeStatusToCancel
        isUpdating={cancelLoading}
        onCancel={handleCloseDialogConfirmCancel}
        onOk={values => {
          cancelPackage({ orderCode: openConfirmCancel.orderCode, reason: values.confirm_description_to_change_cancel });
        }}
      />
    );
  };

  return (
    <div>
      <AntTable
        columns={columnsPackage}
        loading={loading}
        dataSource={dataSource}
        rowKey={record => record._id ?? ''}
        pagination={{
          pageSize: 10,
          total: pagination.totalRows,
          current: currentPage + 1,
        }}
        onChange={(pagination, _, sorter, extra) => {
          setCurrentPage(getPaginationFromAntdTable({ pagination, extra }));
          onFilter?.(pagination, _, sorter, extra);
        }}
      />
      {renderDialogConfirmCancel()}
    </div>
  );
}
export default memo(TablePackageSales);
