import { put, retry, SagaReturnType, select, takeLatest } from 'redux-saga/effects';
import { getProfile } from 'services/Company/getProfile';
import { RootState } from 'store/configureStore';
import { profileActions } from '../profileSlice';

function* handleGetProfile(_: ReturnType<typeof profileActions.getProfileRequest>) {
  try {
    const roleUser = yield select((state: RootState) => state.auth.userInfo?.role);
    // yield retry(3, 1000, getProfile, payload);
    const response: SagaReturnType<typeof getProfile> = yield retry(3, 1000, getProfile, {
      url: roleUser === 'admin' ? '/v1.0/company/profile' : '/v1.0/company/staffs/profile',
    });
    yield put(profileActions.getProfileSuccess({ profile: response.data }));
  } catch {
    yield put(profileActions.getProfileFailure({}));
  }
}

export function* watchGetProfile() {
  yield takeLatest(profileActions.getProfileRequest, handleGetProfile);
}
