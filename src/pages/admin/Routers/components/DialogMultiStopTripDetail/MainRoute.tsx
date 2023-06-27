import { Box, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Timeline } from 'antd';
import 'antd/lib/timeline/style/css';
import { LocationIcon } from 'components/SvgIcon/LocationIcon';
import { useMemo } from 'react';
import { DialogMultiStopTripDetailProps } from './DialogMultiStopTripDetail';
import { addMinutesToTimeString } from 'utils/addMinutesToTimeString';
import { getMainRoutePoints } from '../../utils/getRoutePointsWithRouteType';

const useStyles = makeStyles(() => ({
  container: {
    minWidth: 200,
    flex: '1 0 auto',
    '& .ant-timeline-item-tail': {
      borderLeftStyle: 'dashed !important',
    },
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

export const MainRoute = ({ route }: Pick<DialogMultiStopTripDetailProps, 'route'>) => {
  const classes = useStyles();

  const mainRoutePoints = useMemo(() => {
    return getMainRoutePoints(route.routePoints);
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
        <Typography component="p" color="rgba(69, 72, 94, 1)" fontSize="14px">
          {route.departurePoint}
        </Typography>
        <Typography component="p" color="rgba(133, 140, 147, 1)" fontSize="10px">
          {route.departureTime}
        </Typography>
      </Timeline.Item>
    );
  };

  const renderLastMark = () => {
    const lastPoint = mainRoutePoints[mainRoutePoints.length - 1];
    return (
      <Timeline.Item
        dot={
          <Box className={classes.specialMark} bgcolor="rgba(255, 39, 39, 1)">
            <LocationIcon />
          </Box>
        }
      >
        <Typography component="p" color="rgba(69, 72, 94, 1)" fontSize="14px">
          {lastPoint.stopPoint}
        </Typography>
        <Typography component="p" color="rgba(133, 140, 147, 1)" fontSize="10px">
          {addMinutesToTimeString(route.departureTime, lastPoint.durationTime)}
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
