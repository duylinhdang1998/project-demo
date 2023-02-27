import { put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { getProfile } from 'services/Company/getProfile';
import { profileActions } from '../profileSlice';

function* handleGetProfile({ payload }: ReturnType<typeof profileActions.getProfileRequest>) {
  try {
    yield retry(3, 1000, getProfile, payload);
    const response: SagaReturnType<typeof getProfile> = yield retry(3, 1000, getProfile, {});
    yield put(profileActions.getProfileSuccess({ profile: response.data }));
  } catch {
    yield put(profileActions.getProfileFailure({}));
  }
}

export function* watchGetProfile() {
  yield takeLatest(profileActions.getProfileRequest, handleGetProfile);
}
