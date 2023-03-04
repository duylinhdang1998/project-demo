import { Box, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Timeline } from 'antd';
import 'antd/lib/timeline/style/css';
import { LocationIcon } from 'components/SvgIcon/LocationIcon';
import { useTranslation } from 'react-i18next';
import { StopPoint } from 'services/models/Route';
import { DialogMultiStopTripDetailProps } from './DialogMultiStopTripDetail';

const useStyles = makeStyles(() => ({
  container: {
    minWidth: 200,
    flex: '1 0 auto',
  },
  specialMark: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
    height: 20,
    borderRadius: '100%',
  },
}));

export const MainRoute = ({ route }: DialogMultiStopTripDetailProps) => {
  const classes = useStyles();
  const { t } = useTranslation(['routers']);

  const renderSpecialMark = (stopPoint: StopPoint, variant: 'start' | 'end') => {
    const bgColor = variant === 'start' ? 'rgba(45, 154, 255, 1)' : 'rgba(255, 39, 39, 1)';
    return (
      <Timeline.Item
        key={stopPoint.stopCode}
        dot={
          <Box className={classes.specialMark} bgcolor={bgColor}>
            <LocationIcon />
          </Box>
        }
      >
        <Typography component="p">{stopPoint.stopPoint}</Typography>
        {/* FIXME: Điền cái gì? */}
        <Typography component="p">
          {route.departureTime} - {stopPoint.durationTime} {t('routers:minutes')}
        </Typography>
      </Timeline.Item>
    );
  };

  return (
    <Grid item className={classes.container}>
      <Timeline>
        {route.stopPoints.map((stopPoint, index, array) => {
          if (index === 0) {
            return renderSpecialMark(stopPoint, 'start');
          }
          if (index === array.length - 1) {
            return renderSpecialMark(stopPoint, 'end');
          }
          return (
            // FIXME: Label lấy từ cái gì?
            <Timeline.Item key={stopPoint.stopCode} color="rgba(51, 204, 127, 1)">
              {stopPoint.stopPoint}
            </Timeline.Item>
          );
        })}
      </Timeline>
    </Grid>
  );
};
