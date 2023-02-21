import { put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { getStaffs } from 'services/Staff/Company/getStaffs';
import { staffsActions } from '../staffsSlice';

function* handleGetStaffs({ payload }: ReturnType<typeof staffsActions.getStaffsRequest>) {
  const { page, sorter, searcher } = payload;
  try {
    const { data }: SagaReturnType<typeof getStaffs> = yield retry(3, 1000, getStaffs, { page, sorter, searcher });
    yield put(
      staffsActions.getStaffsSuccess({
        data: data.hits,
        totalRows: data.pagination.totalRows,
        totalPages: data.pagination.totalPages,
        page,
        searcher,
      }),
    );
  } catch (error) {
    console.log('watchGetStaffs.ts', error);
    yield put(staffsActions.getStaffsFailure({}));
  }
}

export function* watchGetStaffs() {
  yield takeLatest(staffsActions.getStaffsRequest, handleGetStaffs);
}
