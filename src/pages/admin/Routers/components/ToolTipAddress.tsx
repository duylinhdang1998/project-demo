import { Box, Fade, Tooltip, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Timeline } from 'antd';
import 'antd/lib/timeline/style/css';
import { Fragment, memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { RoutePoint } from 'services/models/Route';
import './styles.css';

interface ToolTipAddressProps {
  children?: ReactNode;
  routePoints: RoutePoint[];
}

const useStyles = makeStyles(() => ({
  tooltipTitle: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff !important',
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
    width: '500px !important',
  },
}));

function ToolTipAddress({ children, routePoints }: ToolTipAddressProps) {
  const classes = useStyles();
  const { t } = useTranslation(['routers']);
  return (
    <Tooltip
      classes={{
        tooltip: classes.tooltipTitle,
      }}
      placement="bottom-end"
      title={
        <Fragment>
          <Typography component="p" fontSize="18px" fontWeight="bold" color="#333" p="10px">
            {t('routers:stop_address')}
          </Typography>
          <Box className="custom_timeline_container_router" marginTop="20px">
            <Timeline mode="left">
              {routePoints.map(routePoint => (
                <Timeline.Item key={routePoint._id} color="#333" label={routePoint.durationTime}>
                  {routePoint.stopPoint}
                </Timeline.Item>
              ))}
            </Timeline>
          </Box>
        </Fragment>
      }
      TransitionComponent={Fade}
    >
      <Box>{children}</Box>
    </Tooltip>
  );
}

export default memo(ToolTipAddress);
