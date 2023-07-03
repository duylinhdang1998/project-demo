import { call, put, takeLeading } from 'redux-saga/effects';
import { deletePackageSetting } from 'services/PackageSetting/Company/deletePackageSetting';
import { ServiceException } from 'services/utils/ServiceException';
import { packageSettingsActions } from '../packageSettingsSlice';

function* handleDeletePackageSetting({ payload }: ReturnType<typeof packageSettingsActions.deletePackageSettingRequest>) {
  const { id, onFailure, onSuccess } = payload;
  try {
    yield call(deletePackageSetting, payload);
    yield put(packageSettingsActions.deletePackageSettingSuccess({ id }));
    onSuccess();
  } catch (error) {
    console.log('watchDeletePackageSetting.ts', error);
    yield put(packageSettingsActions.deletePackageSettingFailure({ id }));
    onFailure(ServiceException.getMessageError(error));
  }
}

export function* watchDeletePackageSetting() {
  yield takeLeading(packageSettingsActions.deletePackageSettingRequest, handleDeletePackageSetting);
}
