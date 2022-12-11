import qs from 'qs';
import ConfigureAxios from './fetchApi';

const axiosConfig = new ConfigureAxios({
  configure: {
    method: 'GET',
    baseURL: process.env.REACT_APP_ENDPOINT_URL,
    timeout: 10000,
    paramsSerializer: qs.stringify,
  },
  setAccessToken() {
    return '';
  },
  setRefreshToken() {
    return '';
  },
});

const fetchAPI = axiosConfig.create();

axiosConfig.accessToken({
  setCondition(config) {
    return config?.url?.search(/^http/g) === -1;
  },
});

export default fetchAPI;
