import { useRequest } from 'ahooks';
import { AxiosResponse } from 'axios';
import { ParamsSettings, ResponseDetailSuccess, ResponseSuccess } from 'services/models/Response';
import { getSearchParams } from 'services/utils/getSearchParams';
import { getSortParams } from 'services/utils/getSortParams';
import fetchAPI from 'utils/fetchAPI';

export interface ITrackingEvent {
  _id: string;
  dateTracking?: string;
  trackings: {
    TICKET_MONEY_DAILY: number;
    PACKAGE_MONEY_DAILY: number;
    PASSENGER_DAILY: number;
    PARCELS_DAILY: number;
  };
}

interface Seats {
  ECO?: number;
  VIP?: number;
}

export interface ITrackingRoute {
  _id?: string;
  company?: string;
  dateTracking?: Date;
  dateRoute?: number;
  seatsAvailable?: Seats;
  seatsBooked?: Seats;
  route: {
    _id?: string;
    departurePoint: string;
    stopPoint: string;
    durationTime: number;
  };
  vehicle: ITrackingVehicle;
}

interface ITrackingVehicle {
  _id: string;
  brand?: string;
  model?: string;
  registrationId?: string;
  ECOseats?: number;
  VIPseats?: number;
}

const RECORDS_PER_PAGE = 10;
export const useGetRouteProgramDashboard = () => {
  const getRouteProgramDashboard = async ({ page, sorter, searcher }: ParamsSettings<ITrackingRoute>) => {
    try {
      const response: AxiosResponse<ResponseSuccess<ITrackingRoute>> = await fetchAPI.request({
        url: 'v1.0/company/tracking/routes',
        params: {
          limit: RECORDS_PER_PAGE,
          offset: page * RECORDS_PER_PAGE,
          ...getSortParams(sorter),
          ...getSearchParams(searcher),
        },
      });
      return response.data.code === 0 ? response.data.data : undefined;
    } catch (err) {
      console.log(err);
    }
  };
  return useRequest(getRouteProgramDashboard, {
    manual: true,
  });
};

export const useGetDashboard = () => {
  const getDashboard = async () => {
    try {
      const [trackingEvents, trackingVehicles, trackingRoutes] = await Promise.all<
        [
          Promise<AxiosResponse<ResponseDetailSuccess<ITrackingEvent>>>,
          Promise<AxiosResponse<ResponseSuccess<ITrackingVehicle>>>,
          Promise<AxiosResponse<ResponseSuccess<ITrackingRoute>>>,
        ]
      >([
        fetchAPI.request({
          url: 'v1.0/company/tracking/events',
        }),
        fetchAPI.request({
          url: 'v1.0/company/tracking/vehicles',
        }),
        fetchAPI.request({
          url: 'v1.0/company/tracking/routes',
        }),
      ]);
      return {
        trackingEvents: trackingEvents.data.code === 0 ? trackingEvents.data.data : undefined,
        trackingRoutes: trackingRoutes.data.code === 0 ? trackingRoutes.data.data : undefined,
        trackingVehicles: trackingVehicles.data.code === 0 ? trackingVehicles.data.data : undefined,
      };
    } catch (err) {
      console.log(err);
    }
  };
  return useRequest(getDashboard);
};
