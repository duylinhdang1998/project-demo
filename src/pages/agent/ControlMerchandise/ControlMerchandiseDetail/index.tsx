import { Box, Grid, Stack } from '@mui/material';
import { Empty } from 'antd';
import MerchandiseDetailView from 'components/MerchandiseDetailView/MerchandiseDetailView';
import OrderDetailView from 'components/OrderDetailView/OrderDetailView';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import LayoutDetail from 'layout/LayoutDetail';
import { DeliveryStatus, PackageSale } from 'models/PackageSales';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateDeliveryStatus } from 'services/PackageSales/updateDeliveryStatus';
import { ServiceException } from 'services/utils/ServiceException';
import { ControlDelivertStatus } from '../components/ControlDelivertStatus';
import { DialogConfirmChangeStatusToCancel, FormValues } from '../components/DialogConfirmChangeStatusToCancel';
import { DialogConfirmChangeStatusToDeliveriedNArrived } from '../components/DialogConfirmChangeStatusToDeliveriedNArrived';

export function ControlMerchandiseDetail() {
  const { t } = useTranslation(['dashboard']);
  const [openDialogConfirm, setOpenDialogConfirm] = useState<PackageSale['deliveryStatus'] | undefined>(undefined);
  const [isUpdating, setIsUpdaing] = useState(false);

  const location = useLocation();

  const [dataDetail, setDataDetail] = useState<PackageSale | undefined>(location.state);

  useEffect(() => {
    setDataDetail(location.state as PackageSale);
  }, [location.state]);

  useEffect(() => {
    if (!dataDetail) {
      throw 'Some thing went wrong';
    }
  }, [dataDetail]);

  const handleOpenDialogConfirm = (val: DeliveryStatus) => {
    if (val !== dataDetail?.deliveryStatus) {
      setOpenDialogConfirm(val);
    }
  };

  const handleCloseDialogConfirm = () => {
    setOpenDialogConfirm(undefined);
  };

  const handleUpdateDeliveryStatus = async (values?: FormValues) => {
    console.log(values);
    if (dataDetail?.orderCode && openDialogConfirm) {
      setIsUpdaing(true);
      try {
        await updateDeliveryStatus({ orderCode: dataDetail.orderCode, status: openDialogConfirm });
        setDataDetail(state => ({
          ...(state as PackageSale),
          deliveryStatus: openDialogConfirm,
        }));
        toast(
          <ToastCustom
            type="success"
            text={t('translation:edit_type_success', {
              type: t('packageSales:package_order'),
            })}
          />,
          {
            className: 'toast-success',
          },
        );
        setOpenDialogConfirm(undefined);
      } catch (error) {
        toast(
          <ToastCustom
            type="error"
            text={t('translation:edit_type_error', {
              type: t('packageSales:package_order'),
            })}
            description={ServiceException.getMessageError(error)}
          />,
          {
            className: 'toast-error',
          },
        );
      } finally {
        setIsUpdaing(false);
      }
    }
  };

  const renderModalConfirm = () => {
    if (!openDialogConfirm) {
      return null;
    }
    if (openDialogConfirm === DeliveryStatus.DELIVERED) {
      return (
        <DialogConfirmChangeStatusToDeliveriedNArrived
          isUpdating={isUpdating}
          onCancel={handleCloseDialogConfirm}
          onOk={handleUpdateDeliveryStatus}
          variant="deliveried"
        />
      );
    }
    if (openDialogConfirm === DeliveryStatus.DELIVERING) {
      return (
        <DialogConfirmChangeStatusToDeliveriedNArrived
          isUpdating={isUpdating}
          onCancel={handleCloseDialogConfirm}
          onOk={handleUpdateDeliveryStatus}
          variant="arrived"
        />
      );
    }

    if (openDialogConfirm === DeliveryStatus.CANCELED) {
      return <DialogConfirmChangeStatusToCancel isUpdating={isUpdating} onCancel={handleCloseDialogConfirm} onOk={handleUpdateDeliveryStatus} />;
    }
  };

  if (!dataDetail) {
    return <Empty />;
  }

  return (
    <LayoutDetail title={t('dashboard.control_merchandise_deliver')}>
      <Box width={{ xs: '100%', md: '90%' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Box bgcolor="#fff" borderRadius="4px" padding="24px">
              <OrderDetailView data={dataDetail} />
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack direction="column" spacing="24px">
              <ControlDelivertStatus deliveryStatus={dataDetail.deliveryStatus} onChange={handleOpenDialogConfirm} />
              <Box bgcolor="#fff" borderRadius="4px" padding="24px">
                <MerchandiseDetailView merchandises={dataDetail.merchandises} />
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      {renderModalConfirm()}
    </LayoutDetail>
  );
}
