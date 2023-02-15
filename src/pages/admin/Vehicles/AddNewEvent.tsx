import { Box, Divider, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import LayoutDetail from 'layout/LayoutDetail';
import FormAddEvent from './components/FormAddEvent';

export default function AddNewEvent() {
  const { t } = useTranslation(['vehicles', 'translation']);
  return (
    <LayoutDetail title={t('translation:add_new', { type: t('translation:event').toLowerCase() })} subTitle={t('vehicles')}>
      <Box display="flex" justifyContent="center" width="100%">
        <Box padding="24px" sx={{ backgroundColor: '#fff' }} borderRadius="4px" width={{ xs: '100%', md: '80%' }}>
          <Typography fontSize={16} fontWeight="700">
            Add event for vehicle DX727AM
          </Typography>
          <Divider sx={{ margin: '16px 0' }} />
          <FormAddEvent />
        </Box>
      </Box>
    </LayoutDetail>
  );
}
