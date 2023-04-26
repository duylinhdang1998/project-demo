import dayjs from 'dayjs';
import { searchRoutes, searchRoutesPackage } from 'services/TicketSale/searchRoutes';
import { SelectTripFormValues } from '../SelectTripOnCreateOrder';

export const getTrips = async (page: number, values: SelectTripFormValues): Promise<Awaited<ReturnType<typeof searchRoutes>>['data']> => {
  try {
    const response = await searchRoutes({
      page,
      searcher: {
        departurePoint: { value: 'Tưởng tạo ra test routers cho dễ 1', operator: 'eq' },
        stopPoint: { value: 'Tưởng tạo ra test routers cho dễ 3', operator: 'eq' },
        departureTime: {
          value: 1682428200000,
          operator: 'eq',
        },
        // tripType: { value: values.tripType, operator: 'eq' },
        // departurePoint: { value: values.departurePoint?.value, operator: 'eq' },
        // stopPoint: { value: values.arrivalPoint?.value, operator: 'eq' },
        // departureTime: {
        //   value: values.departureTime && dayjs.utc(values.departureTime).valueOf(),
        //   operator: 'eq',
        // },
        merchandises: {
          value: values.merchandises?.value,
          operator: 'eq',
        },
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
      page,
      searcher: {
        tripType: { value: values.tripType, operator: 'eq' },
        departurePoint: { value: values.departurePoint?.value, operator: 'eq' },
        stopPoint: { value: values.arrivalPoint?.value, operator: 'eq' },
        departureTime: {
          value: values.departureTime && dayjs.utc(values.departureTime).set('second', 0).unix() * 1000,
          operator: 'eq',
          // value: 1682428200000
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
