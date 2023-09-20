import { put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { reportsActions } from '../reportSlice';
import { getReportTicketSales } from 'services/Report/getReportTicketSales';

function* handleGetTicketSales({ payload }: ReturnType<typeof reportsActions.getTicketSalesRequest>) {
  const { page, sorter, searcher } = payload;
  try {
    const { data }: SagaReturnType<typeof getReportTicketSales> = yield retry(3, 1000, getReportTicketSales, { page, sorter, searcher });

    yield put(
      reportsActions.getTicketSalesSuccess({
        data: data.hits,
        totalRows: data.pagination.totalRows,
        totalPages: data.pagination.totalPages,
        page,
        searcher,
      }),
    );
  } catch (error) {
    console.log('watchGetTicketSales.ts', error);
    yield put(reportsActions.getTicketSalesFailure({}));
  }
}

export function* watchGetTicketSales() {
  yield takeLatest(reportsActions.getTicketSalesRequest, handleGetTicketSales);
}
