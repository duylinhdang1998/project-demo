import { Box, Divider, Grid, Typography } from '@mui/material';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

interface MerchandiseDetailViewProps {
  merchandises?: any;
}

function MerchandiseDetailView({ merchandises }: MerchandiseDetailViewProps) {
  const { t } = useTranslation(['packageSales', 'translation']);
  return (
    <div>
      <Typography variant="h5" mb="16px">
        {t('merchandise_details')}
      </Typography>
      {merchandises?.map((i, index) => (
        <Box my="16px" key={i.id}>
          <Typography variant="body2">
            {t('translation:merchandise')} {index + 1}
          </Typography>
          {Object.keys(i).map(
            (k) =>
              k !== 'id' && (
                <Grid key={k} container spacing={2}>
                  <Grid item xs={4}>
                    <Typography variant="body2">{t(`${k}`)}:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body2">{i[k]}</Typography>
                  </Grid>
                </Grid>
              ),
          )}
          <Divider sx={{ borderStyle: 'dashed', margin: '16px 0', display: index === merchandises.length - 1 ? 'none' : 'block' }} />
        </Box>
      ))}
    </div>
  );
}

export default memo(MerchandiseDetailView);
