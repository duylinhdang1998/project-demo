import { Box, Divider, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import LayoutDetail from 'layout/LayoutDetail';
import FormClientInfo from './components/FormClientInfo';
import ReserveInfo from './components/ReserveInfo';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { RouteOfTicketSale } from 'services/models/TicketSale';
import { get } from 'lodash-es';
import { useDispatch, useSelector } from 'react-redux';
import { setOrderInfomation } from 'store/packageSales/packageSalesSlice';
import { useEffect } from 'react';
import { orderConfirmSelector } from 'store/passengers/selectors';
import { isEmpty } from 'lodash-es';
import { useMount, useRequest, useUpdateEffect } from 'ahooks';
import { getRoute } from 'services/Route/Company/getRoute';

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

interface FieldValues {
  sender_first_name: string;
  sender_last_name: string;
  sender_mobile: string;
  recipent_first_name: string;
  recipent_last_name: string;
  recipent_mobile: string;
  merchandise: StateLocation['merchandise'];
  email: string;
}

export default function ClientInfo() {
  const { t } = useTranslation(['packageSales', 'ticketSales']);
  const location = useLocation();

  const selectedRoute: RouteOfTicketSale = get(location, 'state.selectedRoute', undefined);
  const orderConfirm = useSelector(orderConfirmSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      merchandise: [{ weight: '', price: '' }],
    },
  });

  const { data: dataDetail, run: getRouteDetail } = useRequest(getRoute, {
    ready: !!selectedRoute.routeCode,
    manual: true,
  });

  useEffect(() => {
    if (!!selectedRoute.routeCode) {
      getRouteDetail({ routeCode: selectedRoute.routeCode });
    }
  }, [selectedRoute]);

  console.log({ dataDetail });

  useEffect(() => {
    if (!isEmpty(orderConfirm)) {
      reset({
        sender_first_name: orderConfirm.sender?.firstName,
        sender_last_name: orderConfirm.sender?.lastName,
        sender_mobile: orderConfirm.sender?.mobile,
        recipent_first_name: orderConfirm.recipent?.firstName,
        recipent_last_name: orderConfirm.recipent?.lastName,
        recipent_mobile: orderConfirm.recipent?.mobile,
        merchandise: orderConfirm.merchandise,
      });
    }
  }, [orderConfirm]);

  const onSubmit = (values: FieldValues) => {
    const payload = {
      route: selectedRoute.route._id,
      departurePoint: selectedRoute.departurePoint,
      arrivalPoint: selectedRoute.stopPoint,
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
      merchandise: values.merchandise,
      departureTime: get(location, 'state.departureTime', undefined),
    };
    dispatch(setOrderInfomation(payload));
    navigate('order-confirm', {
      state: {
        payloadClient: payload,
      },
    });
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
            <FormClientInfo control={control} errors={errors} />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box bgcolor="#fff" borderRadius="4px" width="100%" padding="24px" boxShadow="0px 4px 16px rgba(0, 0, 0, 0.1">
            <Typography color="#0c1132" fontWeight={700}>
              {t('ticketSales:your_reservation')}
            </Typography>
            <Divider sx={{ margin: '16px 0' }} />
            <ReserveInfo onBook={handleSubmit(onSubmit)} />
          </Box>
        </Grid>
      </Grid>
    </LayoutDetail>
  );
}
