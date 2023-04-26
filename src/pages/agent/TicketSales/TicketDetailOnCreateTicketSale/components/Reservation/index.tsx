import { Box, Typography } from '@mui/material';
import Button from 'components/Button/Button';
import { useMemo } from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Passenger, TicketDetailFormValues } from '../../@types/FormValues';
import { GeneralInfomationOfTicket } from '../../@types/GeneralInfomationOfTicket';
import { getTotalPriceForTicketOfPassenger } from '../utils/getTotalPriceForTicketOfPassenger';
import { AgreeTerms } from './components/AgreeTerms';
import { TotalPrice } from './components/TotalPrice';
import { TripInfomation, TripInfomationProps } from './components/TripInfomation';

export interface ReservationProps {
  onSubmit: () => void;
  control: Control<TicketDetailFormValues>;
  errors: FieldErrors<TicketDetailFormValues>;
  loading: boolean;
  passengers: Passenger[];
  generalInfomationOfTicket: GeneralInfomationOfTicket;
}

export const Reservation = ({ onSubmit, loading, control, errors, generalInfomationOfTicket, passengers }: ReservationProps) => {
  const { t } = useTranslation(['ticketSales', 'translation']);

  const totalPrice = useMemo(() => {
    return passengers.reduce<number>((result, passenger) => result + getTotalPriceForTicketOfPassenger({ passenger, generalInfomationOfTicket }), 0);
  }, [passengers, generalInfomationOfTicket]);

  const departureTrip: TripInfomationProps['data'] = useMemo(() => {
    return {
      dateFormatted:
        generalInfomationOfTicket.type === 'ONE_WAY'
          ? generalInfomationOfTicket.data.dateFormatted
          : generalInfomationOfTicket.data.departureTrip.dateFormatted,
      trip: {
        departurePoint:
          generalInfomationOfTicket.type === 'ONE_WAY'
            ? generalInfomationOfTicket.data.routePoint?.departurePoint
            : generalInfomationOfTicket.data.departureTrip.routePoint?.departurePoint,
        stopPoint:
          generalInfomationOfTicket.type === 'ONE_WAY'
            ? generalInfomationOfTicket.data.routePoint?.stopPoint
            : generalInfomationOfTicket.data.departureTrip.routePoint?.stopPoint,
      },
      vehicle:
        generalInfomationOfTicket.type === 'ONE_WAY' ? generalInfomationOfTicket.data.vehicle : generalInfomationOfTicket.data.departureTrip.vehicle,
    };
  }, [generalInfomationOfTicket]);

  const returnTrip: TripInfomationProps['data'] | null = useMemo(() => {
    if (generalInfomationOfTicket.type === 'ONE_WAY') {
      return null;
    }
    return {
      dateFormatted: generalInfomationOfTicket.data.returnTrip.dateFormatted,
      trip: {
        departurePoint: generalInfomationOfTicket.data.returnTrip.routePoint?.departurePoint,
        stopPoint: generalInfomationOfTicket.data.returnTrip.routePoint?.stopPoint,
      },
      vehicle: generalInfomationOfTicket.data.returnTrip.vehicle,
    };
  }, [generalInfomationOfTicket]);

  return (
    <Box p="24px" bgcolor="#FAFDFF">
      <Typography marginBottom="24px" variant="h5">
        {t('your_reservation')}
      </Typography>
      <TripInfomation variant={returnTrip ? 'DEPARTURE_TRIP' : 'ONE_WAY'} data={departureTrip} />
      {returnTrip && <TripInfomation variant={'RETURN_TRIP'} data={returnTrip} />}
      <AgreeTerms label="accept_term" control={control} errors={errors} />
      <TotalPrice value={totalPrice} />
      <Typography variant="headerTable">{t('all_taxes_and_fees')}</Typography>
      <Button loading={loading} backgroundButton="#1AA6EE" fullWidth sx={{ marginTop: '24px' }} onClick={onSubmit}>
        {t('translation:book')}
      </Button>
    </Box>
  );
};
