import { put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { getPassengers } from 'services/Passenger/getPassengers';
import { passengersActions } from '../passengersSlice';

function* handleGetPassengers({ payload }: ReturnType<typeof passengersActions.getPassengersRequest>) {
  const { page, sorter, searcher } = payload;
  try {
    const { data }: SagaReturnType<typeof getPassengers> = yield retry(3, 1000, getPassengers, { page, sorter, searcher });
    yield put(
      passengersActions.getPassengersSuccess({
        data: data.hits,
        totalRows: data.pagination.totalRows,
        totalPages: data.pagination.totalPages,
        page,
        searcher,
      }),
    );
  } catch (error) {
    console.log('watchGetPassengers.ts', error);
    yield put(passengersActions.getPassengersFailure({}));
  }
}

export function* watchGetPassengers() {
  yield takeLatest(passengersActions.getPassengersRequest, handleGetPassengers);
}
