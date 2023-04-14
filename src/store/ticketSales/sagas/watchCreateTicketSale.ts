import { put, retry, SagaReturnType, takeLeading } from 'redux-saga/effects';
import { createTicketSale } from 'services/TicketSale/createTicketSale';
import { ServiceException } from 'services/utils/ServiceException';
import { ticketSalesActions } from '../ticketSalesSlice';

function* handleCreateTicketSale({ payload }: ReturnType<typeof ticketSalesActions.createTicketSaleRequest>) {
  const { data: formData, onFailure, onSuccess } = payload;
  try {
    const { data }: SagaReturnType<typeof createTicketSale> = yield retry(3, 1000, createTicketSale, formData);
    yield put(ticketSalesActions.createTicketSaleSuccess({ data: data.order[0] }));
    onSuccess(data.order[0].orderCode);
  } catch (error) {
    console.log('watchCreateTicketSale.ts', error);
    yield put(ticketSalesActions.createTicketSaleFailure({}));
    onFailure(ServiceException.getMessageError(error));
  }
}

export function* watchCreateTicketSale() {
  yield takeLeading(ticketSalesActions.createTicketSaleRequest, handleCreateTicketSale);
}
