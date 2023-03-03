import { put, retry, SagaReturnType, takeLeading } from 'redux-saga/effects';
import { getPassenger } from 'services/Passenger/getPassenger';
import { passengersActions } from '../passengersSlice';

function* handleGetPassenger({ payload }: ReturnType<typeof passengersActions.getPassengerRequest>) {
  const { id } = payload;
  try {
    const { data }: SagaReturnType<typeof getPassenger> = yield retry(3, 1000, getPassenger, { id });
    yield put(passengersActions.getPassengerSuccess({ data }));
  } catch (error) {
    console.log('watchGetPassenger.ts', error);
    yield put(passengersActions.getPassengerFailure({}));
  }
}

export function* watchGetPassenger() {
  yield takeLeading(passengersActions.getPassengerRequest, handleGetPassenger);
}
