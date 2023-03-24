import { Box, Checkbox, FormControlLabel, Stack, Typography } from '@mui/material';
import { MapPinIcon } from 'assets';
import ClockSvg from 'assets/images/clock.svg';
import SnowSvg from 'assets/images/snow.svg';
import Button from 'components/Button/Button';
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { RouteOfTicketSale } from 'services/models/TicketSale';
import { Passenger } from '../TicketDetailOnCreateTicketSale';

export interface ReservationProps {
  route: RouteOfTicketSale;
  passengers: Passenger[];
  onSubmit: () => void;
  loading: boolean;
}

export const Reservation = ({ onSubmit, route, passengers, loading }: ReservationProps) => {
  const { t } = useTranslation(['ticketSales', 'translation']);

  const dataDetails = useMemo(() => {
    return {
      // FIXME: Điền gì ở đây
      date: '27/02/2022 - 10:30 AM',
      trip: [route.departurePoint, route.stopPoint],
      // FIXME: Điền gì ở đây
      operated: 'Alsa Spain',
      // FIXME: Điền gì ở đây
      class: 'FLEXIBLE',
      // FIXME: Đợi populate Vehicle
      services: ['Air conditioning', 'Luggage transport', 'Free wifi'],
      total: passengers.reduce((result, passenger) => {
        const seatsTypePricesKey = passenger.seatsType.value && `${passenger.seatsType.value}Prices`;
        const ticketTypePriceKey = passenger.typeTicket.value;
        const seatsTypePrices = seatsTypePricesKey && (route[seatsTypePricesKey] as RouteOfTicketSale['ECOPrices'] | RouteOfTicketSale['VIPPrices']);
        const ticketTypePrice = seatsTypePrices && ticketTypePriceKey ? seatsTypePrices[ticketTypePriceKey] : 0;
        return result + ticketTypePrice;
      }, 0),
    };
  }, [route, passengers]);

  return (
    <Box p="24px" bgcolor="#FAFDFF">
      <Typography marginBottom="24px" variant="h5">
        {t('your_reservation')}
      </Typography>
      <Typography variant="body2" component="p" marginBottom="16px">
        {t('date')}
      </Typography>
      <TextWithIcon icon={ClockSvg} color="#45485E" text={dataDetails.date} />
      <Typography variant="body2" component="p" margin="16px 0">
        {t('trip')}
      </Typography>
      {dataDetails.trip.map((i, index) => (
        <TextWithIcon
          key={index}
          text={i}
          icon={MapPinIcon}
          color="#1AA6EE"
          typography={{
            fontSize: '14px',
          }}
        />
      ))}
      <Typography variant="body2" component="p" margin="16px 0">
        {t('operated')}{' '}
        <Typography component="span" fontSize="14px" color="#1AA6EE" fontStyle="italic">
          {dataDetails.operated}
        </Typography>
      </Typography>
      <Typography variant="body2">
        {t('class')}: {dataDetails.class}
      </Typography>
      <Box my="16px">
        <Typography variant="body2" component="p" marginBottom="16px">
          {t('service')}
        </Typography>
        {dataDetails.services.map(i => (
          <TextWithIcon icon={SnowSvg} text={i} color="#45485E" />
        ))}
      </Box>
      <FormControlLabel
        control={<Checkbox checked />}
        // FIXME: Cái gì đây ?
        label={`${t('ticketSales:policy_privacy')}`}
        sx={{
          '.MuiFormControlLabel-label': {
            fontSize: '14px !important',
          },
        }}
      />
      <Stack direction="row" alignItems="center" spacing={10} marginTop="20px">
        <Typography variant="body2">{t('total_price')}</Typography>
        <Typography variant="price">${dataDetails.total}</Typography>
      </Stack>
      <Typography variant="headerTable">{t('all_taxes_and_fees')}</Typography>
      <Button loading={loading} backgroundButton="#1AA6EE" fullWidth sx={{ marginTop: '24px' }} onClick={onSubmit}>
        {t('translation:book')}
      </Button>
    </Box>
  );
};
