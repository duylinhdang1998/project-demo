import { useRequest } from 'ahooks';
import { Options } from 'ahooks/lib/useRequest/src/types';
import { AxiosResponse } from 'axios';
import { PackageSale } from 'models/PackageSales';
import { EPaymentStatus } from 'models/PaymentStatus';
import { ResponseData as SendEmailResponse } from 'services/TicketSale/sendEmail';
import { EnumPaymentGateway } from 'services/models/PaymentGateway';
import { ParamsSettings, ResponseDetailSuccess, ResponseFailure, ResponseSuccess } from 'services/models/Response';
import { ServiceException } from 'services/utils/ServiceException';
import { getSearchParams } from 'services/utils/getSearchParams';
import { getSortParams } from 'services/utils/getSortParams';
import fetchAPI from 'utils/fetchAPI';

const RECORDS_PER_PAGE = 10;
export interface PackageSalePayload {
  route?: string;
  departurePoint?: string;
  arrivalPoint?: string;
  departureTime?: number;
  sender?: Recipent;
  email?: string;
  recipent?: Recipent;
  merchandises?: Merchandise[];
  paymentMethod?: EnumPaymentGateway;
  orderCode?: string;
  paymentStatus?: EPaymentStatus;
}

export interface Merchandise {
  package?: string;
  weight?: number;
  price?: number;
}

export interface Recipent {
  firstName?: string;
  lastName?: string;
  mobile?: string;
  type?: string;
}

export interface SendEmailPayload {
  orderCode: string;
}

export const useGetListPackageSales = (option?: Options<ResponseSuccess<PackageSale>, any>) => {
  const getListPackageSales = async ({ page, sorter, searcher }: ParamsSettings<PackageSale>): Promise<ResponseSuccess<PackageSale>> => {
    try {
      const response: AxiosResponse<ResponseSuccess<PackageSale>> = await fetchAPI.request({
        url: '/v1.0/company/package-sales',
        params: {
          limit: RECORDS_PER_PAGE,
          offset: page * RECORDS_PER_PAGE,
          ...getSortParams(sorter),
          ...getSearchParams(searcher),
        },
      });
      return response.data;
    } catch (err) {
      return {
        code: 500,
        data: {
          hits: [],
          pagination: {
            totalRows: 0,
            totalPages: 0,
          },
        },
      };
    }
  };
  return useRequest<ResponseSuccess<PackageSale>, [ParamsSettings<PackageSale>]>(getListPackageSales, {
    ...option,
    manual: true,
  });
};

export const useGetPackageSale = () => {
  const getPackageSale = async ({
    onError,
    orderCode,
  }: {
    orderCode: PackageSale['orderCode'];
    onError?: (message: string) => void;
  }): Promise<PackageSale | undefined> => {
    try {
      const response: AxiosResponse<ResponseDetailSuccess<PackageSale> | ResponseFailure> = await fetchAPI.request({
        url: `/v1.0/company/package-sale/${orderCode}/detail`,
      });
      if (response.data.code === 0) {
        return (response.data as ResponseDetailSuccess<PackageSale>).data;
      }
      const response_ = response as AxiosResponse<ResponseFailure>;
      throw new ServiceException(response_.data.message, response_.data);
    } catch (error) {
      onError?.(ServiceException.getMessageError(error));
      return undefined;
    }
  };

  return useRequest<PackageSale | undefined, [{ orderCode: PackageSale['orderCode']; onError?: (message: string) => void }]>(getPackageSale, {
    manual: true,
  });
};

export const useCreatePackageSale = (option?: Options<ResponseDetailSuccess<PackageSale>, any>) => {
  const createPackageSale = async (data: PackageSalePayload): Promise<ResponseDetailSuccess<PackageSale>> => {
    const response: AxiosResponse<ResponseDetailSuccess<PackageSale>> = await fetchAPI.request({
      url: '/v1.0/company/package-sales',
      method: 'POST',
      data,
    });
    return response.data;
  };

  return useRequest<ResponseDetailSuccess<PackageSale>, [PackageSalePayload]>(createPackageSale, {
    manual: true,
    ...option,
  });
};

export const useUpdatePackageSale = (option?: Options<ResponseDetailSuccess<PackageSale>, any>) => {
  const updatePackageSale = async (data: PackageSalePayload): Promise<ResponseDetailSuccess<PackageSale>> => {
    const response: AxiosResponse<ResponseDetailSuccess<PackageSale>> = await fetchAPI.request({
      url: '/v1.0/company/package-sales/update',
      method: 'POST',
      data,
    });
    return response.data;
  };

  return useRequest<ResponseDetailSuccess<PackageSale>, [PackageSalePayload]>(updatePackageSale, {
    manual: true,
    ...option,
  });
};

export const useSendEmailPackageSale = (option?: Options<ResponseDetailSuccess<SendEmailResponse>, any>) => {
  const sendEmail = async ({ orderCode }: SendEmailPayload) => {
    const response: AxiosResponse<ResponseDetailSuccess<SendEmailResponse> | ResponseFailure> = await fetchAPI.request({
      url: `v1.0/company/package-sale/send-mails`,
      method: 'POST',
      data: {
        orderCode,
      },
    });
    if (response.data.code === 0) {
      return response.data as ResponseDetailSuccess<SendEmailResponse>;
    }
    const response_ = response as AxiosResponse<ResponseFailure>;
    throw new ServiceException(response_.data.message, response_.data);
  };
  return useRequest<ResponseDetailSuccess<SendEmailResponse>, [SendEmailPayload]>(sendEmail, {
    manual: true,
    ...option,
  });
};
