import { all, call, put, takeLeading } from 'redux-saga/effects';
import { updatePaymentStatusOfOrder } from 'services/TicketSale/updatePaymentStatusOfOrder';
import { ServiceException } from 'services/utils/ServiceException';
import { ticketSalesActions } from '../ticketSalesSlice';

function* handleUpdatePaymentStatusOfOrder({ payload }: ReturnType<typeof ticketSalesActions.updatePaymentStatusOfOrderRequest>) {
  const { data, orderCode, onFailure, onSuccess } = payload;
  try {
    if (data.type === 'ONE_TRIP') {
      yield call(updatePaymentStatusOfOrder, {
        ...data.data,
        paymentStatus: data.data.paymentStatus,
        ticketCode: data.data.ticketCode,
      });
    } else {
      yield all([
        call(updatePaymentStatusOfOrder, {
          ...data.data.departureTicket,
          paymentStatus: data.data.departureTicket.paymentStatus,
          ticketCode: data.data.departureTicket.ticketCode,
        }),
        call(updatePaymentStatusOfOrder, {
          ...data.data.returnTicket,
          paymentStatus: data.data.returnTicket.paymentStatus,
          ticketCode: data.data.returnTicket.ticketCode,
        }),
      ]);
    }
    yield put(ticketSalesActions.updatePaymentStatusOfOrderSuccess({}));
    onSuccess?.(orderCode);
  } catch (error) {
    console.log('watchUpdatePaymentStatusOfOrder.ts', error);
    yield put(ticketSalesActions.updatePaymentStatusOfOrderFailure({}));
    onFailure(ServiceException.getMessageError(error));
  }
}

export function* watchUpdatePaymentStatusOfOrder() {
  yield takeLeading(ticketSalesActions.updatePaymentStatusOfOrderRequest, handleUpdatePaymentStatusOfOrder);
}
