import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import CardWhite from 'components/CardWhite/CardWhite';
import LayoutDetail from 'layout/LayoutDetail';
import { Box, Grid, Stack, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FilterRoutesBySearcher } from '../TicketSales/SelectTripOnCreateOrder/components/FilterRoutesBySearcher';
import { SelectTripFormValues } from '../TicketSales/SelectTripOnCreateOrder/SelectTripOnCreateOrder';
import { useMount, useRequest, useUpdateEffect } from 'ahooks';
import { useMemo, useState } from 'react';
import { Empty, Pagination } from 'antd';
import Highlighter from 'react-highlight-words';
import CardSelectTrip from '../TicketSales/SelectTripOnCreateOrder/components/CardTrips/components/CardSelectTrip';
import { addMinutesToTimeString } from 'utils/addMinutesToTimeString';
import { RouteOfTicketSale } from 'services/models/TicketSale';
import { isEmpty } from 'lodash-es';
import { useDispatch } from 'react-redux';
import { resetOrderInformation } from 'store/packageSales/packageSalesSlice';
<<<<<<< HEAD
import { getTripPackages } from '../TicketSales/SelectTripOnCreateOrder/utils/getTrips';
=======
import { getTripPackages } from '../TicketSales/SelectTripOnCreateTicketSale/utils/getTrips';
>>>>>>> 14d847fa1f1500bca7fcc3b5cdaff0ac0fc372bc
import dayjs from 'dayjs';

const useStyles = makeStyles((theme: Theme) => ({
  buttonSearch: {
    backgroundColor: theme.palette.primary.main,
    height: '40px',
    '&:hover': {
      backgroundColor: theme.palette.primary.main + '!important',
    },
  },
  highlightText: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  title: {
    fontWeight: '400',
    fontSize: 12,
    color: theme.palette.grey[100],
  },
}));

export default function CreatePackageOrders() {
  const classes = useStyles();
  const { t } = useTranslation(['packageSales', 'translation', 'ticketSales']);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  const { control, handleSubmit, getValues } = useForm<SelectTripFormValues>({
    defaultValues: {
      arrivalPoint: undefined,
      departurePoint: undefined,
      departureTime: undefined,
      merchandises: undefined,
    },
  });

  const { run, loading, data } = useRequest(getTripPackages, {
    manual: true,
  });

  const totalPages = useMemo(() => {
    return data?.pagination.totalPages;
  }, [data?.pagination]);

  useMount(() => {
    dispatch(resetOrderInformation());
  });

  useUpdateEffect(() => {
    run(currentPage - 1, getValues());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handleSelect = (routeItem: RouteOfTicketSale) => {
    navigate('client-info', {
      state: {
        selectedRoute: routeItem,
        departureTime: dayjs(getValues().departureTime).valueOf(),
      },
    });
  };
  const onSubmit = (values: SelectTripFormValues) => {
    console.log({ values });
    setCurrentPage(1);
    run(0, values);
  };

  return (
    <LayoutDetail title={t('create_package_orders')} subTitle={t('package_sales')}>
      <CardWhite title={t('select_your_trip')}>
        <FilterRoutesBySearcher control={control} loading={loading} onSubmit={handleSubmit(onSubmit)} page="packageSales" />
        {isEmpty(data?.hits) ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> : null}

        {!isEmpty(data?.hits) && (
          <Box>
            <Highlighter
              textToHighlight={t('ticketSales:total_trips_found', { total: data?.hits.length })}
              highlightClassName={classes.highlightText}
              searchWords={[data?.hits.length.toString() ?? '']}
              autoEscape={true}
              className={classes.title}
            />
            <Grid sx={{ marginY: '16px' }} columns={12} container spacing="16px">
              {data?.hits.map((routeItem: RouteOfTicketSale) => {
                return (
                  <Grid xs={12} lg={6} item key={routeItem._id}>
                    <CardSelectTrip
                      timeStart={routeItem.route.departureTime}
                      timeEnd={addMinutesToTimeString(routeItem.route.departureTime, routeItem.durationTime)}
                      placeStart={routeItem.departurePoint}
                      placeEnd={routeItem.stopPoint}
                      duration={t('ticketSales:duration_minutes', { duration: routeItem.durationTime })}
                      vehicle={routeItem.vehicle}
                      onSelect={() => handleSelect(routeItem)}
                      dateTime={dayjs(routeItem.dateQuery).format('MM/DD/YYYY')}
                    />
                  </Grid>
                );
              })}
            </Grid>
            <Stack alignItems="flex-end">
              <Pagination onChange={setCurrentPage} current={currentPage} total={totalPages ?? 1} showLessItems />
            </Stack>
          </Box>
        )}
      </CardWhite>
    </LayoutDetail>
  );
}
