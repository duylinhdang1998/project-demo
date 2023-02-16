import { Box, Divider, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import LayoutDetail from 'layout/LayoutDetail';
import FormAddVehicle from './components/FormAddVehicle';

export default function AddNewVehicles() {
  const { t } = useTranslation(['vehicles', 'translation']);

  return (
    <LayoutDetail title={t('translation:create_new', { type: t('vehicles:vehicle').toLowerCase() })} subTitle={t('vehicles:vehicles')}>
      <Box width="100%" display="flex" justifyContent="center">
        <Box bgcolor="#fff" borderRadius="4px" width={{ xs: '100%', md: '80%' }} padding="24px">
          <Typography color="#0c1132" fontWeight={700}>
            {t(`translation:add_new`, { type: t('vehicles:vehicle').toLowerCase() })}
          </Typography>
          <Divider sx={{ margin: '16px 0' }} />
          <FormAddVehicle />
        </Box>
      </Box>
    </LayoutDetail>
  );
}
