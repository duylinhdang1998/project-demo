import CardWhite from 'components/CardWhite/CardWhite';
import LayoutDetail from 'layout/LayoutDetail';
import { useTranslation } from 'react-i18next';
import FormMerchandise from './components/FormMerchandise';

export default function AddMerchandise() {
  const { t } = useTranslation('packageSales');

  return (
    <LayoutDetail title={t('create_package_orders')} subTitle={t('package_sales')}>
      <CardWhite title={t('order_details')}>
        <FormMerchandise />
      </CardWhite>
    </LayoutDetail>
  );
}
