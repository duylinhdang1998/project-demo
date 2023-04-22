import { Box, Divider, Grid, Typography } from '@mui/material';
import { PackageSale } from 'models/PackageSales';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

interface MerchandiseDetailViewProps {
  merchandises?: PackageSale['merchandises'];
}

function MerchandiseDetailView({ merchandises }: MerchandiseDetailViewProps) {
  const { t } = useTranslation(['packageSales', 'translation']);
  return (
    <div>
      <Typography variant="h5" mb="14px">
        {t('merchandise_details')}
      </Typography>
      <Divider />
      {merchandises?.map((i, index) => (
        <Box my="24px" key={`${i.package}`}>
          <Typography variant="body2" marginBottom="12px">
            {t('translation:merchandise')} {index + 1}
          </Typography>
          <Grid container spacing={2} marginBottom="12px">
            <Grid item xs={4}>
              <Typography variant="body2">{t(`title`)}:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body2">{i.package?.title}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} marginBottom="12px">
            <Grid item xs={4}>
              <Typography variant="body2">{t(`weight`)}:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body2">{i.weight} kg</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} marginBottom="12px">
            <Grid item xs={4}>
              <Typography variant="body2">{t(`price`)}:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body2">${i.price}</Typography>
            </Grid>
          </Grid>
          <Divider sx={{ borderStyle: 'dashed', margin: '16px 0', display: index === merchandises.length - 1 ? 'none' : 'block' }} />
        </Box>
      ))}
    </div>
  );
}

export default memo(MerchandiseDetailView);
