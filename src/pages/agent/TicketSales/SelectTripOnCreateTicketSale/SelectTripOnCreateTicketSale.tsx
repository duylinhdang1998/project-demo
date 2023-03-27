import { Box, Grid, Stack } from '@mui/material';
import { useRequest } from 'ahooks';
import { Empty, Pagination } from 'antd';
import CardWhite from 'components/CardWhite/CardWhite';
import { LoadingScreen } from 'components/LoadingScreen/LoadingScreen';
import dayjs from 'dayjs';
import LayoutDetail from 'layout/LayoutDetail';
import { useEffect, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { RouteOfTicketSale } from 'services/models/TicketSale';
import { searchRoutes } from 'services/TicketSale/searchRoutes';
import { addMinutesToTimeString } from 'utils/addMinutesToTimeString';
import { dayjsToString } from 'utils/dayjsToString';
import CardSelectTrip from './components/CardSelectTrip';
import { FilterRoutesBySearcher } from './components/FilterRoutesBySearcher';
import { FilterByTripTypeFormValues, FilterRoutesByTripType } from './components/FilterRoutesByTripType';
import { useStyles } from './styles';

export interface FilterRoutesFormValues {
  departurePoint?: { value: string };
  arrivalPoint?: { value: string };
  departureTime?: dayjs.Dayjs;
  tripType: RouteOfTicketSale['tripType'];
  totalPax: number;
}

const getTrips = async (page: number, values: FilterRoutesFormValues): Promise<Awaited<ReturnType<typeof searchRoutes>>['data']> => {
  try {
    const response = await searchRoutes({
      page,
      searcher: {
        tripType: { value: values.tripType, operator: 'eq' },
        departurePoint: { value: values.departurePoint?.value, operator: 'eq' },
        stopPoint: { value: values.arrivalPoint?.value, operator: 'eq' },
        'route.departureTime': {
          value: values.departureTime && dayjsToString(values.departureTime, 'HH:mm'),
          operator: 'eq',
        },
        // @ts-ignore
        quantity: {
          value: values.totalPax,
          operator: 'gte',
        },
      },
    });
    return response.data;
  } catch {
    return {
      routes: [],
      counts: [
        { _id: 'MULTI_STOP', count: 0 },
        { _id: 'ONE_TRIP', count: 0 },
      ],
    };
  }
};

export const SelectTripOnCreateTicketSale = () => {
  const classes = useStyles();
  const { t } = useTranslation(['ticketSales']);

  const { control, handleSubmit, getValues, setValue } = useForm<FilterRoutesFormValues>({
    defaultValues: {
      arrivalPoint: undefined,
      departurePoint: undefined,
      departureTime: undefined,
      totalPax: 0,
      tripType: 'ONE_TRIP',
    },
  });

  const { run, loading, data } = useRequest(getTrips, {
    manual: true,
  });

  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const getFilterByFormValues = (): FilterByTripTypeFormValues => {
    const values = getValues();
    return {
      totalPax: values.totalPax,
      tripType: values.tripType,
    };
  };

  const handleSelect = (route: RouteOfTicketSale) => {
    navigate('/agent/traveller-contact-details', { state: route });
  };

  const onSubmit = (values: FilterRoutesFormValues) => {
    setCurrentPage(1);
    run(1, values);
  };

  useEffect(() => {
    run(currentPage, getValues());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const renderCardRoutes = () => {
    if (loading) {
      return (
        <Stack alignItems="center" justifyContent="center">
          <LoadingScreen />
        </Stack>
      );
    }
    if (!data) {
      return (
        <Stack alignItems="center" justifyContent="center">
          <Empty />
        </Stack>
      );
    }
    const totalRoutes = data.counts.find(count => count._id === getFilterByFormValues().tripType)?.count ?? 0;
    return (
      <>
        <Highlighter
          textToHighlight={t('ticketSales:total_trips_found', { total: totalRoutes })}
          highlightClassName={classes.highlightText}
          searchWords={[totalRoutes.toString()]}
          autoEscape={true}
          className={classes.title}
        />
        <Box sx={{ marginBottom: '16px' }}>
          {data?.routes.map(routeItem => {
            return (
              <CardSelectTrip
                key={routeItem._id}
                timeStart={routeItem.route.departureTime}
                timeEnd={addMinutesToTimeString(routeItem.route.departureTime, routeItem.durationTime)}
                placeStart={routeItem.departurePoint}
                placeEnd={routeItem.stopPoint}
                ECOPrices={routeItem.ECOPrices}
                VIPPrices={routeItem.VIPPrices}
                duration={t('ticketSales:duration_minutes', { duration: routeItem.durationTime })}
                vehicle={routeItem.vehicle}
                onSelect={() => handleSelect(routeItem)}
              />
            );
          })}
        </Box>
        <Stack alignItems="flex-end">
          <Pagination onChange={setCurrentPage} current={currentPage} total={totalRoutes} showLessItems />
        </Stack>
      </>
    );
  };

  return (
    <LayoutDetail title={t('create_ticket_orders')} subTitle={t('sidebar.ticket_sale')}>
      <CardWhite title={t('select_your_trip')}>
        <FilterRoutesBySearcher control={control} loading={loading} onSubmit={handleSubmit(onSubmit)} />
        <Grid container spacing="24px">
          <Grid item xs={12} sm={6} md={4}>
            <FilterRoutesByTripType
              values={getFilterByFormValues()}
              counts={{
                ONE_TRIP: data?.counts.find(count => count._id === 'ONE_TRIP')?.count ?? 0,
                MULTI_STOP: data?.counts.find(count => count._id === 'MULTI_STOP')?.count ?? 0,
              }}
              onChange={({ totalPax, tripType }) => {
                setValue('totalPax', totalPax);
                setValue('tripType', tripType);
                onSubmit(getValues());
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
            {renderCardRoutes()}
          </Grid>
        </Grid>
      </CardWhite>
    </LayoutDetail>
  );
};
