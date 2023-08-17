/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Divider, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import LayoutDetail from 'layout/LayoutDetail';
import FormClientInfo from './components/FormClientInfo';
import ReserveInfo from './components/ReserveInfo';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { RouteOfTicketSale } from 'services/models/TicketSale';
import { get } from 'lodash-es';
import { useEffect, useState } from 'react';
import { useRequest } from 'ahooks';
import { getRoutePkgDetail } from 'services/Route/Company/getRoute';
import { PaymentMethod } from 'components/PaymentMethod';
import { PackageSalePayload, useCreatePackageSale } from 'services/PackageSales/packageSales';
import { getNotifcation } from 'utils/getNotification';
import { EnumPaymentGateway } from 'services/models/PaymentGateway';
import { useSelector } from 'react-redux';
import { selectAuth } from 'store/auth/selectors';
import { PackageSale } from 'models/PackageSales';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import dayjs from 'dayjs';
import {UserRole} from "../../../utils/constant";

interface StateLocation {
  merchandise: {
    title: {
      value: string;
      label: string;
    };
    weight: string;
    price: string;
  }[];
}

export interface FieldValues {
  sender_first_name: string;
  sender_last_name: string;
  sender_mobile: string;
  recipent_first_name: string;
  recipent_last_name: string;
  recipent_mobile: string;
  merchandise: StateLocation['merchandise'];
  email: string;
  method: EnumPaymentGateway;
  accept_term?: boolean;
}

export default function ClientInfo() {
  const { t } = useTranslation(['packageSales', 'ticketSales', 'translation']);
  const location = useLocation();

  const [open, setOpen] = useState(false);

  const selectedRoute: RouteOfTicketSale = get(location, 'state.selectedRoute', undefined);
  const defaultPackageSale: PackageSale = get(location, 'state.defaultPackage', undefined);
  const authentication = useSelector(selectAuth);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    trigger,
  } = useForm<FieldValues>({
    defaultValues: {
      merchandise: [{ weight: '', price: '' }],
      method: 'PAYPAL',
      accept_term: true,
    },
  });
  const methodWatch = watch('method');

  const { run: createPackageSale, loading } = useCreatePackageSale({
    onSuccess: dataCode => {
      getNotifcation({
        code: dataCode.code,
        success: t('add_package_sale_success'),
        error: t('add_package_sale_failed'),
        onSuccess: () => {
          reset();
          navigate(`${authentication.userInfo?.role === UserRole.ADMIN ? '/admin' : '/agent'}/package-sales/${dataCode.data.orderCode}`, {
            state: {
              packageSale: dataCode.data,
            },
          });
        },
      });
    },
  });

  const { data: dataDetail, run: getRouteDetail } = useRequest(getRoutePkgDetail, {
    manual: true,
  });

  useEffect(() => {
    if (!!selectedRoute) {
      getRouteDetail(selectedRoute._id);
      return;
    }
    throw new Error('Route not found');
  }, [selectedRoute, defaultPackageSale]);

  const onSubmit = (values: FieldValues) => {
    const payload: PackageSalePayload = {
      route: dataDetail?.data._id,
      departurePoint: dataDetail?.data.departurePoint,
      arrivalPoint: dataDetail?.data.stopPoint,
      sender: {
        firstName: values.sender_first_name,
        lastName: values.sender_last_name,
        mobile: values.sender_mobile,
        type: 'SENDER',
      },
      recipent: {
        firstName: values.recipent_first_name,
        lastName: values.recipent_last_name,
        mobile: values.recipent_mobile,
        type: 'RECIPENT',
      },
      merchandises: values.merchandise.map(item => ({
        package: item.title.value,
        weight: parseInt(item.weight),
        price: parseInt(item.price),
      })),
      departureTime: get(location, 'state.departureTime', undefined),
      email: values.email,
      paymentMethod: values.method,
    };
    createPackageSale(payload);
  };

  const handleDialogConfirm = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOke = () => {
    navigate(-1);
  };

  return (
    <LayoutDetail title={t('create_package_orders')} subTitle={t('package_sales')} onBack={handleDialogConfirm}>
      <Grid container spacing="24px">
        <Grid item xs={12} md={8}>
          <Box bgcolor="#fff" borderRadius="4px" width="100%" padding="24px">
            <Typography color="#0c1132" fontWeight={700}>
              {t('order_infomation')}
            </Typography>
            <Divider sx={{ margin: '16px 0' }} />
            <FormClientInfo control={control} errors={errors} routeDetail={dataDetail?.data} />
            <PaymentMethod
              control={control}
              errors={errors}
              label="method"
              method={methodWatch}
              onChange={value => {
                setValue('method', value);
                trigger('method');
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box bgcolor="#fff" borderRadius="4px" width="100%" padding="24px" boxShadow="0px 4px 16px rgba(0, 0, 0, 0.1">
            <Typography color="#0c1132" fontWeight={700}>
              {t('ticketSales:your_reservation')}
            </Typography>
            <Divider sx={{ margin: '16px 0' }} />
            <ReserveInfo
              onBook={handleSubmit(onSubmit)}
              routeDetail={dataDetail?.data}
              departureTime={dayjs(selectedRoute.bookDate).format('DD/MM/YYYY HH:mm')}
              control={control}
              errors={errors}
              loading={loading}
            />
          </Box>
        </Grid>
      </Grid>
      <DialogConfirm
        openDialog={open}
        title={t('translation:cancel_type', { type: t('package_sales').toLowerCase() })}
        subTitle={t('translation:leave_page')}
        onClose={handleClose}
        onOk={handleOke}
      />
    </LayoutDetail>
  );
}
