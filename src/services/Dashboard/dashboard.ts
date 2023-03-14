import { useRequest } from 'ahooks';
import { AxiosResponse } from 'axios';
import { ResponseDetailSuccess, ResponseSuccess } from 'services/models/Response';
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

interface ITrackingRoute {
  _id?: string;
  company?: string;
  dateTracking?: Date;
  dateRoute?: number;
  seatsAvailable?: Seats;
  seatsBooked?: Seats;
}

interface ITrackingVehicle {
  _id: string;
  brand?: string;
  model?: string;
  registrationId?: string;
  ECOseats?: number;
  VIPseats?: number;
}

export const useGetDashboard = () => {
  const getTrackingEvents: Promise<AxiosResponse<ResponseDetailSuccess<ITrackingEvent>>> = fetchAPI.request({
    url: 'v1.0/company/tracking/events',
  });

  const getTrackingVehicles: Promise<AxiosResponse<ResponseSuccess<ITrackingVehicle>>> = fetchAPI.request({
    url: 'v1.0/company/tracking/vehicles',
  });
  const getTrackingRoutes: Promise<AxiosResponse<ResponseSuccess<ITrackingRoute>>> = fetchAPI.request({
    url: 'v1.0/company/tracking/routes',
  });
  const getDashboard = async () => {
    try {
      const [trackingEvents, trackingRoutes, trackingVehicles] = await Promise.all([getTrackingEvents, getTrackingVehicles, getTrackingRoutes]);
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
