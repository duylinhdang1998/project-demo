import { put, retry, SagaReturnType, takeLeading } from 'redux-saga/effects';
import { getRoute } from 'services/Route/Company/getRoute';
import { routesActions } from '../routesSlice';

function* handleGetRoute({ payload }: ReturnType<typeof routesActions.getRouteRequest>) {
  const { id } = payload;
  try {
    const { data }: SagaReturnType<typeof getRoute> = yield retry(3, 1000, getRoute, { id });
    yield put(routesActions.getRouteSuccess({ data }));
  } catch (error) {
    console.log('watchGetRoute.ts', error);
    yield put(routesActions.getRouteFailure({}));
  }
}

export function* watchGetRoute() {
  yield takeLeading(routesActions.getRouteRequest, handleGetRoute);
}
