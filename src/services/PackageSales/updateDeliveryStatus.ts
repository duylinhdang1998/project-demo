import { AxiosResponse } from 'axios';
import { PackageSale } from 'models/PackageSales';
import { ResponseDetailSuccess, ResponseFailure } from 'services/models/Response';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';

interface UpdateDeliveryStatus {
  status: PackageSale['deliveryStatus'];
  orderCode: string;
}
export const updateDeliveryStatus = async ({ orderCode, status }: UpdateDeliveryStatus) => {
  const response: AxiosResponse<ResponseDetailSuccess<PackageSale> | ResponseFailure> = await fetchAPI.request({
    method: 'POST',
    url: `/v1.0/company/package-sales/${orderCode}/delivery-status`,
    data: { status },
  });
  if (response.data.code === 0) {
    return response.data as ResponseDetailSuccess<PackageSale>;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, response_.data);
};
