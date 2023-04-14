import { put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { getProfile } from 'services/Company/getProfile';
import { updateProfile } from 'services/Company/updateProfile';
import { ServiceException } from 'services/utils/ServiceException';
import { profileActions } from '../../profile/profileSlice';

function* handleUpdateProfile({ payload }: ReturnType<typeof profileActions.updateProfileRequest>) {
  const { data, onSuccess, onFailure } = payload;
  try {
    yield retry(3, 1000, updateProfile, data);
    const response: SagaReturnType<typeof getProfile> = yield retry(3, 1000, getProfile, {
      url: '/v1.0/company/profile',
    });
    yield put(profileActions.updateProfileSuccess({ data: response.data }));
    onSuccess();
  } catch (error) {
    yield put(profileActions.updateProfileFailure({}));
    onFailure(ServiceException.getMessageError(error));
  }
}

export function* watchUpdateProfile() {
  yield takeLatest(profileActions.updateProfileRequest, handleUpdateProfile);
}
