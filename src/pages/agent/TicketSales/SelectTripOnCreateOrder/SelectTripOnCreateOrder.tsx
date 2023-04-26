import { useRequest } from 'ahooks';
import CardWhite from 'components/CardWhite/CardWhite';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import LayoutDetail from 'layout/LayoutDetail';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RouteOfTicketSale } from 'services/models/TicketSale';
import { selectAuth } from 'store/auth/selectors';
import {
  LocationStateForCreateOrderOneTrip,
  LocationStateForCreateOrderRoundTrip,
} from '../OrderDetailOnCreateOrder/@types/GeneralInfomationOfOrder';
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
  departureRoute: RouteOfTicketSale | null;
  merchandises?: { value: string };
}

export const SelectTripOnCreateOrder = () => {
  const { t } = useTranslation(['ticketSales']);

  const { control, handleSubmit, getValues, setValue, watch } = useForm<SelectTripFormValues>({
    defaultValues: {
      arrivalPoint: undefined,
      departurePoint: undefined,
      departureTime: undefined,
      tripType: 'ONE_TRIP',
      departureRoute: null,
    },
  });
  const tripType = watch('tripType');
  const departureRoute = watch('departureRoute');

  const { run, loading, data } = useRequest(getTrips, { manual: true });

  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const { userInfo } = useSelector(selectAuth);
  const isAgent = userInfo?.role === 'agent';

  const onSubmit = (values: SelectTripFormValues) => {
    setCurrentPage(1);
    run(0, values);
  };

  const handleSelectTrip = (route: RouteOfTicketSale) => {
    const nextUrl = isAgent ? '/agent/ticket-sales/traveller-contact-details' : '/admin/ticket-sales/traveller-contact-details';
    if (tripType === 'ONE_TRIP') {
      navigate(nextUrl, {
        state: {
          type: 'ONE_TRIP',
          data: {
            dateFormatted: route.dateQuery,
            vehicle: route.vehicle,
            routePoint: {
              ...route,
              vehicle: route.vehicle?._id,
            },
          },
        } as LocationStateForCreateOrderOneTrip,
      });
    } else {
      if (!departureRoute) {
        setValue('departureRoute', route);
      } else {
        navigate(nextUrl, {
          state: {
            type: 'ROUND_TRIP',
            data: {
              departureTrip: {
                dateFormatted: departureRoute.dateQuery,
                vehicle: departureRoute.vehicle,
                routePoint: {
                  ...departureRoute,
                  vehicle: departureRoute.vehicle?._id,
                },
              },
              returnTrip: {
                dateFormatted: route.dateQuery,
                vehicle: route.vehicle,
                routePoint: {
                  ...route,
                  vehicle: route.vehicle?._id,
                },
              },
            },
          } as LocationStateForCreateOrderRoundTrip,
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
              setValue('departureRoute', null);
              onSubmit(getValues());
            }}
          />
        }
      >
        <FilterRoutesBySearcher control={control} loading={loading} onSubmit={handleSubmit(onSubmit)} />
        <Steps step={departureRoute ? 1 : 0} tripType={tripType} />
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
