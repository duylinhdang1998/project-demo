import { call, put, SagaReturnType, takeLeading } from 'redux-saga/effects';
import { getStaff } from 'services/Staff/Company/getStaff';
import { updateStaffInfo } from 'services/Staff/Company/updateStaff';
import { ServiceException } from 'services/utils/ServiceException';
import { staffsActions } from '../staffsSlice';

function* handleUpdateStaffInfo({ payload }: ReturnType<typeof staffsActions.updateStaffInfoRequest>) {
  const { data, staffId, onFailure, onSuccess } = payload;
  try {
    yield call(updateStaffInfo, {
      data,
      staffId,
    });
    const response: SagaReturnType<typeof getStaff> = yield call(getStaff, { id: staffId });
    yield put(
      staffsActions.updateStaffInfoSuccess({
        data: response.data,
      }),
    );
    onSuccess();
  } catch (error) {
    console.log('watchUpdateStaffInfo.ts', error);
    yield put(staffsActions.updateStaffInfoFailure({}));
    onFailure(ServiceException.getMessageError(error));
  }
}

export function* watchUpdateStaffInfo() {
  yield takeLeading(staffsActions.updateStaffInfoRequest, handleUpdateStaffInfo);
}
