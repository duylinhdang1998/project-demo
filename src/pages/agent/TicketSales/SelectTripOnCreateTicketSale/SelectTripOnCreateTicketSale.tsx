import { useRequest } from 'ahooks';
import CardWhite from 'components/CardWhite/CardWhite';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import LayoutDetail from 'layout/LayoutDetail';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { RouteOfTicketSale } from 'services/models/TicketSale';
import { CardTrips } from './components/CardTrips';
import { FilterRoutesBySearcher } from './components/FilterRoutesBySearcher';
import { FilterRoutesByTripType } from './components/FilterRoutesByTripType';
import { Steps } from './components/Steps';
import { getTrips } from './utils/getTrips';

dayjs.extend(utc);
dayjs.extend(timezone);

export interface SelectTripFormValues {
  departurePoint?: { value: string };
  arrivalPoint?: { value: string };
  departureTime?: number;
  tripType: RouteOfTicketSale['tripType'];
  departureTrip: RouteOfTicketSale | null;
  merchandises?: { value: string };
}

export const SelectTripOnCreateTicketSale = () => {
  const { t } = useTranslation(['ticketSales']);

  const { control, handleSubmit, getValues, setValue, watch } = useForm<SelectTripFormValues>({
    defaultValues: {
      arrivalPoint: undefined,
      departurePoint: undefined,
      departureTime: undefined,
      tripType: 'ONE_TRIP',
      departureTrip: null,
    },
  });
  const tripType = watch('tripType');
  const departureTrip = watch('departureTrip');

  console.log(111, departureTrip);

  const { run, loading, data } = useRequest(getTrips, { manual: true });

  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const onSubmit = (values: SelectTripFormValues) => {
    setCurrentPage(1);
    run(0, values);
  };

  const handleSelectTrip = (route: RouteOfTicketSale) => {
    if (tripType === 'ONE_TRIP') {
      navigate('/agent/ticket-sales/traveller-contact-details', {
        state: route,
      });
    } else {
      if (!departureTrip) {
        setValue('departureTrip', route);
      } else {
        navigate('/agent/ticket-sales/traveller-contact-details', {
          state: {
            departureTrip,
            returnTrip: route,
          },
        });
      }
    }
  };

  useEffect(() => {
    run(currentPage - 1, getValues());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <LayoutDetail title={t('ticketSales:create_ticket_order')} subTitle={t('sidebar:ticket_sale')}>
      <CardWhite
        title={t('ticketSales:select_your_trip')}
        header={
          <FilterRoutesByTripType
            tripType={tripType}
            onChange={tripType => {
              setValue('tripType', tripType);
              setValue('departureTrip', null);
              onSubmit(getValues());
            }}
          />
        }
      >
        <FilterRoutesBySearcher control={control} loading={loading} onSubmit={handleSubmit(onSubmit)} />
        <Steps step={departureTrip ? 1 : 0} tripType={tripType} />
        <CardTrips
          totalRoutes={data?.pagination.totalRows ?? 0}
          currentPage={currentPage}
          loading={loading}
          onSelect={handleSelectTrip}
          routes={data?.hits ?? []}
          setCurrentPage={setCurrentPage}
          tripType={tripType}
        />
      </CardWhite>
    </LayoutDetail>
  );
};
