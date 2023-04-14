import { put, retry, SagaReturnType, takeLeading } from 'redux-saga/effects';
import { createDayOff } from 'services/Staff/Company/createDayOff';
import { getStaff } from 'services/Staff/Company/getStaff';
import { ServiceException } from 'services/utils/ServiceException';
import { staffsActions } from '../staffsSlice';

function* handleUpdateDayOff({ payload }: ReturnType<typeof staffsActions.updateDayOffRequest>) {
  const { data, onFailure, onSuccess } = payload;

  try {
    yield retry(3, 1000, createDayOff, {
      staffId: data.staffId,
      dayOffs: data.dayOffs,
    });
    const response: SagaReturnType<typeof getStaff> = yield retry(3, 1000, getStaff, { id: data.staffId });
    yield put(
      staffsActions.updateDayOffSuccess({
        data: response.data,
      }),
    );
    onSuccess();
  } catch (error) {
    console.log('watchUpdateDayOff.ts', error);
    yield put(staffsActions.updateDayOffFailure({}));
    onFailure(ServiceException.getMessageError(error));
  }
}

export function* watchUpdateDayOff() {
  yield takeLeading(staffsActions.updateDayOffRequest, handleUpdateDayOff);
}
