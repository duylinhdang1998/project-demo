import { put, retry, takeLeading } from 'redux-saga/effects';
import { updateStatusPassenger } from 'services/Passenger/updateStatusPassenger';
import { ServiceException } from 'services/utils/ServiceException';
import { passengersActions } from '../passengersSlice';

function* handleUpdateStatusPassenger({ payload }: ReturnType<typeof passengersActions.updateStatusPassengerRequest>) {
  const { id, data, passenger, onFailure, onSuccess } = payload;
  try {
    yield retry(3, 1000, updateStatusPassenger, { data, id });
    yield put(
      passengersActions.updatePassengerSuccess({
        data: {
          ...passenger,
          status: data.status,
        },
      }),
    );
    onSuccess();
  } catch (error) {
    console.log('watchUpdatePassenger.ts', error);
    yield put(passengersActions.updatePassengerFailure({ id }));
    onFailure(ServiceException.getMessageError(error));
  }
}

export function* watchUpdateStatusPassenger() {
  yield takeLeading(passengersActions.updateStatusPassengerRequest, handleUpdateStatusPassenger);
}
