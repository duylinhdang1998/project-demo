import { get } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import CardWhite from 'components/CardWhite/CardWhite';
import LayoutDetail from 'layout/LayoutDetail';
import StepOne from './components/FormStep/StepOne';
import StepOneMultiple from './components/FormStep/StepOneMultiple';

export default function EditRouter() {
  const params = useParams();
  const location = useLocation();
  const isMulti: boolean = get(location.state, 'isMulti', false);

  const { t } = useTranslation(['routers', 'translation']);
  return (
    <LayoutDetail title={t('edit_one_way')} subTitle={t('routers')}>
      <CardWhite title={t('edit_trip') + ' #' + get(params, 'id', '')}>{isMulti ? <StepOneMultiple isEdit /> : <StepOne isEdit />}</CardWhite>
    </LayoutDetail>
  );
}
