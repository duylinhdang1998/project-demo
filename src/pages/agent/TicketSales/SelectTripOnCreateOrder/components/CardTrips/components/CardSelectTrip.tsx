import { Box, Stack, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Timeline } from 'antd';
import 'antd/lib/timeline/style/css';
import BusPng from 'assets/images/bus.png';
import Button from 'components/Button/Button';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { RouteOfTicketSale } from 'services/models/TicketSale';
import { getUrlImage, getUrlOfResource } from 'utils/getUrlOfResource';
import './styles.css';

const useMainStyles = makeStyles(() => ({
  root: {
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
    border: '1px solid #F7F7F7',
  },
  img: {
    width: 40,
    height: 40,
    objectFit: 'cover',
    borderRadius: '50%',
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
  vehicle?: RouteOfTicketSale['vehicle'];
  duration?: string;
  dateTime: string;
  onSelect?: () => void;
}

function CardSelectTrip({ timeEnd, timeStart, placeEnd, placeStart, vehicle, duration, dateTime, onSelect }: CardSelectTripProps) {
  const mainClasses = useMainStyles();
  const { t } = useTranslation(['translation', 'routers']);

  return (
    <Box className={mainClasses.root} padding="24px 16px" marginBottom="20px">
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={2} alignItems="flex-start">
        <Box flex="1 1 30%" className="ticket_sales_custom_timeline_container">
          <Timeline mode="left" className={mainClasses.timeline}>
            <Timeline.Item color="#333" label={timeStart}>
              {placeStart}
            </Timeline.Item>
            <Timeline.Item color="#333" label={timeEnd}>
              {placeEnd}
            </Timeline.Item>
          </Timeline>
        </Box>
        <Box flex="auto" marginRight="12px">
          <Typography marginBottom="4px" textAlign={{ xs: 'left', sm: 'right' }} fontSize="14px" color="rgba(71, 84, 97, 1)">
            {dateTime}
          </Typography>
          <Typography textAlign={{ xs: 'left', sm: 'right' }} fontSize="12px" color="#B2BABE">
            {duration}
          </Typography>
        </Box>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center" my="16px">
        <Stack direction="row" alignItems="center" spacing={2}>
          <img
            src={
              typeof vehicle?.attach === 'string'
                ? getUrlImage(vehicle.attach)
                : vehicle?.attach && typeof vehicle?.attach === 'object'
                ? getUrlOfResource(vehicle?.attach)
                : BusPng
            }
            className={mainClasses.img}
          />
          <Typography variant="body2">{vehicle?.brand}</Typography>
        </Stack>
        <Stack spacing={2} direction="row" alignItems="center">
          {vehicle?.services.map((service, index) => {
            if (typeof service === 'string') {
              return <img key={index} alt={service} src={getUrlImage(service)} className={mainClasses.icon} />;
            }
            return <img key={service._id} alt={service.title} src={getUrlImage(service.icon)} className={mainClasses.icon} />;
          })}
        </Stack>
      </Stack>
      <Button variant="outlined" fullWidth onClick={onSelect}>
        {t('select')}
      </Button>
    </Box>
  );
}

export default memo(CardSelectTrip);
