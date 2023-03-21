import { Box, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import { DialogMultiStopTripDetailProps } from './DialogMultiStopTripDetail';

const useStyles = makeStyles(() => ({
  borderDivider: {
    borderRight: `0.5px solid rgba(215, 218, 220, 1)`,
    borderLeft: `0.5px solid rgba(215, 218, 220, 1)`,
  },
  infomationName: {
    fontSize: 12,
    color: 'rgba(133, 140, 147, 1)',
  },
  infomationValue: {
    fontWeight: 500,
    color: 'rgba(69, 72, 94, 1)',
    fontSize: 14,
  },
  danger: {
    fontWeight: 500,
    color: 'rgba(255, 39, 39, 1)',
    fontSize: 14,
  },
}));

export const GeneralInfomation = ({ route }: DialogMultiStopTripDetailProps) => {
  const classes = useStyles();
  const { t } = useTranslation(['routers']);

  return (
    <Grid container spacing={2} style={{ marginBottom: '24px' }}>
      <Grid lg={4} item flex="auto" textAlign="center">
        <Box>
          <Typography component="p" className={classes.infomationName}>
            {t('routers:vehicle')}:
          </Typography>
          <Typography component="p" className={classes.infomationValue}>
            {route.vehicle?.brand} {route.vehicle?.model}
          </Typography>
        </Box>
      </Grid>
      <Grid lg={4} item flex="auto" textAlign="center">
        <Box className={classes.borderDivider}>
          <Typography component="p" className={classes.infomationName}>
            {t('routers:VIPseats')}:
          </Typography>
          <Typography component="p" className={classes.infomationValue}>
            {route.vehicle?.VIPseats}
          </Typography>
        </Box>
      </Grid>
      <Grid lg={4} item flex="auto" textAlign="center">
        <Box>
          <Typography component="p" className={classes.infomationName}>
            {t('routers:ECOseats')}:
          </Typography>
          <Typography component="p" className={classes.infomationValue}>
            {route.vehicle?.ECOseats}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};
