import { call, put, takeLeading } from 'redux-saga/effects';
import { deleteRoute } from 'services/Route/Company/deleteRoute';
import { ServiceException } from 'services/utils/ServiceException';
import { routesActions } from '../routesSlice';

function* handleDeleteRoute({ payload }: ReturnType<typeof routesActions.deleteRouteRequest>) {
  const { routeCode, onFailure, onSuccess } = payload;
  try {
    yield call(deleteRoute, payload);
    yield put(routesActions.deleteRouteSuccess({ routeCode }));
    onSuccess();
  } catch (error) {
    console.log('watchDeleteRoute.ts', error);
    yield put(routesActions.deleteRouteFailure({ routeCode }));
    onFailure(ServiceException.getMessageError(error));
  }
}

export function* watchDeleteRoute() {
  yield takeLeading(routesActions.deleteRouteRequest, handleDeleteRoute);
}
