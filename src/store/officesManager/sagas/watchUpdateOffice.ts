import { put, retry, takeLeading } from 'redux-saga/effects';
import { updateOffice } from 'services/OfficesManager/Company/updateOffice';
import { ServiceException } from 'services/utils/ServiceException';
import { officesManagerActions } from '../officesManagerSlice';

function* handleUpdateOffice({ payload }: ReturnType<typeof officesManagerActions.updateOfficeRequest>) {
  const { id, data, targetOffice, onFailure, onSuccess } = payload;
  try {
    yield retry(3, 1000, updateOffice, { data, id });
    yield put(
      officesManagerActions.updateOfficeSuccess({
        data: {
          ...targetOffice,
          title: data.title,
          address: data.address,
          zipCode: data.zipCode,
          country: data.country,
          city: data.city,
          phone: data.phone,
          email: data.email,
        },
      }),
    );
    onSuccess();
  } catch (error) {
    console.log('watchUpdateOffice.ts', error);
    yield put(officesManagerActions.updateOfficeFailure({ id }));
    onFailure(ServiceException.getMessageError(error));
  }
}

export function* watchUpdateOffice() {
  yield takeLeading(officesManagerActions.updateOfficeRequest, handleUpdateOffice);
}
