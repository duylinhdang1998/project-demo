import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { StringMappingToStatusCode } from 'services/models/StatusCode';
import { isResponseError } from 'services/utils/isResponseError';
import { getDomainName } from 'utils/getDomainName';

interface Configure {
  configure: AxiosRequestConfig;
  setAccessToken: () => string;
  setRefreshToken: () => string;
}

type Success<ResponseDataT> = (res: AxiosResponse<ResponseDataT>, originalRequest: AxiosRequestConfig) => void;

type Failure = (error: AxiosError) => void;

interface AccessTokenParams {
  setCondition: (config: AxiosRequestConfig) => boolean;
}

interface Config<ResponseDataT, AxiosDataReturnT> {
  url: string;
  setRefreshCondition: (error: AxiosError) => boolean;
  axiosData: (refreshToken: string, accessToken: string) => AxiosDataReturnT;
  success: Success<ResponseDataT>;
  failure: Failure;
}

const { CancelToken } = axios;

export default class ConfigureAxios {
  private axiosInstance: AxiosInstance;
  private setAccessToken: () => string;
  private setRefreshToken: () => string;

  public constructor({ configure, setAccessToken, setRefreshToken }: Configure) {
    this.setAccessToken = setAccessToken;
    this.setRefreshToken = setRefreshToken;
    this.axiosInstance = axios.create(configure);
    this.axiosInstance.interceptors.response.use(response => {
      if (
        isResponseError(response) &&
        (response.data.code === StringMappingToStatusCode['COMPANY_DOMAIN_IS_NOT_EXIST'] ||
          response.data.code === StringMappingToStatusCode['COMPANY_NOT_FOUND'])
      ) {
        window.location.replace('/404');
        return response;
      }
      return response;
    });
  }

  public create = (cancel = '') => {
    return {
      request: (requestConfig: AxiosRequestConfig) => {
        const source = CancelToken.source();
        const request = this.axiosInstance({
          ...requestConfig,
          cancelToken: source.token,
          headers: {
            'X-Host': getDomainName(),
          },
        });
        if (!!cancel) {
          // @ts-ignore
          request[cancel] = source.cancel;
        }
        return request;
      },
    };
  };

  public accessToken = ({ setCondition }: AccessTokenParams) => {
    this.axiosInstance.interceptors.request.use(config => {
      if (!config?.url) {
        return config;
      }
      const accessToken = this.setAccessToken();
      if (setCondition(config) && !config?.headers?.Authorization) {
        if (!!accessToken) {
          //@ts-ignore
          config.headers.Authorization = accessToken;
        }
      }
      return config;
    });
  };

  private handleRefreshTokenAsync = async <ResponseDataT, AxiosDataReturnT>(config: Config<ResponseDataT, AxiosDataReturnT>, error: AxiosError) => {
    const { url, axiosData, success, failure } = config;
    try {
      const refreshToken = this.setRefreshToken();
      const accessToken = this.setAccessToken();
      const res = await this.axiosInstance.post<ResponseDataT>(url, axiosData(refreshToken, accessToken));
      success(res, error.config);
      return await this.axiosInstance.request(error.config);
    } catch (err) {
      failure(error);
      return await Promise.reject(error);
    } finally {
      this.refreshToken(config);
    }
  };

  public refreshToken = <ResponseDataT = any, AxiosDataReturnT = any>(config: Config<ResponseDataT, AxiosDataReturnT>) => {
    const interceptor = this.axiosInstance.interceptors.response.use(undefined, (error: AxiosError) => {
      if (!config.setRefreshCondition(error)) {
        return Promise.reject(error);
      }
      this.axiosInstance.interceptors.response.eject(interceptor);
      return this.handleRefreshTokenAsync(config, error);
    });
  };
}
