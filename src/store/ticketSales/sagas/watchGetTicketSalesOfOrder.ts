import { put, retry, SagaReturnType, takeLeading } from 'redux-saga/effects';
import { getTicketSalesOfOrder } from 'services/TicketSale/getTicketSalesOfOrder';
import { ticketSalesActions, TicketSalesState } from '../ticketSalesSlice';
import { ServiceException } from 'services/utils/ServiceException';

function* handleGetTicketSalesOfOrder({ payload }: ReturnType<typeof ticketSalesActions.getTicketSaleWithOrderCodeRequest>) {
  const { orderCode, onTicketNonExist, onFailure } = payload;
  try {
    const { data }: SagaReturnType<typeof getTicketSalesOfOrder> = yield retry(3, 1000, getTicketSalesOfOrder, { orderCode });
    const ticketSaleOneTrip = data.find(item => item.ticketType === 'ONE_TRIP');
    const departureTicketSaleRoundTrip = data.find(item => item.ticketType === 'ROUND_TRIP' && item.ticketDirection === 'DEPARTURE');
    const returnTicketSaleRoundTrip = data.find(item => item.ticketType === 'ROUND_TRIP' && item.ticketDirection === 'RETURN');
    if (ticketSaleOneTrip) {
      const data: TicketSalesState['ticketSalesOfOrder'] = {
        type: 'ONE_TRIP',
        data: ticketSaleOneTrip,
      };
      yield put(
        ticketSalesActions.getTicketSaleWithOrderCodeSuccess({
          data,
        }),
      );
    } else if (departureTicketSaleRoundTrip && returnTicketSaleRoundTrip) {
      const data: TicketSalesState['ticketSalesOfOrder'] = {
        type: 'ROUND_TRIP',
        data: {
          departureTrip: departureTicketSaleRoundTrip,
          returnTrip: returnTicketSaleRoundTrip,
        },
      };
      yield put(
        ticketSalesActions.getTicketSaleWithOrderCodeSuccess({
          data,
        }),
      );
    } else {
      yield put(ticketSalesActions.getTicketSaleWithOrderCodeFailure({}));
      onTicketNonExist?.();
    }
  } catch (error) {
    console.log('watchGetTicketSaleWithOrderCode.ts', error);
    yield put(ticketSalesActions.getTicketSaleWithOrderCodeFailure({}));
    onFailure?.(ServiceException.getMessageError(error));
  }
}

export function* watchGetTicketSalesOfOrder() {
  yield takeLeading(ticketSalesActions.getTicketSaleWithOrderCodeRequest, handleGetTicketSalesOfOrder);
}
