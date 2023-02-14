import { Box, Stack, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Timeline } from 'antd';
import 'antd/lib/timeline/style/css';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'components/Button/Button';
import './styles.css';

const useStyles = makeStyles(() => ({
  root: {
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
    border: '1px solid #F7F7F7',
  },
  img: {
    width: 40,
    height: 40,
  },
  icon: {
    width: 16,
    height: 16,
  },
  timeline: {
    height: '60px',
  },
}));

interface CardSelectTripProps {
  timeStart?: string;
  placeStart?: string;
  timeEnd?: string;
  placeEnd?: string;
  vehicle?: string;
  price?: number;
  duration?: string;
  onSelect?: () => void;
}

function CardSelectTrip({ timeEnd, timeStart, placeEnd, placeStart, vehicle, price, duration, onSelect }: CardSelectTripProps) {
  const classes = useStyles();
  const { t } = useTranslation(['translation']);
  return (
    <Box className={classes.root} padding="24px 16px">
      <Stack
        direction={{ mobile: 'column', desktop: 'row' }}
        justifyContent="space-between"
        spacing={2}
        alignItems={{ xs: 'flex-start', md: 'center' }}
      >
        <Box className="custom_timeline_container">
          <Timeline mode="left" className={classes.timeline}>
            <Timeline.Item color="#333" label={timeStart}>
              {placeStart}
            </Timeline.Item>
            <Timeline.Item color="#333" label={timeEnd}>
              {placeEnd}
            </Timeline.Item>
          </Timeline>
        </Box>
        <Box>
          <Typography variant="price">${price}</Typography>
          <Typography fontSize={12} color="#B2BABE">
            {duration}
          </Typography>
        </Box>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center" my="16px">
        <Stack direction="row" alignItems="center" spacing={2}>
          <img src={BusPng} className={classes.img} />
          <Typography variant="body2">{vehicle}</Typography>
        </Stack>
        <Stack spacing={2} direction="row" alignItems="center">
          <i className={`fas fa-wifi ${classes.icon}`} />
          <i className={`fas fa-tv-alt ${classes.icon}`} />
          <i className={`fas fa-tint ${classes.icon}`} />
        </Stack>
      </Stack>
      <Button variant="outlined" fullWidth onClick={onSelect}>
        {t('select')}
      </Button>
    </Box>
  );
}

export default memo(CardSelectTrip);
