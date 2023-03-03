import { put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { getPackageSettings } from 'services/PackageSetting/Company/getPackageSettings';
import { packageSettingsActions } from '../packageSettingsSlice';

function* handleGetPackageSettings({ payload }: ReturnType<typeof packageSettingsActions.getPackageSettingsRequest>) {
  const { page, sorter, searcher } = payload;
  try {
    const { data }: SagaReturnType<typeof getPackageSettings> = yield retry(3, 1000, getPackageSettings, { page, sorter, searcher });
    yield put(
      packageSettingsActions.getPackageSettingsSuccess({
        data: data.hits,
        totalRows: data.pagination.totalRows,
        totalPages: data.pagination.totalPages,
        page,
        searcher,
      }),
    );
  } catch (error) {
    console.log('watchGetPackageSettings.ts', error);
    yield put(packageSettingsActions.getPackageSettingsFailure({}));
  }
}

export function* watchGetPackageSettings() {
  yield takeLatest(packageSettingsActions.getPackageSettingsRequest, handleGetPackageSettings);
}
