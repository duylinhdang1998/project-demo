import { put, retry, SagaReturnType, takeLeading } from 'redux-saga/effects';
import { getPassenger } from 'services/Passenger/getPassenger';
import { updatePassenger } from 'services/Passenger/updatePassenger';
import { ServiceException } from 'services/utils/ServiceException';
import { passengersActions } from '../passengersSlice';

function* handleUpdatePassenger({ payload }: ReturnType<typeof passengersActions.updatePassengerRequest>) {
  const { id, data, onFailure, onSuccess } = payload;
  try {
    yield retry(3, 1000, updatePassenger, { data, id });
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
    onFailure(ServiceException.getMessageError(error));
  }
}

export function* watchUpdatePassenger() {
  yield takeLeading(passengersActions.updatePassengerRequest, handleUpdatePassenger);
}
