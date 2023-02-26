import { put, retry, SagaReturnType, takeLeading } from 'redux-saga/effects';
import { getPassenger } from 'services/Passenger/getPassenger';
import { updateStatusPassenger } from 'services/Passenger/updateStatusPassenger';
import { passengersActions } from '../passengersSlice';

function* handleUpdateStatusPassenger({ payload }: ReturnType<typeof passengersActions.updateStatusPassengerRequest>) {
  const { id, data, onFailure, onSuccess } = payload;
  try {
    yield retry(3, 1000, updateStatusPassenger, { data, id });
    const response: SagaReturnType<typeof getPassenger> = yield retry(3, 1000, getPassenger, { id });
    yield put(
      passengersActions.updatePassengerSuccess({
        data: response.data,
      }),
    );
    onSuccess();
  } catch (error) {
    console.log('watchUpdatePassenger.ts', error);
    yield put(passengersActions.updatePassengerFailure({ id }));
    onFailure();
  }
}

export function* watchUpdateStatusPassenger() {
  yield takeLeading(passengersActions.updateStatusPassengerRequest, handleUpdateStatusPassenger);
}
