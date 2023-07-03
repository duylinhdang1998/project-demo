import qs from 'qs';
import env from 'env';
import { RootState } from 'store/configureStore';
import ConfigureAxios from './fetchApi';
import { store } from 'store/configureStore';

const axiosConfig = new ConfigureAxios({
  configure: {
    method: 'GET',
    baseURL: env.apiEndPoint,
    timeout: 30000,
    paramsSerializer: qs.stringify,
  },
  setAccessToken() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const authState = store.getState() as RootState;
    return authState.auth.token;
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
