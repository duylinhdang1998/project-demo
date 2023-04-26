import { put, retry, SagaReturnType, takeLeading } from 'redux-saga/effects';
import { createTicketSaleOneWay } from 'services/TicketSale/createTicketSaleOneWay';
import { ServiceException } from 'services/utils/ServiceException';
import { ticketSalesActions } from '../ticketSalesSlice';

function* handleCreateTicketSaleOneWay({ payload }: ReturnType<typeof ticketSalesActions.createTicketSaleOneWayRequest>) {
  const { data: formData, onFailure, onSuccess } = payload;
  try {
    const { data }: SagaReturnType<typeof createTicketSaleOneWay> = yield retry(3, 1000, createTicketSaleOneWay, formData);
    yield put(ticketSalesActions.createTicketSaleOneWaySuccess({ data }));
    onSuccess(data.ticketCode);
  } catch (error) {
    console.log('watchCreateTicketSaleOneWay.ts', error);
    yield put(ticketSalesActions.createTicketSaleOneWayFailure({}));
    onFailure(ServiceException.getMessageError(error));
  }
}

export function* watchCreateTicketSaleOneWay() {
  yield takeLeading(ticketSalesActions.createTicketSaleOneWayRequest, handleCreateTicketSaleOneWay);
}
