import { put, retry, SagaReturnType, select, takeLeading } from 'redux-saga/effects';
import { createDayOff } from 'services/Staff/Company/createDayOff';
import { getStaff } from 'services/Staff/Company/getStaff';
import { selectStaffs } from '../selectors';
import { staffsActions } from '../staffsSlice';

function* handleToggleDayActive({ payload }: ReturnType<typeof staffsActions.toggleDayActiveRequest>) {
  const { data, type, onFailure, onSuccess } = payload;
  const { staff }: SagaReturnType<typeof selectStaffs> = yield select(selectStaffs);
  try {
    if (staff) {
      console.log({
        type,
        current: staff.dayOff,
        create: staff.dayOff.concat(data.dayOffs),
        remove: staff.dayOff.filter(item => !data.dayOffs.includes(item)),
      });
      yield retry(3, 1000, createDayOff, {
        staffId: data.staffId,
        dayOffs: type === 'createDayOff' ? staff.dayOff.concat(data.dayOffs) : staff.dayOff.filter(item => !data.dayOffs.includes(item)),
      });
      const response: SagaReturnType<typeof getStaff> = yield retry(3, 1000, getStaff, { id: data.staffId });
      yield put(
        staffsActions.toggleDayActiveSuccess({
          data: response.data,
        }),
      );
      onSuccess();
    } else {
      yield put(staffsActions.toggleDayActiveFailure({}));
      onFailure();
    }
  } catch (error) {
    console.log('watchToggleDayActive.ts', error);
    yield put(staffsActions.toggleDayActiveFailure({}));
    onFailure();
  }
}

export function* watchToggleDayActive() {
  yield takeLeading(staffsActions.toggleDayActiveRequest, handleToggleDayActive);
}
