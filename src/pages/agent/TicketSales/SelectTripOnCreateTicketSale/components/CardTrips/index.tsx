import { Box, Grid, Stack } from '@mui/material';
import { Empty, Pagination } from 'antd';
import { LoadingScreen } from 'components/LoadingScreen/LoadingScreen';
import { useTranslation } from 'react-i18next';
import { RouteOfTicketSale } from 'services/models/TicketSale';
import { addMinutesToTimeString } from 'utils/addMinutesToTimeString';
import CardSelectTrip from './components/CardSelectTrip';

interface CardTripsProps {
  loading: boolean;
  totalRoutes: number;
  routes: RouteOfTicketSale[];
  tripType: RouteOfTicketSale['tripType'];
  onSelect: (route: RouteOfTicketSale) => void;
  setCurrentPage: (page: number) => void;
  currentPage: number;
}

export const CardTrips = ({ loading, totalRoutes, routes, currentPage, setCurrentPage, onSelect }: CardTripsProps) => {
  const { t } = useTranslation(['ticketSales']);

  if (loading) {
    return (
      <Stack alignItems="center" justifyContent="center" position="relative">
        <LoadingScreen />
      </Stack>
    );
  }
  if (!routes.length) {
    return (
      <Stack alignItems="center" justifyContent="center">
        <Empty />
      </Stack>
    );
  }
  return (
    <Box>
      <Grid sx={{ marginBottom: '16px' }} spacing="16px" container>
        {routes.map(routeItem => {
          return (
            <Grid item xs={12} md={6} key={routeItem._id}>
              <CardSelectTrip
                timeStart={routeItem.route.departureTime}
                timeEnd={addMinutesToTimeString(routeItem.route.departureTime, routeItem.durationTime)}
                placeStart={routeItem.departurePoint}
                placeEnd={routeItem.stopPoint}
                duration={t('ticketSales:duration_minutes', { duration: routeItem.durationTime })}
                vehicle={routeItem.vehicle}
                onSelect={() => onSelect(routeItem)}
                // FIXME: Cái gì ở đây ?
                dateTime="04/27/2022"
              />
            </Grid>
          );
        })}
      </Grid>
      <Stack alignItems="center">
        <Pagination
          onChange={setCurrentPage}
          current={currentPage}
          total={totalRoutes}
          showLessItems
          showQuickJumper={false}
          showSizeChanger={false}
        />
      </Stack>
    </Box>
  );
};
