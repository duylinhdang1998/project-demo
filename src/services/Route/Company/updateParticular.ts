import { AxiosResponse } from 'axios';
import { ResponseDetailSuccess, ResponseFailure } from 'services/models/Response';
import { Route, RoutePoint, RoutePointPriceType } from 'services/models/Route';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';

type ResponseData = true;

export interface UpdateParticular {
  routeCode: Route['routeCode'];
  particularDay: number;
  routeParticulars: Array<{
    routePointId: RoutePoint['_id'];
    ECOPrices: Array<{ passengerType: RoutePointPriceType; price: number }>;
    VIPPrices: Array<{ passengerType: RoutePointPriceType; price: number }>;
  }>;
}

export const updateParticular = async ({ routeCode, particularDay, routeParticulars }: UpdateParticular) => {
  const response: AxiosResponse<ResponseDetailSuccess<ResponseData> | ResponseFailure> = await fetchAPI.request({
    method: 'PUT',
    url: `/v1.0/company/routes/${routeCode}/days/particular`,
    data: {
      particularDay: Number(particularDay),
      routeParticulars: routeParticulars.map(routeParticular => ({
        ...routeParticular,
        ECOPrices: routeParticular.ECOPrices.map(ECOPrice => ({ ...ECOPrice, price: Number(ECOPrice.price) })),
        VIPPrices: routeParticular.VIPPrices.map(VIPPrice => ({ ...VIPPrice, price: Number(VIPPrice.price) })),
      })),
    },
  });

  if (response.data.code === 0) {
    return response.data as ResponseDetailSuccess<ResponseData>;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, response_.data);
};
