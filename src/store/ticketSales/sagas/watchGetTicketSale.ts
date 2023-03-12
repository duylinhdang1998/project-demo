import { put, retry, SagaReturnType, takeLeading } from 'redux-saga/effects';
import { getTicketSale } from 'services/TicketSale/getTicketSale';
import { ticketSalesActions } from '../ticketSalesSlice';

function* handleGetTicketSale({ payload }: ReturnType<typeof ticketSalesActions.getTicketSaleRequest>) {
  const { orderCode } = payload;
  try {
    const { data }: SagaReturnType<typeof getTicketSale> = yield retry(3, 1000, getTicketSale, { orderCode });
    yield put(ticketSalesActions.getTicketSaleSuccess({ data }));
  } catch (error) {
    console.log('watchGetTicketSale.ts', error);
    yield put(ticketSalesActions.getTicketSaleFailure({}));
  }
}

export function* watchGetTicketSale() {
  yield takeLeading(ticketSalesActions.getTicketSaleRequest, handleGetTicketSale);
}
