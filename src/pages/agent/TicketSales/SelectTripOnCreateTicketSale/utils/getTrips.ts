import dayjs from 'dayjs';
import { searchRoutes } from 'services/TicketSale/searchRoutes';
import { SelectTripFormValues } from '../SelectTripOnCreateTicketSale';

export const getTrips = async (page: number, values: SelectTripFormValues): Promise<Awaited<ReturnType<typeof searchRoutes>>['data']> => {
  try {
    const response = await searchRoutes({
      page,
      searcher: {
        tripType: { value: values.tripType, operator: 'eq' },
        departurePoint: { value: values.departurePoint?.value, operator: 'eq' },
        stopPoint: { value: values.arrivalPoint?.value, operator: 'eq' },
        departureTime: {
          value: values.departureTime && dayjs.utc(values.departureTime).unix(),
          operator: 'eq',
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
