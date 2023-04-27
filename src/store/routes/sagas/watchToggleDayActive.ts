import { put, retry, takeLeading } from 'redux-saga/effects';
import { toggleDayActive } from 'services/Route/Company/toggleDayActive';
import { ServiceException } from 'services/utils/ServiceException';
import { isTimestampEqualDayInYear } from 'utils/handleTimestampWithDayInYear';
import { routesActions } from '../routesSlice';

function* handleToggleDayActive({ payload }: ReturnType<typeof routesActions.toggleDayActiveRequest>) {
  const { targetRoute, data, onFailure, onSuccess } = payload;
  try {
    yield retry(3, 1000, toggleDayActive, data);
    yield put(
      routesActions.toggleDayActiveSuccess({
        data: {
          ...targetRoute,
          dayoffs:
            data.type === 'ADD'
              ? targetRoute.dayoffs.concat(data.dayoff)
              : targetRoute.dayoffs.filter(item => !isTimestampEqualDayInYear(item, data.dayoff)),
        },
      }),
    );
    onSuccess();
  } catch (error) {
    console.log('watchToggleDayActive.ts', error);
    yield put(routesActions.toggleDayActiveFailure({}));
    onFailure(ServiceException.getMessageError(error));
  }
}

export function* watchToggleDayActive() {
  yield takeLeading(routesActions.toggleDayActiveRequest, handleToggleDayActive);
}
