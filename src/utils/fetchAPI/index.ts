import qs from "qs";
import ConfigureAxios from "./fetchApi";

const axiosConfig = new ConfigureAxios({
  configure: {
    method: "GET",
    baseURL: "http://18.142.145.111:12598",
    timeout: 10000,
    paramsSerializer: qs.stringify,
  },
  setAccessToken() {
    return "";
  },
  setRefreshToken() {
    return "";
  },
});

const fetchAPI = axiosConfig.create();

axiosConfig.accessToken({
  setCondition(config) {
    return config?.url?.search(/^http/g) === -1;
  },
});

export default fetchAPI;
