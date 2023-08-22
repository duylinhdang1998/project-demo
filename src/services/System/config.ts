import { useRequest } from 'ahooks';
import fetchAPI from 'utils/fetchAPI';
import { Options } from 'ahooks/lib/useRequest/src/types';
import { useDispatch, useSelector } from 'react-redux';
import { profileActions } from 'store/profile/profileSlice';
import { get } from 'lodash-es';
import { selectProfile } from 'store/profile/selectors';

const getSystemConfig = async () => {
  try {
    const response = await fetchAPI.request({
      url: '/v1.0/system/configs',
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
export const useGetSystemConfig = () => {
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);
  return useRequest(getSystemConfig, {
    ready: !!profile.profile?._id,
    onSuccess: data => {
      if (data.code === 0) {
        dispatch(profileActions.setCurrencySetting(get(data, 'data.currency', '')));
      }
    },
  });
};

interface Payload {
  currency: string;
}

interface ResponseUpdateCurrency {
  code: number;
}
export const useSetCurrencyConfig = (options?: Options<ResponseUpdateCurrency, any>) => {
  const updateCurrency = async ({ currency }: Payload) => {
    try {
      const response = await fetchAPI.request({
        method: 'post',
        url: '/v1.0/system/configs',
        data: {
          currency,
        },
      });
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };
  return useRequest<ResponseUpdateCurrency, [Payload]>(updateCurrency, {
    manual: true,
    ...options,
  });
};
