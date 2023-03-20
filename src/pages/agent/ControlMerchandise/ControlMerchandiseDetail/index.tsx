import { Box, Dialog, Divider, Grid, Stack, Typography } from '@mui/material';
import Button from 'components/Button/Button';
import MerchandiseDetailView from 'components/MerchandiseDetailView/MerchandiseDetailView';
import OrderDetailView from 'components/OrderDetailView/OrderDetailView';
import CheckCircle from 'components/SvgIcon/CheckCircle';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import LayoutDetail from 'layout/LayoutDetail';
import { PackageSale } from 'models/PackageSales';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateDeliveryStatus } from 'services/PackageSales/updateDeliveryStatus';
import { getAppCurrencySymbol } from 'utils/getAppCurrencySymbol';
import { getAppWeightSymbol } from 'utils/getAppWeightSymbol';
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

  const [dataDetail, setDataDetail] = useState(() => {
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

  const handleOpenDialogConfirm = (val: string) => () => {
    setOpenDialogConfirm(val);
  };

  const handleCloseDialogConfirm = () => {
    setOpenDialogConfirm(undefined);
  };

  const handleUpdateDeliveryStatus = async () => {
    if (dataDetail.order_id && openDialogConfirm) {
      setIsUpdaing(true);
      try {
        // FIXME: API lỗi nên chưa test đc
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
      } catch {
        toast(
          <ToastCustom
            type="error"
            text={t('translation:edit_type_error', {
              type: t('packageSales:package_order'),
            })}
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
    return (
      <Dialog open onClose={handleCloseDialogConfirm}>
        <Box padding="24px" style={{ maxWidth: 311, textAlign: 'center' }}>
          <Typography marginBottom="24px" fontSize="16px" fontWeight={700}>
            {t('packageSales:confirm_title')}
          </Typography>
          <Typography marginBottom="30px" fontSize="14px" fontWeight={400}>
            {t('packageSales:confirm_description')}
          </Typography>
          <Stack direction="row" alignItems="center">
            <Button
              variant="outlined"
              sx={{
                margin: '0 6px',
                color: '#1AA6EE',
                padding: '10px 40px',
                flex: '1 1 50%',
              }}
              onClick={handleCloseDialogConfirm}
            >
              {t('translation:no')}
            </Button>
            <Button
              loading={isUpdating}
              sx={{
                margin: '0 8px',
                color: '#FFFFFF',
                padding: '10px 40px',
                flex: '1 1 50%',
              }}
              backgroundButton="#1AA6EE"
              onClick={handleUpdateDeliveryStatus}
            >
              {t('translation:yes')}
            </Button>
          </Stack>
        </Box>
      </Dialog>
    );
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
              <Box bgcolor="#fff" borderRadius="4px" padding="24px">
                <Typography variant="h5">{t('delivery_status')}</Typography>
                <Divider sx={{ margin: '16px 0' }} />
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2">{t('arrived_destination')}</Typography>
                  <Button onClick={handleOpenDialogConfirm('unfulfilment')}>
                    <CheckCircle success={dataDetail.deliverStatus === 'unfulfilment'} />
                  </Button>
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2">{t('delivered_recipient')}</Typography>
                  <Button onClick={handleOpenDialogConfirm('schedule')}>
                    <CheckCircle success={status === 'schedule'} />
                  </Button>
                </Stack>
              </Box>
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
