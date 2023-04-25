import { put, retry, takeLeading } from 'redux-saga/effects';
import { removeDayActive } from 'services/Route/Company/removeDayActive';
import { ServiceException } from 'services/utils/ServiceException';
import { routesActions } from '../routesSlice';

function* handleRemoveDayActive({ payload }: ReturnType<typeof routesActions.removeDayActiveRequest>) {
  const { targetRoute, data, onFailure, onSuccess } = payload;
  try {
    yield retry(3, 1000, removeDayActive, data);
    yield put(
      routesActions.removeDayActiveSuccess({
        data: {
          ...targetRoute,
          dayoffs: targetRoute.dayoffs.concat(data.dayoff),
        },
      }),
    );
    onSuccess();
  } catch (error) {
    console.log('watchRemoveDayActive.ts', error);
    yield put(routesActions.removeDayActiveFailure({}));
    onFailure(ServiceException.getMessageError(error));
  }
}

export function* watchRemoveDayActive() {
  yield takeLeading(routesActions.removeDayActiveRequest, handleRemoveDayActive);
}
