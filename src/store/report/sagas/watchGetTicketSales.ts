import { all, put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { reportsActions } from '../reportSlice';
import { getReportTicketSales } from 'services/Report/getReportTicketSales';
import { getStatisticTicketSales } from 'services/Report/getStatisticTicketSales';

function* handleGetTicketSales({ payload }: ReturnType<typeof reportsActions.getTicketSalesRequest>) {
  const { page, sorter, searcher } = payload;
  try {
    const [{ data }, statisticTicketSales]: [SagaReturnType<typeof getReportTicketSales>, SagaReturnType<typeof getStatisticTicketSales>] = yield all(
      [retry(3, 1000, getReportTicketSales, { page, sorter, searcher }), retry(3, 1000, getStatisticTicketSales)],
    );
    yield put(
      reportsActions.getTicketSalesSuccess({
        data: data.hits,
        totalRows: data.pagination.totalRows,
        totalPages: data.pagination.totalPages,
        page,
        searcher,
        totalSales: statisticTicketSales.data.totalSales,
        totalTickets: statisticTicketSales.data.totalTickets,
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
