import { put, retry, takeLeading } from 'redux-saga/effects';
import { deleteRoute } from 'services/Route/Company/deleteRoute';
import { ServiceException } from 'services/utils/ServiceException';
import { routesActions } from '../routesSlice';

function* handleDeleteRoute({ payload }: ReturnType<typeof routesActions.deleteRouteRequest>) {
  const { id, onFailure, onSuccess } = payload;
  try {
    yield retry(3, 1000, deleteRoute, payload);
    yield put(routesActions.deleteRouteSuccess({ id }));
    onSuccess();
  } catch (error) {
    console.log('watchDeleteRoute.ts', error);
    yield put(routesActions.deleteRouteFailure({ id }));
    onFailure(ServiceException.getMessageError(error));
  }
}

export function* watchDeleteRoute() {
  yield takeLeading(routesActions.deleteRouteRequest, handleDeleteRoute);
}
