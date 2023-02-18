import { put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { getRoutes } from 'services/Route/Company/getRoutes';
import { routesActions } from '../routesSlice';

function* handleGetRoutes({ payload }: ReturnType<typeof routesActions.getRoutesRequest>) {
  const { page, sorter, searcher } = payload;
  try {
    const { data }: SagaReturnType<typeof getRoutes> = yield retry(3, 1000, getRoutes, { page, sorter, searcher });
    yield put(
      routesActions.getRoutesSuccess({
        data: data.hits,
        totalRows: data.pagination.totalRows,
        totalPages: data.pagination.totalPages,
        page,
        searcher,
      }),
    );
  } catch (error) {
    console.log('watchGetRoutes.ts', error);
    yield put(routesActions.getRoutesFailure({}));
  }
}

export function* watchGetRoutes() {
  yield takeLatest(routesActions.getRoutesRequest, handleGetRoutes);
}
