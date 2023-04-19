import { put, retry, takeLeading } from 'redux-saga/effects';
import { updateTicketStatus } from 'services/TicketSale/updateTicketStatus';
import { ServiceException } from 'services/utils/ServiceException';
import { ticketSalesActions } from '../ticketSalesSlice';

function* handleTicketStatus({ payload }: ReturnType<typeof ticketSalesActions.updateTicketStatusRequest>) {
  const { orderCode, ticketStatus, targetTicket, onFailure, onSuccess } = payload;
  try {
    yield retry(3, 1000, updateTicketStatus, { orderCode, ticketStatus });
    yield put(
      ticketSalesActions.updateTicketStatusSuccess({
        data: {
          ...targetTicket,
          ticketStatus,
        },
      }),
    );
    onSuccess();
  } catch (error) {
    console.log('watchTicketStatus.ts', error);
    yield put(ticketSalesActions.updateTicketStatusFailure({ id: targetTicket._id }));
    onFailure(ServiceException.getMessageError(error));
  }
}

export function* watchTicketStatus() {
  yield takeLeading(ticketSalesActions.updateTicketStatusRequest, handleTicketStatus);
}
