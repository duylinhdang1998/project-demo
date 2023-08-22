import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { EnumPaymentGateway } from 'services/models/PaymentGateway';
import { useForm } from 'react-hook-form';
import { useRequest } from 'ahooks';
import { getRoutePkgDetail } from 'services/Route/Company/getRoute';
import { PackageSalePayload, useGetPackageSale, useUpdatePackageSale } from 'services/PackageSales/packageSales';
import { Box, Divider, Grid, Typography } from '@mui/material';
import LayoutDetail from 'layout/LayoutDetail';
import FormClientInfo from './components/FormClientInfo';
import ReserveInfo from './components/ReserveInfo';
import { PaymentMethod } from 'components/PaymentMethod';
import { getNotifcation } from 'utils/getNotification';

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

export default function EditPackageSales() {
  const { t } = useTranslation(['packageSales', 'ticketSales', 'translation']);
  const params = useParams();
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

  const { data: routeDetail, run: getRouteDetail } = useRequest(getRoutePkgDetail, {
    manual: true,
  });

  const { run: getPackageSaleDetail, data: dataDetails } = useGetPackageSale();
  console.log('dataDetails>>>', dataDetails);

  const { run: updatePackage, loading } = useUpdatePackageSale({
    onSuccess: dataCode => {
      getNotifcation({
        code: dataCode.code,
        success: t('update_package_sale_success'),
        error: t('update_package_sale_error'),
        onSuccess: () => {
          // reset();
          navigate(-1);
        },
      });
    },
  });

  useEffect(() => {
    if (!!dataDetails) {
      reset({
        email: dataDetails.email,
        sender_first_name: dataDetails.sender.firstName,
        sender_last_name: dataDetails.sender.lastName,
        sender_mobile: dataDetails.sender.mobile,
        recipent_first_name: dataDetails.recipent.firstName,
        recipent_last_name: dataDetails.recipent.lastName,
        recipent_mobile: dataDetails.recipent.mobile,
        merchandise: dataDetails.merchandises.map(item => ({
          title: { value: item.package?._id, label: item.package?.title },
          weight: item.weight?.toString(),
          price: item.price?.toString(),
        })),
        method: dataDetails.paymentMethod,
      });
      getRouteDetail(dataDetails.route);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataDetails]);

  useEffect(() => {
    if (!!params.orderCode) {
      getPackageSaleDetail({ orderCode: params.orderCode });
      return;
    }
    throw new Error('Route not found');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const onSubmit = (values: FieldValues) => {
    const payload: PackageSalePayload = {
      orderCode: dataDetails?.orderCode,
      route: dataDetails?.route,
      departurePoint: dataDetails?.departurePoint,
      arrivalPoint: dataDetails?.arrivalPoint,
      departureTime: dataDetails?.departureTime,
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
      email: values.email,
      paymentMethod: values.method,
    };
    updatePackage(payload);
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
            <FormClientInfo control={control} errors={errors} routeDetail={routeDetail?.data} />
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
              departureTime={dataDetails?.departureTime?.toString()}
              onBook={handleSubmit(onSubmit)}
              routeDetail={routeDetail?.data}
              control={control}
              errors={errors}
              loading={loading}
              isEdit={true}
            />
          </Box>
        </Grid>
      </Grid>
    </LayoutDetail>
  );
}
