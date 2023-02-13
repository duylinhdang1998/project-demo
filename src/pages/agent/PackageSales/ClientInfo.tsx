import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CardWhite from 'components/CardWhite/CardWhite';
import LayoutDetail from 'layout/LayoutDetail';
import FormClientInfo from './components/FormClientInfo';
import ReserveInfo from './components/ReserveInfo';

export default function ClientInfo() {
  const { t } = useTranslation('packageSales');
  return (
    <LayoutDetail title={t('create_package_orders')} subTitle={t('package_sales')}>
      <CardWhite title={t('client_infomation')}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <FormClientInfo />
          </Grid>
          <Grid item xs={12} md={4}>
            <ReserveInfo />
          </Grid>
        </Grid>
      </CardWhite>
    </LayoutDetail>
  );
}
