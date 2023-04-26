import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Searcher } from 'services/@types/SearchParams';
import { TicketSale } from 'services/models/TicketSale';
import { CreateOrderFailure, CreateOrderRequest, CreateOrderSuccess } from './actions/CreateOrder';
import { GetTicketSalesOfOrderFailure, GetTicketSalesOfOrderRequest, GetTicketSalesOfOrderSuccess } from './actions/GetTicketSalesOfOrder';
import { GetTicketSalesFailure, GetTicketSalesRequest, GetTicketSalesSuccess } from './actions/GetTicketSales';
import { SendEmailFailure, SendEmailRequest, SendEmailSuccess } from './actions/SendEmail';
import { UpdateOrderStatusFailure, UpdateOrderStatusRequest, UpdateOrderStatusSuccess } from './actions/UpdateOrderStatus';

export interface TicketSalesState {
  statusSendEmail: Status;
  statusGetTicketSales: Status;
  statusGetTicketSalesOfOrder: Status;
  statusCreateTicketSale: Status;
  queueUpdateOrderStatus: TicketSale['_id'][];
  ticketSales: TicketSale[];
  currentPage: number;
  totalPages: number;
  totalRows: number;
  currentSearcher: Searcher<TicketSale>;
  ticketSalesOfOrder:
    | { type: 'ONE_TRIP'; data: TicketSale }
    | {
        type: 'ROUND_TRIP';
        data: { departureTrip: TicketSale; returnTrip: TicketSale };
      }
    | null;
}

const initialState: TicketSalesState = {
  statusSendEmail: 'idle',
  statusGetTicketSalesOfOrder: 'idle',
  statusGetTicketSales: 'idle',
  statusCreateTicketSale: 'idle',
  queueUpdateOrderStatus: [],
  ticketSales: [],
  currentPage: 0,
  totalPages: 0,
  totalRows: 0,
  currentSearcher: {},
  ticketSalesOfOrder: null,
};

export const ticketSalesSlice = createSlice({
  name: '@TicketSales',
  initialState,
  reducers: {
    /** <---------- read multiple ----------> */
    getTicketSalesRequest: (state, action: PayloadAction<GetTicketSalesRequest>) => {
      const { page, searcher } = action.payload;
      return {
        ...state,
        ticketSales: [],
        statusGetTicketSales: 'loading',
        currentPage: page,
        currentSearcher: searcher,
      };
    },
    getTicketSalesSuccess: (state, action: PayloadAction<GetTicketSalesSuccess>) => {
      const { data, totalPages, totalRows, page, searcher } = action.payload;
      return {
        ...state,
        ticketSales: data,
        totalPages,
        totalRows,
        statusGetTicketSales: 'success',
        currentPage: page,
        currentSearcher: searcher,
      };
    },
    getTicketSalesFailure: (state, _action: PayloadAction<GetTicketSalesFailure>) => {
      return {
        ...state,
        statusGetTicketSales: 'failure',
      };
    },
    /** <---------- read 1 ----------> */
    getTicketSaleWithOrderCodeRequest: (state, _action: PayloadAction<GetTicketSalesOfOrderRequest>) => {
      return {
        ...state,
        statusGetTicketSalesOfOrder: 'loading',
        ticketSalesOfOrder: null,
      };
    },
    getTicketSaleWithOrderCodeSuccess: (state, action: PayloadAction<GetTicketSalesOfOrderSuccess>) => {
      const { data } = action.payload;
      return {
        ...state,
        statusGetTicketSalesOfOrder: 'success',
        ticketSalesOfOrder: data,
      };
    },
    getTicketSaleWithOrderCodeFailure: (state, _action: PayloadAction<GetTicketSalesOfOrderFailure>) => {
      return {
        ...state,
        statusGetTicketSalesOfOrder: 'failure',
        ticketSalesOfOrder: null,
      };
    },
    /** <---------- create ----------> */
    createOrderRequest: (state, _action: PayloadAction<CreateOrderRequest>) => {
      return {
        ...state,
        statusCreateTicketSale: 'loading',
      };
    },
    createOrderSuccess: (state, _action: PayloadAction<CreateOrderSuccess>) => {
      return {
        ...state,
        statusCreateTicketSale: 'success',
      };
    },
    createOrderFailure: (state, _action: PayloadAction<CreateOrderFailure>) => {
      return {
        ...state,
        statusCreateTicketSale: 'failure',
      };
    },

    /** <---------- update ticket status ----------> */
    updateOrderStatusRequest: (state, action: PayloadAction<UpdateOrderStatusRequest>) => {
      const { targetTicket } = action.payload;
      return {
        ...state,
        queueUpdateOrderStatus: state.queueUpdateOrderStatus.concat(targetTicket._id),
      };
    },
    updateOrderStatusSuccess: (state, action: PayloadAction<UpdateOrderStatusSuccess>) => {
      const { data } = action.payload;
      return {
        ...state,
        queueUpdateOrderStatus: state.queueUpdateOrderStatus.filter(id => id !== data._id),
        ticketSales: state.ticketSales.map(ticketSale => {
          if (ticketSale.orderCode === data.orderCode) {
            return data;
          }
          return ticketSale;
        }),
      };
    },
    updateOrderStatusFailure: (state, action: PayloadAction<UpdateOrderStatusFailure>) => {
      const { id } = action.payload;
      return {
        ...state,
        queueUpdateOrderStatus: state.queueUpdateOrderStatus.filter(item => item !== id),
      };
    },

    /** <---------- send mail ----------> */
    sendEmailRequest: (state, _action: PayloadAction<SendEmailRequest>) => {
      return {
        ...state,
        statusSendEmail: 'loading',
      };
    },
    sendEmailSuccess: (state, _action: PayloadAction<SendEmailSuccess>) => {
      return {
        ...state,
        statusSendEmail: 'success',
      };
    },
    sendEmailFailure: (state, _action: PayloadAction<SendEmailFailure>) => {
      return {
        ...state,
        statusSendEmail: 'failure',
      };
    },
  },
});

export const ticketSalesActions = ticketSalesSlice.actions;
export const ticketSalesReducer = ticketSalesSlice.reducer;
