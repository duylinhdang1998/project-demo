import { put, retry, takeLeading } from 'redux-saga/effects';
import { deletePackageSetting } from 'services/PackageSettings/Company/deletePackageSetting';
import { packageSettingsActions } from '../packageSettingsSlice';

function* handleDeletePackageSetting({ payload }: ReturnType<typeof packageSettingsActions.deletePackageSettingRequest>) {
  const { id, onFailure, onSuccess } = payload;
  try {
    yield retry(3, 1000, deletePackageSetting, payload);
    yield put(packageSettingsActions.deletePackageSettingSuccess({ id }));
    onSuccess();
  } catch (error) {
    console.log('watchDeletePackageSetting.ts', error);
    yield put(packageSettingsActions.deletePackageSettingFailure({ id }));
    onFailure();
  }
}

export function* watchDeletePackageSetting() {
  yield takeLeading(packageSettingsActions.deletePackageSettingRequest, handleDeletePackageSetting);
}
