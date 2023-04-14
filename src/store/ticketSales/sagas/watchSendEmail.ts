import { put, retry, SagaReturnType, takeLeading } from 'redux-saga/effects';
import { sendEmail } from 'services/TicketSale/sendEmail';
import { ServiceException } from 'services/utils/ServiceException';
import { ticketSalesActions } from '../ticketSalesSlice';

function* handleSendEmail({ payload }: ReturnType<typeof ticketSalesActions.sendEmailRequest>) {
  const { orderCode, onFailure, onSuccess } = payload;
  try {
    const { data }: SagaReturnType<typeof sendEmail> = yield retry(3, 1000, sendEmail, { orderCode });
    yield put(ticketSalesActions.sendEmailSuccess({ data }));
    onSuccess();
  } catch (error) {
    console.log('watchSendEmail.ts', error);
    yield put(ticketSalesActions.sendEmailFailure({}));
    onFailure(ServiceException.getMessageError(error));
  }
}

export function* watchSendEmail() {
  yield takeLeading(ticketSalesActions.sendEmailRequest, handleSendEmail);
}
