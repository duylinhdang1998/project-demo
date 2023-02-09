import { Divider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import LayoutDetail from 'layout/LayoutDetail';
import { useTranslation } from 'react-i18next';
import ListContent from './components/ListContent';

export default function ListEvents() {
  const { t } = useTranslation(['vehicles', 'translation']);
  return (
    <LayoutDetail subTitle={t('vehicles')} title={t('event_lists')}>
      <Box display="flex" justifyContent="center" width="100%">
        <Box padding="24px" sx={{ backgroundColor: '#fff' }} borderRadius="4px" width={{ xs: '100%', md: '80%' }}>
          <Typography fontSize={16} fontWeight="700">
            Events list for vehicle DX727AM
          </Typography>
          <Divider sx={{ margin: '16px 0' }} />
          <ListContent />
        </Box>
      </Box>
    </LayoutDetail>
  );
}
