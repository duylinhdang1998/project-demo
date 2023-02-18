import { put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { getVehicleEvents } from 'services/Vehicle/Company/getVehicleEvents';
import { vehicleEventsActions } from 'store/vehicles/vehicleEventsSlice';

function* handleGetVehicleEvents({ payload }: ReturnType<typeof vehicleEventsActions.getVehicleEventsRequest>) {
  const { page, sorter, searcher, vehicleId } = payload;
  try {
    const getVehicleEventsResponse: SagaReturnType<typeof getVehicleEvents> = yield retry(3, 1000, getVehicleEvents, {
      page,
      sorter,
      searcher,
      vehicleId,
    });

    yield put(
      vehicleEventsActions.getVehicleEventsSuccess({
        vehicleEvents: getVehicleEventsResponse.data.hits,
        totalRows: getVehicleEventsResponse.data.pagination.totalRows,
        totalPages: getVehicleEventsResponse.data.pagination.totalPages,
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
