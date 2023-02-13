import { Box } from '@mui/material';
import LayoutDetail from 'layout/LayoutDetail';
import { useTranslation } from 'react-i18next';
import StepForm from './components/StepForm';

export default function CreateMultiStopWay() {
  const { t } = useTranslation(['routers', 'translation']);

  return (
    <LayoutDetail title={t('translation:create_new', { type: t('one_way_trip').toLowerCase() })} subTitle={t('routers')}>
      <Box width="100%" display="flex" justifyContent="center">
        <Box bgcolor="#fff" borderRadius="4px" width={{ xs: '100%', md: '80%' }} padding="24px">
          <StepForm isMulti />
        </Box>
      </Box>
    </LayoutDetail>
  );
}
