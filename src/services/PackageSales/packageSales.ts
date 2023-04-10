import { useRequest } from 'ahooks';
import { Options } from 'ahooks/lib/useRequest/src/types';
import { AxiosResponse } from 'axios';
import { Country } from 'models/Country';
import { PackageSale } from 'models/PackageSales';
import { ParamsSettings, ResponseDetailSuccess, ResponseSuccess } from 'services/models/Response';
import { getSearchParams } from 'services/utils/getSearchParams';
import { getSortParams } from 'services/utils/getSortParams';
import fetchAPI from 'utils/fetchAPI';

const RECORDS_PER_PAGE = 10;
export interface PackageSalePayload {
  route?: string;
  departurePoint?: string;
  arrivalPoint?: string;
  departureTime?: string;
  sender?: Recipent;
  email?: string;
  recipent?: Recipent;
  merchandises?: Merchandise[];
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
      console.log('123', err);
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
    onSuccess(data) {
      console.log(data);
    },
    onError: err => {
      console.log('456', err);
    },
  });
};

export const getCountryList = async (): Promise<ResponseSuccess<Country>> => {
  const response: AxiosResponse<ResponseSuccess<Country>> = await fetchAPI.request({
    url: '/v1.0/countries',
    params: {
      limit: 1000,
      offset: 0,
    },
  });
  return response.data;
};

export const useGetCountryList = () => {
  return useRequest(getCountryList);
};

export const useGetPackageSale = () => {
  const getPackageSale = async (orderCode: PackageSale['orderCode']): Promise<PackageSale | null> => {
    try {
      const response: AxiosResponse<ResponseDetailSuccess<PackageSale>> = await fetchAPI.request({
        url: `/v1.0/company/package-sale/${orderCode}/detail`,
      });
      return response.data.data;
    } catch {
      return null;
    }
  };

  return useRequest<PackageSale | null, [PackageSale['orderCode']]>(getPackageSale, {
    manual: true,
  });
};

export const useCreatePackageSale = (option?: Options<ResponseSuccess<PackageSale>, any>) => {
  const createPackageSale = async (data: PackageSalePayload): Promise<ResponseSuccess<PackageSale>> => {
    const response: AxiosResponse<ResponseSuccess<PackageSale>> = await fetchAPI.request({
      url: '/v1.0/company/package-sales',
      method: 'POST',
      data,
    });
    return response.data;
  };

  return useRequest<ResponseSuccess<PackageSale>, [PackageSalePayload]>(createPackageSale, {
    manual: true,
    ...option,
  });
};
