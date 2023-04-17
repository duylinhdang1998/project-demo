import { Box, Grid, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import { DialogMultiStopTripDetailProps } from './DialogMultiStopTripDetail';

const useStyles = makeStyles((theme: Theme) => ({
  borderDivider: {
    borderLeft: 'none',
    borderRight: `0.5px solid rgba(215, 218, 220, 1)`,
    [theme.breakpoints.up('sm')]: {
      borderLeft: `0.5px solid rgba(215, 218, 220, 1) !important`,
    },
  },
  infomationName: {
    fontSize: '12px !important',
    color: 'rgba(133, 140, 147, 1)',
  },
  infomationValue: {
    fontWeight: '500 !important',
    color: 'rgba(69, 72, 94, 1)',
    fontSize: '14px !important',
  },
  danger: {
    fontWeight: 500,
    color: 'rgba(255, 39, 39, 1)',
    fontSize: '14px !important',
  },
}));

export const GeneralInfomation = ({ route }: DialogMultiStopTripDetailProps) => {
  const classes = useStyles();
  const { t } = useTranslation(['routers']);

  return (
    <Grid container spacing={2} style={{ marginBottom: '24px' }}>
      <Grid xs={12} sx={{ flex: '100%' }} sm={4} item flex="auto" textAlign="center">
        <Box>
          <Typography component="p" className={classes.infomationName}>
            {t('routers:vehicle')}:
          </Typography>
          <Typography component="p" className={classes.infomationValue}>
            {route.vehicle?.brand} {route.vehicle?.model}
          </Typography>
        </Box>
      </Grid>
      <Grid xs={6} sm={4} item flex="auto" textAlign="center">
        <Box className={classes.borderDivider}>
          <Typography component="p" className={classes.infomationName}>
            {t('routers:VIPseats')}:
          </Typography>
          <Typography component="p" className={classes.infomationValue}>
            {route.vehicle?.VIPseats}
          </Typography>
        </Box>
      </Grid>
      <Grid xs={6} sm={4} item flex="auto" textAlign="center">
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
