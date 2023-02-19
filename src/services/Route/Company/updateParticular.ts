import { AxiosResponse } from 'axios';
import { Route, StopPoint } from 'services/models/Route';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';

interface ResponseSuccess {
  code: 0;
  data: true;
}

interface ResponseFailure {
  code: 1000;
  timestamp: string;
  path: string;
  message: string;
}

export interface UpdateParticular {
  routeCode: Route['routeCode'];
  particularDay: number;
  routeParticulars: Array<{
    stopCode: StopPoint['stopCode'];
    ECOPrices: Array<{ passengerType: keyof StopPoint['ECOPrices']; price: number }>;
    VIPPrices: Array<{ passengerType: keyof StopPoint['VIPPrices']; price: number }>;
  }>;
}

export const updateParticular = async ({ routeCode, particularDay, routeParticulars }: UpdateParticular) => {
  const response: AxiosResponse<ResponseSuccess | ResponseFailure> = await fetchAPI.request({
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
    return response.data as ResponseSuccess;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, { cause: response_.data });
};
