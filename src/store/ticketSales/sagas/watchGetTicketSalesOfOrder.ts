import { put, retry, SagaReturnType, takeLeading } from 'redux-saga/effects';
import { getTicketSalesOfOrder } from 'services/TicketSale/getTicketSalesOfOrder';
import { ticketSalesActions } from '../ticketSalesSlice';

function* handleGetTicketSalesOfOrder({ payload }: ReturnType<typeof ticketSalesActions.getTicketSaleWithOrderCodeRequest>) {
  const { orderCode } = payload;
  try {
    const { data }: SagaReturnType<typeof getTicketSalesOfOrder> = yield retry(3, 1000, getTicketSalesOfOrder, { orderCode });
    const ticketSaleOneTrip = data.find(item => item.ticketType === 'ONE_TRIP');
    const departureTicketSaleRoundTrip = data.find(item => item.ticketType === 'ROUND_TRIP' && item.ticketDirection === 'DEPARTURE');
    const returnTicketSaleRoundTrip = data.find(item => item.ticketType === 'ROUND_TRIP' && item.ticketDirection === 'RETURN');
    if (ticketSaleOneTrip) {
      yield put(
        ticketSalesActions.getTicketSaleWithOrderCodeSuccess({
          data: {
            type: 'ONE_TRIP',
            data: ticketSaleOneTrip,
          },
        }),
      );
    } else if (departureTicketSaleRoundTrip && returnTicketSaleRoundTrip) {
      yield put(
        ticketSalesActions.getTicketSaleWithOrderCodeSuccess({
          data: {
            type: 'ROUND_TRIP',
            data: {
              departureTrip: departureTicketSaleRoundTrip,
              returnTrip: returnTicketSaleRoundTrip,
            },
          },
        }),
      );
    } else {
      yield put(ticketSalesActions.getTicketSaleWithOrderCodeFailure({}));
    }
  } catch (error) {
    console.log('watchGetTicketSaleWithOrderCode.ts', error);
    yield put(ticketSalesActions.getTicketSaleWithOrderCodeFailure({}));
  }
}

export function* watchGetTicketSalesOfOrder() {
  yield takeLeading(ticketSalesActions.getTicketSaleWithOrderCodeRequest, handleGetTicketSalesOfOrder);
}
