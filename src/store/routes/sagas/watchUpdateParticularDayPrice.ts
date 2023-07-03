import { call, put, retry, SagaReturnType, takeLeading } from 'redux-saga/effects';
import { getRoute } from 'services/Route/Company/getRoute';
import { updateParticular } from 'services/Route/Company/updateParticular';
import { ServiceException } from 'services/utils/ServiceException';
import { routesActions } from '../routesSlice';

function* handleUpdateParticularDayPrice({ payload }: ReturnType<typeof routesActions.updateParticularDayPriceRequest>) {
  const { data, onFailure, onSuccess } = payload;
  try {
    yield call(updateParticular, data);
    const response: SagaReturnType<typeof getRoute> = yield retry(3, 1000, getRoute, { routeCode: data.routeCode });
    yield put(
      routesActions.updateParticularDayPriceSuccess({
        data: response.data,
      }),
    );
    onSuccess();
  } catch (error) {
    console.log('watchUpdateParticularDayPrice.ts', error);
    yield put(routesActions.updateParticularDayPriceFailure({}));
    onFailure(ServiceException.getMessageError(error));
  }
}

export function* watchUpdateParticularDayPrice() {
  yield takeLeading(routesActions.updateParticularDayPriceRequest, handleUpdateParticularDayPrice);
}
