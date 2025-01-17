import { useRequest } from 'ahooks';
import { AxiosResponse } from 'axios';
import { PackageSale } from 'models/PackageSales';
import { ResponseDetailSuccess, ResponseFailure } from 'services/models/Response';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';
import { Options } from 'ahooks/lib/useRequest/src/types';

interface UpdateDeliveryStatus {
  status: PackageSale['deliveryStatus'];
  orderCode: string;
  cancelReson?: string;
}

interface CancelPackagePayload {
  reason: string;
  orderCode: string;
}
export const updateDeliveryStatus = async ({ orderCode, cancelReson, status }: UpdateDeliveryStatus) => {
  const response: AxiosResponse<ResponseDetailSuccess<{}> | ResponseFailure> = await fetchAPI.request({
    method: 'POST',
    url: `/v1.0/company/package-sales/${orderCode}/delivery-status`,
    data: { status, cancelReson },
  });
  if (response.data.code === 0) {
    return response.data as ResponseDetailSuccess<{}>;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, response_.data);
};

export const cancelPackageSale = async ({ orderCode, reason }: CancelPackagePayload) => {
  const response: AxiosResponse<ResponseDetailSuccess<PackageSale> | ResponseFailure> = await fetchAPI.request({
    method: 'POST',
    url: `/v1.0/company/package-sales/${orderCode}/cancel`,
    data: { reason },
  });
  if (response.data.code === 0) {
    return response.data as ResponseDetailSuccess<PackageSale>;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, response_.data);
};

export const useCancelPackage = (option: Options<ResponseDetailSuccess<PackageSale> | ResponseFailure, any>) => {
  return useRequest<ResponseDetailSuccess<PackageSale> | ResponseFailure, [CancelPackagePayload]>(cancelPackageSale, {
    manual: true,
    ...option,
  });
};
