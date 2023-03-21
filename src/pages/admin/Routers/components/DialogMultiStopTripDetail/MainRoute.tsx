import { Box, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Timeline } from 'antd';
import 'antd/lib/timeline/style/css';
import { LocationIcon } from 'components/SvgIcon/LocationIcon';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
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

  const mainRoutePoints = useMemo(() => {
    return route.routePoints.filter(routePoint => routePoint.routeType === 'MAIN_ROUTE');
  }, [route]);

  const renderStartMark = () => {
    return (
      <Timeline.Item
        dot={
          <Box className={classes.specialMark} bgcolor="rgba(45, 154, 255, 1)">
            <LocationIcon />
          </Box>
        }
      >
        <Typography component="p">{route.departurePoint}</Typography>
        <Typography component="p">{route.departureTime}</Typography>
      </Timeline.Item>
    );
  };

  const renderLastMark = () => {
    const lastPoint = mainRoutePoints[mainRoutePoints.length - 1];
    return (
      <Timeline.Item
        dot={
          <Box className={classes.specialMark} bgcolor="rgba(45, 154, 255, 1)">
            <LocationIcon />
          </Box>
        }
      >
        <Typography component="p">{lastPoint.stopPoint}</Typography>
        <Typography component="p">
          {lastPoint.durationTime} {t('routers:minutes')}
        </Typography>
      </Timeline.Item>
    );
  };

  const renderSubRouteMark = () => {
    return mainRoutePoints.slice(0, -1).map(routePoint => {
      return (
        <Timeline.Item key={routePoint._id} color="rgba(51, 204, 127, 1)">
          {routePoint.stopPoint}
        </Timeline.Item>
      );
    });
  };

  return (
    <Grid item className={classes.container}>
      <Timeline>
        {renderStartMark()}
        {renderSubRouteMark()}
        {renderLastMark()}
      </Timeline>
    </Grid>
  );
};
