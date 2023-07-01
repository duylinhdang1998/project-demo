import { Box, Grid, Stack } from '@mui/material';
import { Empty, Pagination } from 'antd';
import { LoadingScreen } from 'components/LoadingScreen/LoadingScreen';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { RouteOfTicketSale } from 'services/models/TicketSale';
import { addMinutesToTimeString } from 'utils/addMinutesToTimeString';
import CardSelectTrip from './components/CardSelectTrip';
import { formatDuration } from 'utils/formatDuration';

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
  const { t } = useTranslation(['ticketSales', 'translation']);

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
          const depatureTime = dayjs(routeItem.dateQuery);
          return (
            <Grid item xs={12} md={6} key={routeItem._id}>
              <CardSelectTrip
                timeStart={routeItem.route.departureTime}
                timeEnd={addMinutesToTimeString(routeItem.route.departureTime, routeItem.durationTime)}
                placeStart={routeItem.departurePoint}
                placeEnd={routeItem.stopPoint}
                duration={t('ticketSales:about_duration', { duration: formatDuration(routeItem.durationTime) })}
                vehicle={routeItem.vehicle}
                onSelect={() => onSelect(routeItem)}
                dateTime={depatureTime.isValid() ? depatureTime.format('DD/MM/YYYY') : ''}
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
