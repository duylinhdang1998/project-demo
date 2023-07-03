import { call, put, retry, SagaReturnType, takeLeading } from 'redux-saga/effects';
import { createOneStopTrip } from 'services/Route/Company/createOneStopTrip';
import { getRoute } from 'services/Route/Company/getRoute';
import { ServiceException } from 'services/utils/ServiceException';
import { routesActions } from '../routesSlice';

function* handleCreateOneStopTrip({ payload }: ReturnType<typeof routesActions.createOneStopTripRequest>) {
  const { data, onFailure, onSuccess } = payload;
  try {
    const response: SagaReturnType<typeof createOneStopTrip> = yield call(createOneStopTrip, data);
    const detailResponse: SagaReturnType<typeof getRoute> = yield retry(3, 1000, getRoute, {
      routeCode: response.data.routeCode,
    });
    yield put(routesActions.createOneStopTripSuccess({ data: detailResponse.data }));
    onSuccess();
  } catch (error) {
    console.log('watchCreateOneStopTrip.ts', error);
    yield put(routesActions.createOneStopTripFailure({}));
    onFailure(ServiceException.getMessageError(error));
  }
}

export function* watchCreateOneStopTrip() {
  yield takeLeading(routesActions.createOneStopTripRequest, handleCreateOneStopTrip);
}
