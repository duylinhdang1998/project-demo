import { put, retry, SagaReturnType, takeLeading } from 'redux-saga/effects';
import { getPackageSetting } from 'services/PackageSetting/Company/getPackageSetting';
import { updatePackageSetting } from 'services/PackageSetting/Company/updatePackageSetting';
import { ServiceException } from 'services/utils/ServiceException';
import { packageSettingsActions } from '../packageSettingsSlice';

function* handleUpdatePackageSetting({ payload }: ReturnType<typeof packageSettingsActions.updatePackageSettingRequest>) {
  const { id, data, onFailure, onSuccess } = payload;
  try {
    yield retry(3, 1000, updatePackageSetting, { data, id });
    const response: SagaReturnType<typeof getPackageSetting> = yield retry(3, 1000, getPackageSetting, { id });
    yield put(
      packageSettingsActions.updatePackageSettingSuccess({
        data: response.data,
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
