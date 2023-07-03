import { call, put, takeLeading } from 'redux-saga/effects';
import { sendEmail } from 'services/Passenger/sendEmail';
import { ServiceException } from 'services/utils/ServiceException';
import { passengersActions } from '../passengersSlice';

function* handleSendEmail({ payload }: ReturnType<typeof passengersActions.sendEmailRequest>) {
  const { data, onFailure, onSuccess } = payload;
  try {
    yield call(sendEmail, data);
    yield put(passengersActions.sendEmailSuccess({}));
    onSuccess();
  } catch (error) {
    console.log('watchSendEmail.ts', error);
    yield put(passengersActions.sendEmailFailure({}));
    onFailure(ServiceException.getMessageError(error));
  }
}

export function* watchSendEmail() {
  yield takeLeading(passengersActions.sendEmailRequest, handleSendEmail);
}
