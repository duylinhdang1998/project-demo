import dayjs from 'dayjs';
import { searchRoutes, searchRoutesPackage } from 'services/TicketSale/searchRoutes';
import { SelectTripFormValues } from '../SelectTripOnCreateOrder';

export const getTrips = async (
  page: number,
  values: Omit<SelectTripFormValues, 'departureRoute'>,
): Promise<Awaited<ReturnType<typeof searchRoutes>>['data']> => {
  try {
    const response = await searchRoutes({
      tripType: values.tripType,
      page,
      searcher: {
        departurePointCode: { value: values.departurePoint?.value._id, operator: 'eq' },
        stopPointCode: { value: values.arrivalPoint?.value._id, operator: 'eq' },
        departureTime: {
          value: values.departureTime && dayjs.utc(values.departureTime).set('second', 0).unix() * 1000,
          operator: 'gte',
        },
        ...(values.tripType === 'MULTI_STOP'
          ? {
              returnTime: {
                value: values.returnTime && dayjs.utc(values.returnTime).set('second', 0).unix() * 1000,
                operator: 'gte',
              },
            }
          : {}),
      },
    });
    return response.data;
  } catch (error) {
    return {
      hits: [],
      pagination: { totalPages: 1, totalRows: 0 },
    };
  }
};

export const getTripPackages = async (
  page: number,
  values: SelectTripFormValues,
): Promise<Awaited<ReturnType<typeof searchRoutesPackage>>['data']> => {
  try {
    const response = await searchRoutesPackage({
      tripType: values.tripType,
      page,
      searcher: {
        departurePoint: { value: values.departurePoint?.value._id, operator: 'eq' },
        stopPoint: { value: values.arrivalPoint?.value._id, operator: 'eq' },
        departureTime: {
          value: values.departureTime && dayjs.utc(values.departureTime).set('second', 0).unix() * 1000,
          operator: 'gte',
        },
        merchandises: {
          value: values.merchandises?.value,
          operator: 'eq',
        },
      },
    });
    return response.data;
  } catch {
    return {
      hits: [],
      pagination: { totalPages: 1, totalRows: 0 },
    };
  }
};
