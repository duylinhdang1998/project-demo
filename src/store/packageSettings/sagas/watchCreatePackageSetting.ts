import { put, retry, SagaReturnType, takeLeading } from 'redux-saga/effects';
import { createPackageSetting } from 'services/PackageSettings/Company/createPackageSetting';
import { packageSettingsActions } from '../packageSettingsSlice';

function* handleCreatePackageSetting({ payload }: ReturnType<typeof packageSettingsActions.createPackageSettingRequest>) {
  const { data: formData, onFailure, onSuccess } = payload;
  try {
    const { data }: SagaReturnType<typeof createPackageSetting> = yield retry(3, 1000, createPackageSetting, formData);
    yield put(packageSettingsActions.createPackageSettingSuccess({ data }));
    onSuccess();
  } catch (error) {
    console.log('watchCreatePackageSetting.ts', error);
    yield put(packageSettingsActions.createPackageSettingFailure({}));
    // FIXME: Hiển thị lỗi giá trị đã tồn tại -> Backend đang check uniq nhưng chưa trả về thông tin lỗi
    onFailure();
  }
}

export function* watchCreatePackageSetting() {
  yield takeLeading(packageSettingsActions.createPackageSettingRequest, handleCreatePackageSetting);
}
