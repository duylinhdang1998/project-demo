import { useRequest } from 'ahooks';
import { Options } from 'ahooks/lib/useRequest/src/types';
import { AxiosResponse } from 'axios';
import { Destination } from 'services/models/Destination';
import { ParamsSettings, ResponseDetailSuccess, ResponseSuccess } from 'services/models/Response';
import fetchAPI from 'utils/fetchAPI';
import { getListDestinations } from './getListDestinations';

interface PostDataDestination {
  title?: string;
  address?: string;
  zipCode?: string;
  city?: string;
  country?: string;
}

export const useGetListDestinations = () => {
  return useRequest<ResponseSuccess<Destination>, [ParamsSettings<Destination>]>(getListDestinations, {
    manual: true,
  });
};

export const useAddDestination = (option?: Options<ResponseDetailSuccess<Destination>, any>) => {
  const addNewDestination = async (data: PostDataDestination) => {
    const response: AxiosResponse<ResponseDetailSuccess<Destination>> = await fetchAPI.request({
      url: '/v1.0/company/destination',
      method: 'POST',
      data,
    });
    return response.data;
  };
  return useRequest<ResponseDetailSuccess<Destination>, [PostDataDestination]>(addNewDestination, {
    ...option,
    manual: true,
  });
};

export const useGetDetailDestination = (option?: Options<ResponseDetailSuccess<Destination>, any>) => {
  const getDetailDestination = async (id: string) => {
    const response: AxiosResponse<ResponseDetailSuccess<Destination>> = await fetchAPI.request({
      url: `/v1.0/company/destination/${id}/detail`,
    });
    return response.data;
  };
  return useRequest<ResponseDetailSuccess<Destination>, [string]>(getDetailDestination, {
    ...option,
    manual: true,
  });
};

export const useDeleteDestination = (option?: Options<ResponseSuccess<Destination>, any>) => {
  const deleteDestination = async (id: string) => {
    const response: AxiosResponse<ResponseSuccess<Destination>> = await fetchAPI.request({
      url: `/v1.0/company/destination/${id}`,
      method: 'DELETE',
    });
    return response.data;
  };
  return useRequest<ResponseSuccess<Destination>, [string]>(deleteDestination, {
    ...option,
    manual: true,
  });
};

export const useUpdateDestination = (option?: Options<ResponseDetailSuccess<Destination>, any>) => {
  const updateDestination = async (id: string, data: PostDataDestination) => {
    const response: AxiosResponse<ResponseDetailSuccess<Destination>> = await fetchAPI.request({
      url: `/v1.0/company/destination/${id}`,
      method: 'PUT',
      data,
    });
    return response.data;
  };
  return useRequest<ResponseDetailSuccess<Destination>, [string, PostDataDestination]>(updateDestination, {
    ...option,
    manual: true,
  });
};
