import { call, put, retry, SagaReturnType, takeLeading } from 'redux-saga/effects';
import { updateGeneralInfomationTrip } from 'services/Route/Company/updateGeneralInfomationTrip';
import { getRoute } from 'services/Route/Company/getRoute';
import { ServiceException } from 'services/utils/ServiceException';
import { routesActions } from '../routesSlice';
import { updateGeneralInfomationTripWhenHasRoutePointDeleted } from 'services/Route/Company/updateGeneralInfomationTripWhenHasRoutePointDeleted';

function* handleUpdateTrip({ payload }: ReturnType<typeof routesActions.updateTripRequest>) {
  const { data, isHasDeleteStopPointAction, isHasNewStopPointAction, routeCode, onFailure, onSuccess } = payload;
  try {
    if (isHasDeleteStopPointAction || isHasNewStopPointAction) {
      yield call(updateGeneralInfomationTripWhenHasRoutePointDeleted, {
        data,
        routeCode,
      });
    } else {
      yield call(updateGeneralInfomationTrip, {
        data,
        routeCode,
      });
    }
    const detailResponse: SagaReturnType<typeof getRoute> = yield retry(3, 1000, getRoute, {
      routeCode,
    });
    yield put(routesActions.updateTripSuccess({ data: detailResponse.data }));
    onSuccess();
  } catch (error) {
    console.log('watchUpdateTrip.ts', error);
    yield put(routesActions.updateTripFailure({}));
    onFailure(ServiceException.getMessageError(error));
  }
}

export function* watchUpdateTrip() {
  yield takeLeading(routesActions.updateTripRequest, handleUpdateTrip);
}
