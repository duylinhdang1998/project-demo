import { put, retry, SagaReturnType, select, takeLeading } from 'redux-saga/effects';
import { staffsActions } from '../staffsSlice';
import { selectStaffs } from '../selectors';
import { createDayOff } from 'services/Staff/Company/createDayOff';

function* handleRemoveDayActive({ payload }: ReturnType<typeof staffsActions.removeDayActiveRequest>) {
  const { data, onFailure, onSuccess } = payload;
  const { staff }: SagaReturnType<typeof selectStaffs> = yield select(selectStaffs);
  try {
    if (staff) {
      yield retry(3, 1000, createDayOff, data);
      yield put(
        staffsActions.removeDayActiveSuccess({
          data: {
            ...staff,
            // FIXME: Update trường "dayoff"
          },
        }),
      );
      onSuccess();
    } else {
      yield put(staffsActions.removeDayActiveFailure({}));
      onFailure();
    }
  } catch (error) {
    console.log('watchRemoveDayActive.ts', error);
    yield put(staffsActions.removeDayActiveFailure({}));
    onFailure();
  }
}

export function* watchRemoveDayActive() {
  yield takeLeading(staffsActions.removeDayActiveRequest, handleRemoveDayActive);
}
