import dayjs from 'dayjs';
import { searchRoutes, searchRoutesPackage } from 'services/TicketSale/searchRoutes';
import { SelectTripFormValues } from '../SelectTripOnCreateOrder';
import { RouteOfTicketSale } from 'services/models/TicketSale';
import { getFullTrip } from 'services/TicketSale/getFullTrip';

export const getTrips = async (
  page: number,
  values: Omit<SelectTripFormValues, 'departureRoute'>,
  isReturnTrip: boolean,
): Promise<Awaited<ReturnType<typeof searchRoutes>>['data']> => {
  try {
    const searcher = {
      departurePointCode: { value: values.departurePoint?.value._id, operator: 'eq' },
      stopPointCode: { value: values.arrivalPoint?.value._id, operator: 'eq' },
      departureTime: {
        value: isReturnTrip
          ? undefined
          : values.departureTime && !dayjs(values.departureTime).isSame(dayjs.utc(), 'day')
          ? +dayjs.utc(values.departureTime).startOf('day')
          : +dayjs(),
        operator: 'gte',
      },
      ...(values.tripType === 'MULTI_STOP' && isReturnTrip
        ? {
            returnTime: {
              value: values.returnTime ? +dayjs.utc(values.returnTime).startOf('day') : +dayjs().startOf('day'),
              operator: 'gte',
            },
          }
        : {}),
    };

    console.log('searcher>>', searcher);

    const response = await searchRoutes({
      tripType: values.tripType,
      page,
      searcher: searcher as any,
      sorter: {},
    });
    const data = await Promise.all(
      response.data.hits.map<Promise<RouteOfTicketSale>>(async item => {
        if (!item.isChanged) {
          // Gọi api để lấy giá
          const getPriceResponse_ = await getFullTrip(item.routeCode);
          return {
            ...item,
            ECOPrices: getPriceResponse_.data.ECOPrices,
            VIPPrices: getPriceResponse_.data.VIPPrices,
          };
        }
        return item;
      }),
    );
    return {
      hits: data,
      pagination: response.data.pagination,
    };
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
        departurePointCode: { value: values.departurePoint?.value._id, operator: 'eq' },
        stopPointCode: { value: values.arrivalPoint?.value._id, operator: 'eq' },
        departureTime: {
          value: values.departureTime ? dayjs.utc(values.departureTime).set('second', 0).unix() * 1000 : dayjs().unix() * 1000,
          operator: 'gte',
        },
        merchandises: {
          value: values.merchandises?.value,
          operator: 'eq',
        },
      },
      sorter: {},
    });
    return response.data;
  } catch {
    return {
      hits: [],
      pagination: { totalPages: 1, totalRows: 0 },
    };
  }
};
