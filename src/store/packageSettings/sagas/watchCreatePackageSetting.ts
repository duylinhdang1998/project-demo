import { call, put, SagaReturnType, takeLeading } from 'redux-saga/effects';
import { createPackageSetting } from 'services/PackageSetting/Company/createPackageSetting';
import { ServiceException } from 'services/utils/ServiceException';
import { packageSettingsActions } from '../packageSettingsSlice';

function* handleCreatePackageSetting({ payload }: ReturnType<typeof packageSettingsActions.createPackageSettingRequest>) {
  const { data: formData, onFailure, onSuccess } = payload;
  try {
    const { data }: SagaReturnType<typeof createPackageSetting> = yield call(createPackageSetting, formData);
    yield put(packageSettingsActions.createPackageSettingSuccess({ data }));
    onSuccess();
  } catch (error) {
    console.log('watchCreatePackageSetting.ts', error);
    yield put(packageSettingsActions.createPackageSettingFailure({}));
    onFailure(ServiceException.getMessageError(error));
  }
}

export function* watchCreatePackageSetting() {
  yield takeLeading(packageSettingsActions.createPackageSettingRequest, handleCreatePackageSetting);
}
