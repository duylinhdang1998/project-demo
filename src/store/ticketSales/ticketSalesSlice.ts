import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Searcher } from 'services/@types/SearchParams';
import { TicketSale } from 'services/models/TicketSale';
import { CreateTicketSaleOneWayFailure, CreateTicketSaleOneWayRequest, CreateTicketSaleOneWaySuccess } from './actions/CreateTicketSaleOneWay';
import { GetTicketSaleFailure, GetTicketSaleRequest, GetTicketSaleSuccess } from './actions/GetTicketSale';
import { GetTicketSalesFailure, GetTicketSalesRequest, GetTicketSalesSuccess } from './actions/GetTicketSales';
import { SendEmailFailure, SendEmailRequest, SendEmailSuccess } from './actions/SendEmail';
import { UpdateTicketStatusFailure, UpdateTicketStatusRequest, UpdateTicketStatusSuccess } from './actions/UpdateTicketStatus';

interface TicketSalesState {
  statusSendEmail: Status;
  statusGetTicketSales: Status;
  statusGetTicketSale: Status;
  statusCreateTicketSale: Status;
  queueUpdateTicketStatus: TicketSale['_id'][];
  ticketSales: TicketSale[];
  currentPage: number;
  totalPages: number;
  totalRows: number;
  currentSearcher: Searcher<TicketSale>;
  ticketSale:
    | { type: 'ONE_WAY'; data: TicketSale }
    | {
        type: 'ROUND_TRIP';
        data: { departureTrip: TicketSale; returnTrip: TicketSale };
      }
    | null;
}

const initialState: TicketSalesState = {
  statusSendEmail: 'idle',
  statusGetTicketSale: 'idle',
  statusGetTicketSales: 'idle',
  statusCreateTicketSale: 'idle',
  queueUpdateTicketStatus: [],
  ticketSales: [],
  currentPage: 0,
  totalPages: 0,
  totalRows: 0,
  currentSearcher: {},
  ticketSale: null,
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
    getTicketSaleRequest: (state, _action: PayloadAction<GetTicketSaleRequest>) => {
      return {
        ...state,
        statusGetTicketSale: 'loading',
        ticketSale: null,
      };
    },
    getTicketSaleSuccess: (state, action: PayloadAction<GetTicketSaleSuccess>) => {
      const { data } = action.payload;
      if (data.ticketType === 'ROUND_TRIP') {
        return {
          ...state,
          statusGetTicketSale: 'success',
          ticketSale: {
            type: 'ROUND_TRIP',
            data: {
              departureTrip: data,
              returnTrip: data,
            },
          },
        };
      }
      return {
        ...state,
        statusGetTicketSale: 'success',
        ticketSale: {
          type: 'ONE_WAY',
          data,
        },
      };
    },
    getTicketSaleFailure: (state, _action: PayloadAction<GetTicketSaleFailure>) => {
      return {
        ...state,
        statusGetTicketSale: 'failure',
        ticketSale: null,
      };
    },
    /** <---------- create ----------> */
    createTicketSaleOneWayRequest: (state, _action: PayloadAction<CreateTicketSaleOneWayRequest>) => {
      return {
        ...state,
        statusCreateTicketSale: 'loading',
      };
    },
    createTicketSaleOneWaySuccess: (state, action: PayloadAction<CreateTicketSaleOneWaySuccess>) => {
      const { data } = action.payload;
      return {
        ...state,
        statusCreateTicketSale: 'success',
        ticketSales: state.ticketSales.concat(data),
      };
    },
    createTicketSaleOneWayFailure: (state, _action: PayloadAction<CreateTicketSaleOneWayFailure>) => {
      return {
        ...state,
        statusCreateTicketSale: 'failure',
      };
    },

    /** <---------- update ticket status ----------> */
    updateTicketStatusRequest: (state, action: PayloadAction<UpdateTicketStatusRequest>) => {
      const { targetTicket } = action.payload;
      return {
        ...state,
        queueUpdateTicketStatus: state.queueUpdateTicketStatus.concat(targetTicket._id),
      };
    },
    updateTicketStatusSuccess: (state, action: PayloadAction<UpdateTicketStatusSuccess>) => {
      const { data } = action.payload;
      return {
        ...state,
        queueUpdateTicketStatus: state.queueUpdateTicketStatus.filter(id => id !== data._id),
        // FIXME: Update
      };
    },
    updateTicketStatusFailure: (state, action: PayloadAction<UpdateTicketStatusFailure>) => {
      const { id } = action.payload;
      return {
        ...state,
        queueUpdateTicketStatus: state.queueUpdateTicketStatus.filter(item => item !== id),
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
