import { Box, Typography } from '@mui/material';
import Button from 'components/Button/Button';
import { useMemo } from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Passenger, TicketDetailFormValues } from '../../@types/FormValues';
import { GeneralInfomationOfOrder } from '../../@types/GeneralInfomationOfOrder';
import { getTotalPriceForTicketOfPassenger } from '../utils/getTotalPriceForTicketOfPassenger';
import { TotalPrice } from './components/TotalPrice';
import { TripInfomation, TripInfomationProps } from './components/TripInfomation';

export interface ReservationProps {
  onSubmit: () => void;
  control: Control<TicketDetailFormValues>;
  errors: FieldErrors<TicketDetailFormValues>;
  loading: boolean;
  passengers: Passenger[];
  generalInfomationOfTicket: GeneralInfomationOfOrder;
  isEditAction: boolean;
}

export const Reservation = ({ onSubmit, loading, generalInfomationOfTicket, passengers, isEditAction }: ReservationProps) => {
  const { t } = useTranslation(['ticketSales', 'translation']);

  const departureTrip: TripInfomationProps['data'] = useMemo(() => {
    return {
      dateFormatted:
        generalInfomationOfTicket.type === 'ONE_TRIP'
          ? generalInfomationOfTicket.data.dateFormatted
          : generalInfomationOfTicket.data.departureTrip.dateFormatted,
      trip: {
        departurePoint:
          generalInfomationOfTicket.type === 'ONE_TRIP'
            ? generalInfomationOfTicket.data.routePoint?.departurePoint
            : generalInfomationOfTicket.data.departureTrip.routePoint?.departurePoint,
        stopPoint:
          generalInfomationOfTicket.type === 'ONE_TRIP'
            ? generalInfomationOfTicket.data.routePoint?.stopPoint
            : generalInfomationOfTicket.data.departureTrip.routePoint?.stopPoint,
      },
      vehicle:
        generalInfomationOfTicket.type === 'ONE_TRIP' ? generalInfomationOfTicket.data.vehicle : generalInfomationOfTicket.data.departureTrip.vehicle,
    };
  }, [generalInfomationOfTicket]);

  const returnTrip: TripInfomationProps['data'] | null = useMemo(() => {
    if (generalInfomationOfTicket.type === 'ONE_TRIP') {
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
      <TripInfomation variant={returnTrip ? 'DEPARTURE_TRIP' : 'ONE_TRIP'} data={departureTrip} />
      {returnTrip && <TripInfomation variant={'RETURN_TRIP'} data={returnTrip} />}
      {/* {!isEditAction && <AgreeTerms label="accept_term" control={control} errors={errors} />} */}
      <TotalPrice
        value={passengers.reduce<number>((result, passenger) => {
          return result + getTotalPriceForTicketOfPassenger({ passenger, generalInfomationOfTicket });
        }, 0)}
      />
      <Button loading={loading} backgroundButton="#1AA6EE" fullWidth sx={{ marginTop: '24px' }} onClick={onSubmit}>
        {isEditAction ? t('translation:update') : t('translation:book')}
      </Button>
    </Box>
  );
};
