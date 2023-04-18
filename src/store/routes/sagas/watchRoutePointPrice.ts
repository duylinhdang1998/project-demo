import { put, retry, SagaReturnType, takeLeading } from 'redux-saga/effects';
import { getRoute } from 'services/Route/Company/getRoute';
import { updateRoutePointPrice } from 'services/Route/Company/updateRoutePointPrice';
import { ServiceException } from 'services/utils/ServiceException';
import { routesActions } from '../routesSlice';

function* handleUpdateRoutePointPrice({ payload }: ReturnType<typeof routesActions.updateRoutePointPriceRequest>) {
  const { data, routePointId, routeCode, onFailure, onSuccess } = payload;
  try {
    yield retry(3, 1000, updateRoutePointPrice, { data, routePointId });
    const response: SagaReturnType<typeof getRoute> = yield retry(3, 1000, getRoute, { routeCode });
    const newRoute = response.data;
    yield put(routesActions.updateRoutePointPriceSuccess({ data: newRoute, routePointId }));
    onSuccess(newRoute);
  } catch (error) {
    console.log('watchUpdateRoutePointPrice.ts', error);
    yield put(routesActions.updateRoutePointPriceFailure({ routePointId }));
    onFailure(ServiceException.getMessageError(error));
  }
}

export function* watchUpdateRoutePointPrice() {
  yield takeLeading(routesActions.updateRoutePointPriceRequest, handleUpdateRoutePointPrice);
}
