import { put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { getOffices } from 'services/OfficesManager/Company/getOffices';
import { officesManagerActions } from '../officesManagerSlice';

function* handleGetOffices({ payload }: ReturnType<typeof officesManagerActions.getOfficesRequest>) {
  const { page, sorter, searcher } = payload;
  try {
    const { data }: SagaReturnType<typeof getOffices> = yield retry(3, 1000, getOffices, { page, sorter, searcher });
    yield put(
      officesManagerActions.getOfficesSuccess({
        data: data.hits,
        totalRows: data.pagination.totalRows,
        totalPages: data.pagination.totalPages,
        page,
        searcher,
      }),
    );
  } catch (error) {
    console.log('watchGetOffices.ts', error);
    yield put(officesManagerActions.getOfficesFailure({}));
  }
}

export function* watchGetOffices() {
  yield takeLatest(officesManagerActions.getOfficesRequest, handleGetOffices);
}
