import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CardWhite from 'components/CardWhite/CardWhite';
import LayoutDetail from 'layout/LayoutDetail';
import FormClientInfo from './components/FormClientInfo';
import ReserveInfo from './components/ReserveInfo';
import { useForm } from 'react-hook-form';
import { useCreatePackageSale } from 'services/PackageSales/packageSales';
import { useLocation } from 'react-router-dom';
import { RouteOfTicketSale } from 'services/models/TicketSale';
import { get } from 'lodash-es';

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
}

export default function ClientInfo() {
  const { t } = useTranslation('packageSales');
  const location = useLocation();

  const selectedRoute: RouteOfTicketSale = get(location, 'state.selectedRoute', undefined);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      merchandise: [{ weight: '', price: '' }],
    },
  });
  const { run: createPackageSale, data, loading } = useCreatePackageSale();

  const onSubmit = (values: FieldValues) => {
    console.log('values', values);
    const payload = {
      route: selectedRoute.route._id,
      departurePoint: selectedRoute.departurePoint,
      arrivalPoint: selectedRoute.stopPoint,
      departureTime: selectedRoute.route.departureTime,
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
        type: 'RECIPIENT',
      },
      merchandises: values.merchandise.map(i => ({
        package: i.title.value,
        weight: parseInt(i.weight),
        price: parseInt(i.price),
      })),
    };
    createPackageSale(payload);
  };

  return (
    <LayoutDetail title={t('create_package_orders')} subTitle={t('package_sales')}>
      <CardWhite title={t('client_infomation')}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <FormClientInfo control={control} errors={errors} />
          </Grid>
          <Grid item xs={12} md={4}>
            <ReserveInfo onBook={handleSubmit(onSubmit)} loading={loading} />
          </Grid>
        </Grid>
      </CardWhite>
    </LayoutDetail>
  );
}
