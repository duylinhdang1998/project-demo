import { Box, Stack, Typography } from '@mui/material';
import { MapPinIcon } from 'assets';
import ClockSvg from 'assets/images/clock.svg';
import SnowSvg from 'assets/images/snow.svg';
import Button from 'components/Button/Button';
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';
import { useMemo } from 'react';
import { Control, FieldErrors, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { RouteOfTicketSale } from 'services/models/TicketSale';
import { getAppCurrencySymbol } from 'utils/getAppCurrencySymbol';
import { Passenger, TicketDetailFormValues } from '../TicketDetailOnCreateTicketSale';
import { AgreeTerms } from './AgreeTerms';

export interface ReservationProps {
  control: Control<TicketDetailFormValues>;
  errors: FieldErrors<TicketDetailFormValues>;
  route: RouteOfTicketSale;
  onSubmit: () => void;
  loading: boolean;
}

export const Reservation = ({ onSubmit, control, route, loading, errors }: ReservationProps) => {
  const { t } = useTranslation(['ticketSales', 'translation']);

  const passengers = useWatch({
    name: 'passengers',
    control,
  }) as Passenger[];

  const dataDetails = useMemo(() => {
    return {
      date: route.route.departureTime,
      trip: [route.departurePoint, route.stopPoint],
      services: route.vehicle?.services.map(service => service.title),
      total: passengers.reduce<number>((result, passenger) => {
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
      <Box my="16px">
        <Typography variant="body2" component="p" marginBottom="16px">
          {t('service')}
        </Typography>
        {dataDetails.services?.map(i => (
          <TextWithIcon icon={SnowSvg} text={i} color="#45485E" />
        ))}
      </Box>
      <AgreeTerms label="accept_term" control={control} errors={errors} route={route} />
      <Stack direction="row" alignItems="center" spacing={10} marginTop="20px">
        <Typography variant="body2">{t('total_price')}</Typography>
        <Typography variant="price">
          {getAppCurrencySymbol()}
          {dataDetails.total}
        </Typography>
      </Stack>
      <Typography variant="headerTable">{t('all_taxes_and_fees')}</Typography>
      <Button loading={loading} backgroundButton="#1AA6EE" fullWidth sx={{ marginTop: '24px' }} onClick={onSubmit}>
        {t('translation:book')}
      </Button>
    </Box>
  );
};
