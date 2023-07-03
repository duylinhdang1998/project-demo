import { all, call, put, retry, SagaReturnType, takeLeading } from 'redux-saga/effects';
import { createDayExceptions } from 'services/Staff/Company/createDayExceptions';
import { createDayOff } from 'services/Staff/Company/createDayOff';
import { getStaff } from 'services/Staff/Company/getStaff';
import { ServiceException } from 'services/utils/ServiceException';
import { staffsActions } from '../staffsSlice';

function* handleUpdateDayOffNDayExceptions({ payload }: ReturnType<typeof staffsActions.updateDayOffNDayExceptionsRequest>) {
  const { data, onFailure, onSuccess } = payload;

  try {
    yield all([
      retry(3, 1000, createDayOff, {
        staffId: data.staffId,
        dayOffs: data.dayOffs,
      }),
      retry(3, 1000, createDayExceptions, {
        staffId: data.staffId,
        dayExceptions: data.dayExceptions,
      }),
    ]);
    const response: SagaReturnType<typeof getStaff> = yield call(getStaff, { id: data.staffId });
    yield put(
      staffsActions.updateDayOffNDayExceptionsSuccess({
        data: response.data,
      }),
    );
    onSuccess();
  } catch (error) {
    console.log('watchUpdateDayOff.ts', error);
    yield put(staffsActions.updateDayOffNDayExceptionsFailure({}));
    onFailure(ServiceException.getMessageError(error));
  }
}

export function* watchUpdateDayOffNDayExceptions() {
  yield takeLeading(staffsActions.updateDayOffNDayExceptionsRequest, handleUpdateDayOffNDayExceptions);
}
