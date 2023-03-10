import { put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { getTicketSales } from 'services/TicketSale/getTicketSales';
import { ticketSalesActions } from '../ticketSalesSlice';

function* handleGetTicketSales({ payload }: ReturnType<typeof ticketSalesActions.getTicketSalesRequest>) {
  const { page, sorter, searcher } = payload;
  try {
    const { data }: SagaReturnType<typeof getTicketSales> = yield retry(3, 1000, getTicketSales, { page, sorter, searcher });
    yield put(
      ticketSalesActions.getTicketSalesSuccess({
        data: data.hits,
        totalRows: data.pagination.totalRows,
        totalPages: data.pagination.totalPages,
        page,
        searcher,
      }),
    );
  } catch (error) {
    console.log('watchGetTicketSales.ts', error);
    yield put(ticketSalesActions.getTicketSalesFailure({}));
  }
}

export function* watchGetTicketSales() {
  yield takeLatest(ticketSalesActions.getTicketSalesRequest, handleGetTicketSales);
}
