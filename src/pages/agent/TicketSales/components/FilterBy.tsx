import { Box, Checkbox, Chip, FormControlLabel, Stack, Typography } from '@mui/material';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import NumberCount from 'components/NumberCount/NumberCount';

function FilterBy() {
  const { t } = useTranslation(['ticketSales']);
  return (
    <Box>
      <Typography component="p" variant="textBold" sx={{ marginBottom: '16px' }}>
        {t('filter_by')}
      </Typography>
      <Box border="1px solid #D7DADC" borderRadius="4px" padding="16px 14px">
        <Typography variant="body2">{t('trip')}</Typography>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <FormControlLabel control={<Checkbox defaultChecked />} label={`${t('oneway')}`} />
          <Chip label="12" sx={{ backgroundColor: '#E8F6FD' }} />
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <FormControlLabel control={<Checkbox />} label={`${t('round_trip')}`} />
          <Chip label="3" sx={{ backgroundColor: '#E8F6FD' }} />
        </Stack>
        <Typography variant="body2">{t('pax')}</Typography>
        <NumberCount value={0} />
      </Box>
    </Box>
  );
}

export default memo(FilterBy);
