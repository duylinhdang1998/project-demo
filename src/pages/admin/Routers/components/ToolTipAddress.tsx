import { Box, Fade, Tooltip, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Timeline } from 'antd';
import 'antd/lib/timeline/style/css';
import { Fragment, memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuid } from 'uuid';
import './styles.css';

interface ToolTipAddressProps {
  children?: ReactNode;
}

const addresses = [
  {
    id: uuid(),
    time: '08:30',
    place: 'Lyon Gare Perrache',
  },
  {
    id: uuid(),
    time: '09:30',
    place: 'Lyon Gare Perrache',
  },
  {
    id: uuid(),
    time: '10:30',
    place: 'Lyon Gare Perrache',
  },
  {
    id: uuid(),
    time: '11:30',
    place: 'Lyon Gare Perrache',
  },
  {
    id: uuid(),
    time: '12:30',
    place: 'Lyon Gare Perrache',
  },
];

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

function ToolTipAddress({ children }: ToolTipAddressProps) {
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
            {t('stop_address')}
          </Typography>
          <Box className="custom_timeline_container_router" marginTop="20px">
            <Timeline mode="left">
              {addresses.map((i) => (
                <Timeline.Item key={i.id} color="#333" label={i.time}>
                  {i.place}
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
