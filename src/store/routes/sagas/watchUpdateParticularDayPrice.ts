import { put, retry, SagaReturnType, takeLeading } from 'redux-saga/effects';
import { getRoute } from 'services/Route/Company/getRoute';
import { updateParticular } from 'services/Route/Company/updateParticular';
import { ServiceException } from 'services/utils/ServiceException';
import { routesActions } from '../routesSlice';

function* handleUpdateParticularDayPrice({ payload }: ReturnType<typeof routesActions.updateParticularDayPriceRequest>) {
  const { data, routeCode, onFailure, onSuccess } = payload;
  try {
    yield retry(3, 1000, updateParticular, data);
    const response: SagaReturnType<typeof getRoute> = yield retry(3, 1000, getRoute, { routeCode });
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
