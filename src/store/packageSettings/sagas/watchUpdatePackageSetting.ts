import { put, retry, SagaReturnType, select, takeLeading } from 'redux-saga/effects';
import { updatePackageSetting } from 'services/PackageSettings/Company/updatePackageSetting';
import { packageSettingsActions } from '../packageSettingsSlice';
import { selectPackageSettings } from '../selectors';

function* handleUpdatePackageSetting({ payload }: ReturnType<typeof packageSettingsActions.updatePackageSettingRequest>) {
  const { id, data, onFailure, onSuccess } = payload;
  const packageSettingsStates: SagaReturnType<typeof selectPackageSettings> = yield select(selectPackageSettings);
  try {
    if (packageSettingsStates.packageSetting) {
      yield retry(3, 1000, updatePackageSetting, payload);
      yield put(
        packageSettingsActions.updatePackageSettingSuccess({
          data: {
            ...packageSettingsStates.packageSetting,
            ...data,
          },
        }),
      );
      onSuccess();
    } else {
      yield put(packageSettingsActions.updatePackageSettingFailure({ id }));
      onFailure();
    }
  } catch (error) {
    console.log('watchUpdatePackageSetting.ts', error);
    yield put(packageSettingsActions.updatePackageSettingFailure({ id }));
    onFailure();
  }
}

export function* watchUpdatePackageSetting() {
  yield takeLeading(packageSettingsActions.updatePackageSettingRequest, handleUpdatePackageSetting);
}
