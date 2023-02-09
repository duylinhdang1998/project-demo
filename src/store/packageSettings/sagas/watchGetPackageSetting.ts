import { put, retry, SagaReturnType, takeLeading } from 'redux-saga/effects';
import { getPackageSetting } from 'services/PackageSettings/Company/getPackageSetting';
import { packageSettingsActions } from '../packageSettingsSlice';

function* handleGetPackageSetting({ payload }: ReturnType<typeof packageSettingsActions.getPackageSettingRequest>) {
  const { id } = payload;
  try {
    const { data }: SagaReturnType<typeof getPackageSetting> = yield retry(3, 1000, getPackageSetting, { id });
    yield put(packageSettingsActions.getPackageSettingSuccess({ data }));
  } catch (error) {
    console.log('watchGetPackageSetting.ts', error);
    yield put(packageSettingsActions.getPackageSettingFailure({}));
  }
}

export function* watchGetPackageSetting() {
  yield takeLeading(packageSettingsActions.getPackageSettingRequest, handleGetPackageSetting);
}
