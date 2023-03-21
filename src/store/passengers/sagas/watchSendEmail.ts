import { put, retry, takeLeading } from 'redux-saga/effects';
import { sendEmail } from 'services/Passenger/sendEmail';
import { passengersActions } from '../passengersSlice';

function* handleSendEmail({ payload }: ReturnType<typeof passengersActions.sendEmailRequest>) {
  const { data, onFailure, onSuccess } = payload;
  try {
    yield retry(3, 1000, sendEmail, data);
    yield put(passengersActions.sendEmailSuccess({}));
    onSuccess();
  } catch (error) {
    console.log('watchSendEmail.ts', error);
    yield put(passengersActions.sendEmailFailure({}));
    onFailure();
  }
}

export function* watchSendEmail() {
  yield takeLeading(passengersActions.sendEmailRequest, handleSendEmail);
}
