import { put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { getVehicleEvents } from 'services/Vehicle/Company/getVehicleEvents';
import { vehicleEventsActions } from 'store/vehicles/vehicleEventsSlice';

function* handleGetVehicleEvents({ payload }: ReturnType<typeof vehicleEventsActions.getVehicleEventsRequest>) {
  const { page, sorter, searcher } = payload;
  try {
    const { data }: SagaReturnType<typeof getVehicleEvents> = yield retry(3, 1000, getVehicleEvents, { page, sorter, searcher });
    yield put(
      vehicleEventsActions.getVehicleEventsSuccess({
        data: data.hits,
        totalRows: data.pagination.totalRows,
        totalPages: data.pagination.totalPages,
        page,
        searcher,
      }),
    );
  } catch (error) {
    console.log('watchGetVehicleEvents.ts', error);
    yield put(vehicleEventsActions.getVehicleEventsFailure({}));
  }
}

export function* watchGetVehicleEvents() {
  yield takeLatest(vehicleEventsActions.getVehicleEventsRequest, handleGetVehicleEvents);
}
