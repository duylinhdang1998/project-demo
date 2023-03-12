import { Grid } from '@mui/material';
import { useRequest } from 'ahooks';
import { Empty } from 'antd';
import { AxiosResponse } from 'axios';
import CardWhite from 'components/CardWhite/CardWhite';
import LayoutDetail from 'layout/LayoutDetail';
import { useEffect } from 'react';
import Highlighter from 'react-highlight-words';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { getSearchParams } from 'services/utils/getSearchParams';
import fetchAPI from 'utils/fetchAPI';
import CardSelectTrip from './components/CardSelectTrip';
import { FilterRoutesBySearcher } from './components/FilterRoutesBySearcher';
import { FilterByTripTypeFormValues, FilterRoutesByTripType } from './components/FilterRoutesByTripType';
import { useStyles } from './styles';

export interface FilterRoutesFormValues {
  departurePoint?: { value: string };
  arrivalPoint?: { value: string };
  departureTime?: any;
  tripType: Array<'ONE_WAY' | 'MULTI_STOP'>; // FIXME: Enum
  totalPax: number;
}

// FIXME: Update khi sửa xong page "Routers"
const getTrips = async (tripType: any, values: FilterRoutesFormValues) => {
  interface ResponseData {
    counts: [{ _id: 'MULTI_STOP'; count: number }, { _id: 'ONE_TRIP'; count: number }];
    routes: Array<{
      _id: '63f86e161928573f21a81601';
      company: '63d8d5e3b4c7b31bf36765c2';
      routeCode: '19265369';
      departurePoint: 'Nam Định';
      stopPoint: 'Hà Nội';
      durationTime: 120;
      ECOPrices: { ADULT: 20; STUDENT: 15; CHILD: 10 };
      VIPPrices: { ADULT: 30; STUDENT: 25; CHILD: 20 };
      isChanged: true;
      routeType: any;
      tripType: any;
      createdAt: '2023-02-24T07:58:14.273Z';
      updatedAt: '2023-02-24T07:58:14.273Z';
      __v: 0;
    }>;
  }
  const response: AxiosResponse<{ data: { hits: ResponseData } }> = await fetchAPI.request({
    url: '/v1.0/company/routes',
    params: {
      ...getSearchParams<any>({
        // FIXME: Departure time search theo gì ?
        departurePoint: { value: values.departurePoint?.value, operator: 'eq' },
        stopPoint: { value: values.arrivalPoint?.value, operator: 'eq' },
        tripType: { value: tripType, operator: 'eq' },
      }),
    },
  });
  return response.data.data.hits;
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
      tripType: ['ONE_WAY'],
    },
  });

  const { run, loading, data } = useRequest(getTrips, {
    manual: true,
  });

  const navigate = useNavigate();

  const getFilterByFormValues = (): FilterByTripTypeFormValues => {
    const values = getValues();
    return {
      totalPax: values.totalPax,
      tripType: values.tripType,
    };
  };

  const handleSelect = (route: any) => {
    navigate('/agent/traveller-contact-details', { state: route });
  };

  const onSubmit = (values: FilterRoutesFormValues) => {
    console.log(values);
    // run('ONE_TRIP', values);
  };

  useEffect(() => {
    run('ONE_TRIP', getValues());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderCardRoutes = () => {
    if (loading) {
      return <h1>Loading...</h1>;
    }
    if (!data) {
      return <Empty />;
    }
    return (
      <Grid item xs={12} md={8}>
        <Highlighter
          textToHighlight={t('ticketSales:total_trips_found', { total: data.routes.length })}
          highlightClassName={classes.highlightText}
          searchWords={[data.routes.length.toString()]}
          autoEscape={true}
          className={classes.title}
        />
        {data?.routes.map(route => {
          return (
            <CardSelectTrip
              key={route._id}
              // FIXME: Cái gì điền ở đây
              timeStart="08:30"
              // FIXME: Cái gì điền ở đây
              timeEnd="10:30"
              placeStart={route.departurePoint}
              // FIXME: Cái gì điền ở đây
              placeEnd={route.stopPoint}
              // FIXME: Cái gì điền ở đây
              price={20}
              // FIXME: Cái gì điền ở đây
              duration={t('ticketSales:duration_minutes', { duration: route.durationTime })}
              // FIXME: Cái gì điền ở đây
              vehicle="Mercedes S450"
              onSelect={() => handleSelect(route)}
            />
          );
        })}
      </Grid>
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
                ONE_WAY: 12,
                MULTI_STOP: 11,
              }}
              onChange={({ totalPax, tripType }) => {
                setValue('totalPax', totalPax);
                setValue('tripType', tripType);
                onSubmit(getValues());
              }}
            />
          </Grid>
          {renderCardRoutes()}
        </Grid>
      </CardWhite>
    </LayoutDetail>
  );
};
