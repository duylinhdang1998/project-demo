import { Box, Grid, Stack } from '@mui/material';
import MerchandiseDetailView from 'components/MerchandiseDetailView/MerchandiseDetailView';
import OrderDetailView, { OrderDetailViewProps } from 'components/OrderDetailView/OrderDetailView';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import LayoutDetail from 'layout/LayoutDetail';
import { DeliveryStatus, PackageSale } from 'models/PackageSales';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateDeliveryStatus } from 'services/PackageSales/updateDeliveryStatus';
import { ServiceException } from 'services/utils/ServiceException';
import { getAppCurrencySymbol } from 'utils/getAppCurrencySymbol';
import { getAppWeightSymbol } from 'utils/getAppWeightSymbol';
import { ControlDelivertStatus } from '../components/ControlDelivertStatus';
import { DialogConfirmChangeStatusToCancel } from '../components/DialogConfirmChangeStatusToCancel';
import { DialogConfirmChangeStatusToDeliveriedNArrived } from '../components/DialogConfirmChangeStatusToDeliveriedNArrived';
import { packageSaleToDataDetail } from './utils/packageSaleToDataDetail';

export function ControlMerchandiseDetail() {
  const { t } = useTranslation(['dashboard']);
  const [openDialogConfirm, setOpenDialogConfirm] = useState<PackageSale['deliveryStatus'] | undefined>(undefined);
  const [isUpdating, setIsUpdaing] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const locationState = useMemo(() => {
    return location.state as PackageSale | null | undefined;
  }, [location.state]);

  const [dataDetail, setDataDetail] = useState<OrderDetailViewProps['data']>(() => {
    return packageSaleToDataDetail(locationState);
  });

  const merchandises = useMemo(() => {
    return locationState?.merchandises?.map(merchandise => {
      return {
        title: merchandise.package?.title,
        weight: merchandise.weight + getAppWeightSymbol(),
        price: getAppCurrencySymbol() + merchandise.price,
        id: merchandise.package?._id,
      };
    });
  }, [locationState]);

  const handleOpenDialogConfirm = (val: DeliveryStatus) => {
    if (val !== dataDetail.delivery_status) {
      setOpenDialogConfirm(val);
    }
  };

  const handleCloseDialogConfirm = () => {
    setOpenDialogConfirm(undefined);
  };

  const handleUpdateDeliveryStatus = async () => {
    if (dataDetail.order_id && openDialogConfirm) {
      setIsUpdaing(true);
      try {
        const response = await updateDeliveryStatus({ orderCode: dataDetail.order_id, status: openDialogConfirm });
        setDataDetail(packageSaleToDataDetail(response.data));
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

  useEffect(() => {
    if (!locationState) {
      navigate('/agent/control-merchandise-delivery');
    } else {
      setDataDetail(packageSaleToDataDetail(locationState));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationState]);

  const renderModalConfirm = () => {
    if (!openDialogConfirm) {
      return null;
    }
    // FIXME: Mapping status
    if (openDialogConfirm === 'fulfilment') {
      return (
        <DialogConfirmChangeStatusToDeliveriedNArrived
          isUpdating={isUpdating}
          onCancel={handleCloseDialogConfirm}
          onOk={handleUpdateDeliveryStatus}
          variant="deliveried"
        />
      );
    }
    // FIXME: Mapping status
    if (openDialogConfirm === 'unfulfilment') {
      return (
        <DialogConfirmChangeStatusToDeliveriedNArrived
          isUpdating={isUpdating}
          onCancel={handleCloseDialogConfirm}
          onOk={handleUpdateDeliveryStatus}
          variant="arrived"
        />
      );
    }

    if (openDialogConfirm === 'schedule') {
      return <DialogConfirmChangeStatusToCancel isUpdating={isUpdating} onCancel={handleCloseDialogConfirm} onOk={handleUpdateDeliveryStatus} />;
    }
  };

  return (
    <LayoutDetail title={t('dashboard.control_merchandise_deliver')}>
      <Box width={{ xs: '100%', md: '90%' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box bgcolor="#fff" borderRadius="4px" padding="24px">
              <OrderDetailView data={dataDetail} />
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Stack direction="column" spacing="24px">
              <ControlDelivertStatus deliveryStatus={dataDetail.delivery_status} onChange={handleOpenDialogConfirm} />
              <Box bgcolor="#fff" borderRadius="4px" padding="24px">
                <MerchandiseDetailView merchandises={merchandises} />
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      {renderModalConfirm()}
    </LayoutDetail>
  );
}
