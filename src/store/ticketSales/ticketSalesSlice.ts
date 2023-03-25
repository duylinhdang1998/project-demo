import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Searcher } from 'services/@types/SearchParams';
import { TicketSale } from 'services/models/TicketSale';
import { CreateTicketSaleFailure, CreateTicketSaleRequest, CreateTicketSaleSuccess } from './actions/CreateTicketSale';
import { GetTicketSaleFailure, GetTicketSaleRequest, GetTicketSaleSuccess } from './actions/GetTicketSale';
import { GetTicketSalesFailure, GetTicketSalesRequest, GetTicketSalesSuccess } from './actions/GetTicketSales';
import { SendEmailFailure, SendEmailRequest, SendEmailSuccess } from './actions/SendEmail';

interface TicketSalesState {
  statusSendEmail: Status;
  statusGetTicketSales: Status;
  statusGetTicketSale: Status;
  statusCreateTicketSale: Status;
  ticketSales: TicketSale[];
  currentPage: number;
  totalPages: number;
  totalRows: number;
  currentSearcher: Searcher<TicketSale>;
  ticketSale: TicketSale | null;
}

const initialState: TicketSalesState = {
  statusSendEmail: 'idle',
  statusGetTicketSale: 'idle',
  statusGetTicketSales: 'idle',
  statusCreateTicketSale: 'idle',
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
      return {
        ...state,
        statusGetTicketSale: 'success',
        ticketSale: data,
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
    createTicketSaleRequest: (state, _action: PayloadAction<CreateTicketSaleRequest>) => {
      return {
        ...state,
        statusCreateTicketSale: 'loading',
      };
    },
    createTicketSaleSuccess: (state, action: PayloadAction<CreateTicketSaleSuccess>) => {
      const { data } = action.payload;
      return {
        ...state,
        statusCreateTicketSale: 'success',
        ticketSales: state.ticketSales.concat(data),
      };
    },
    createTicketSaleFailure: (state, _action: PayloadAction<CreateTicketSaleFailure>) => {
      return {
        ...state,
        statusCreateTicketSale: 'failure',
      };
    },
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
