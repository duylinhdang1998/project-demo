import { put, retry, SagaReturnType, select, takeLeading } from 'redux-saga/effects';
import { updateParticular } from 'services/Route/Company/updateParticular';
import { routesActions } from '../routesSlice';
import { selectRoutes } from '../selectors';

function* handleUpdateTicketPrices({ payload }: ReturnType<typeof routesActions.updateTicketPricesRequest>) {
  const { data, onFailure, onSuccess } = payload;
  const { route }: SagaReturnType<typeof selectRoutes> = yield select(selectRoutes);
  try {
    if (route) {
      yield retry(3, 1000, updateParticular, data);
      yield put(
        routesActions.updateTicketPricesSuccess({
          data: {
            ...route,
            particularDays: route.particularDays.concat(data.particularDay),
          },
        }),
      );
      onSuccess();
    } else {
      yield put(routesActions.updateTicketPricesFailure({}));
      onFailure();
    }
  } catch (error) {
    console.log('watchUpdateTicketPrices.ts', error);
    yield put(routesActions.updateTicketPricesFailure({}));
    onFailure();
  }
}

export function* watchUpdateTicketPrices() {
  yield takeLeading(routesActions.updateTicketPricesRequest, handleUpdateTicketPrices);
}
