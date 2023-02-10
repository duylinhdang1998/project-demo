import { put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { getVehicles } from 'services/Vehicle/Company/getVehicles';
import { vehiclesActions } from 'store/vehicles/vehiclesSlice';

function* handleGetVehicles({ payload }: ReturnType<typeof vehiclesActions.getVehiclesRequest>) {
  const { page, sorter, searcher } = payload;
  try {
    const { data }: SagaReturnType<typeof getVehicles> = yield retry(3, 1000, getVehicles, { page, sorter, searcher });
    yield put(
      vehiclesActions.getVehiclesSuccess({
        data: data.hits,
        totalRows: data.pagination.totalRows,
        totalPages: data.pagination.totalPages,
        page,
        searcher,
      }),
    );
  } catch (error) {
    console.log('watchGetVehicles.ts', error);
    yield put(vehiclesActions.getVehiclesFailure({}));
  }
}

export function* watchGetVehicles() {
  yield takeLatest(vehiclesActions.getVehiclesRequest, handleGetVehicles);
}
