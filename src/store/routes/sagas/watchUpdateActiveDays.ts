import { put, retry, SagaReturnType, takeLeading } from 'redux-saga/effects';
import { updateActiveDays } from 'services/Route/Company/updateActiveDays';
import { routesActions } from '../routesSlice';

function* handleUpdateActiveDays({ payload }: ReturnType<typeof routesActions.updateActiveDaysRequest>) {
  const { data, onFailure, onSuccess } = payload;
  try {
    const response: SagaReturnType<typeof updateActiveDays> = yield retry(3, 1000, updateActiveDays, data);
    yield put(routesActions.updateActiveDaysSuccess({ data: response.data }));
    onSuccess();
  } catch (error) {
    console.log('watchUpdateActiveDays.ts', error);
    yield put(routesActions.updateActiveDaysFailure({}));
    onFailure();
  }
}

export function* watchUpdateActiveDays() {
  yield takeLeading(routesActions.updateActiveDaysRequest, handleUpdateActiveDays);
}
