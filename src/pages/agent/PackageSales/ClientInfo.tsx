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
import { useEffect } from 'react';
<<<<<<< HEAD
import { useRequest } from 'ahooks';
import { getRoutePkgDetail } from 'services/Route/Company/getRoute';
import { PaymentMethod } from 'components/PaymentMethod';
import { PackageSalePayload, useCreatePackageSale } from 'services/PackageSales/packageSales';
import { getNotifcation } from 'utils/getNotification';
import { EnumPaymentGateway } from 'services/models/PaymentGateway';
import { useSelector } from 'react-redux';
import { selectAuth } from 'store/auth/selectors';
=======
import { orderConfirmSelector } from 'store/passengers/selectors';
import { isEmpty } from 'lodash-es';
import { useMount, useRequest, useUpdateEffect } from 'ahooks';
import { getRoute } from 'services/Route/Company/getRoute';
>>>>>>> 14d847fa1f1500bca7fcc3b5cdaff0ac0fc372bc

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
<<<<<<< HEAD
  method: EnumPaymentGateway;
  accept_term?: boolean;
=======
>>>>>>> 14d847fa1f1500bca7fcc3b5cdaff0ac0fc372bc
}

export default function ClientInfo() {
  const { t } = useTranslation(['packageSales', 'ticketSales', 'translation']);
  const location = useLocation();
  const selectedRoute: RouteOfTicketSale = get(location, 'state.selectedRoute', undefined);
  const authentication = useSelector(selectAuth);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
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
        error: t('add_package_sale_error'),
        onSuccess: () => {
          reset();
          navigate(`${authentication.userInfo?.role === 'admin' ? '/admin' : 'agent'}/package-sales/order-detail-confirm`, {
            state: {
              packageSale: dataCode.data,
            },
          });
        },
      });
    },
  });

<<<<<<< HEAD
  const { data: dataDetail, run: getRouteDetail } = useRequest(getRoutePkgDetail, {
=======
  const { data: dataDetail, run: getRouteDetail } = useRequest(getRoute, {
>>>>>>> 14d847fa1f1500bca7fcc3b5cdaff0ac0fc372bc
    ready: !!selectedRoute.routeCode,
    manual: true,
  });

<<<<<<< HEAD
=======
  useEffect(() => {
    if (!!selectedRoute.routeCode) {
      getRouteDetail({ routeCode: selectedRoute.routeCode });
    }
  }, [selectedRoute]);

  console.log({ dataDetail });

>>>>>>> 14d847fa1f1500bca7fcc3b5cdaff0ac0fc372bc
  useEffect(() => {
    if (!!selectedRoute.routeCode) {
      getRouteDetail(selectedRoute._id);
    }
  }, [selectedRoute]);

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

  return (
    <LayoutDetail title={t('create_package_orders')} subTitle={t('package_sales')}>
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
            <ReserveInfo onBook={handleSubmit(onSubmit)} routeDetail={dataDetail?.data} control={control} errors={errors} loading={loading} />
          </Box>
        </Grid>
      </Grid>
    </LayoutDetail>
  );
}
