import { call, put, takeLeading } from 'redux-saga/effects';
import { updateOrderStatus } from 'services/TicketSale/updateOrderStatus';
import { ServiceException } from 'services/utils/ServiceException';
import { ticketSalesActions } from '../ticketSalesSlice';

function* handleOrderStatus({ payload }: ReturnType<typeof ticketSalesActions.updateOrderStatusRequest>) {
  const { orderCode, ticketStatus, reason, targetTicket, onFailure, onSuccess } = payload;
  try {
    yield call(updateOrderStatus, { orderCode, ticketStatus, reason });
    yield put(
      ticketSalesActions.updateOrderStatusSuccess({
        data: {
          ...targetTicket,
          ticketStatus,
        },
      }),
    );
    onSuccess();
  } catch (error) {
    console.log('watchTicketStatus.ts', error);
    yield put(ticketSalesActions.updateOrderStatusFailure({ id: targetTicket._id }));
    onFailure(ServiceException.getMessageError(error));
  }
}

export function* watchOrderStatus() {
  yield takeLeading(ticketSalesActions.updateOrderStatusRequest, handleOrderStatus);
}
