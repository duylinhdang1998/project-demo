import { put, retry, takeLeading } from 'redux-saga/effects';
import { updatePackageSetting } from 'services/PackageSetting/Company/updatePackageSetting';
import { ServiceException } from 'services/utils/ServiceException';
import { packageSettingsActions } from '../packageSettingsSlice';

function* handleUpdatePackageSetting({ payload }: ReturnType<typeof packageSettingsActions.updatePackageSettingRequest>) {
  const { id, data, targetPackageSetting, onFailure, onSuccess } = payload;
  try {
    yield retry(3, 1000, updatePackageSetting, { data, id });
    yield put(
      packageSettingsActions.updatePackageSettingSuccess({
        data: {
          ...targetPackageSetting,
          title: data.title,
          description: data.description,
        },
      }),
    );
    onSuccess();
  } catch (error) {
    console.log('watchUpdatePackageSetting.ts', error);
    yield put(packageSettingsActions.updatePackageSettingFailure({ id }));
    onFailure(ServiceException.getMessageError(error));
  }
}

export function* watchUpdatePackageSetting() {
  yield takeLeading(packageSettingsActions.updatePackageSettingRequest, handleUpdatePackageSetting);
}
