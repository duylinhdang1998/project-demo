import { put, retry, SagaReturnType, takeLeading } from 'redux-saga/effects';
import { createTicketSaleOneTrip } from 'services/TicketSale/createTicketSaleOneTrip';
import { createTicketSaleRoundTrip } from 'services/TicketSale/createTicketSaleRoundTrip';
import { ServiceException } from 'services/utils/ServiceException';
import { ticketSalesActions } from '../ticketSalesSlice';

function* handleCreateTicketSalesOfOrder({ payload }: ReturnType<typeof ticketSalesActions.createOrderRequest>) {
  const { onFailure, onSuccess } = payload;
  try {
    if (payload.type === 'ONE_TRIP') {
      const { data }: SagaReturnType<typeof createTicketSaleOneTrip> = yield retry(3, 1000, createTicketSaleOneTrip, {
        ...payload.data,
      });
      yield put(ticketSalesActions.createOrderSuccess({ data }));
      onSuccess(data.orderCode);
    }
    if (payload.type === 'ROUND_TRIP') {
      const { data }: SagaReturnType<typeof createTicketSaleRoundTrip> = yield retry(3, 1000, createTicketSaleRoundTrip, {
        ...payload.data,
      });
      yield put(ticketSalesActions.createOrderSuccess({ data }));
      const orderCode = data?.[0]?.orderCode;
      if (orderCode) {
        onSuccess(orderCode);
      }
    }
  } catch (error) {
    console.log('watchCreateTicketSalesOfOrder.ts', error);
    yield put(ticketSalesActions.createOrderFailure({}));
    onFailure(ServiceException.getMessageError(error));
  }
}

export function* watchCreateTicketSalesOfOrder() {
  yield takeLeading(ticketSalesActions.createOrderRequest, handleCreateTicketSalesOfOrder);
}
