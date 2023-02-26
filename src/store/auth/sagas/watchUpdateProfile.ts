import { put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { getProfile } from 'services/Company/getProfile';
import { updateProfile } from 'services/Company/updateProfile';
import { authActions } from '../authSlice';

function* handleUpdateProfile({ payload }: ReturnType<typeof authActions.updateProfileRequest>) {
  const { data, onSuccess, onFailure } = payload;
  try {
    yield retry(3, 1000, updateProfile, data);
    const response: SagaReturnType<typeof getProfile> = yield retry(3, 1000, getProfile, {});
    yield put(authActions.updateProfileSuccess({ data: response.data }));
    onSuccess();
  } catch {
    yield put(authActions.updateProfileFailure({}));
    onFailure();
  }
}

export function* watchUpdateProfile() {
  yield takeLatest(authActions.updateProfileRequest, handleUpdateProfile);
}
