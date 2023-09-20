import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Searcher } from 'services/@types/SearchParams';
import { GetTicketSalesFailure, GetTicketSalesRequest, GetTicketSalesSuccess } from './actions/GetTicketSales';
import { ReportTicketSale } from 'services/models/ReportTicketSale';

export interface TicketSalesState {
  statusGetTicketSales: Status;
  ticketSales: ReportTicketSale[];
  currentPage: number;
  totalPages: number;
  totalRows: number;
  currentSearcher: Searcher<ReportTicketSale>;
}

const initialState: TicketSalesState = {
  statusGetTicketSales: 'idle',
  ticketSales: [],
  currentPage: 0,
  totalPages: 0,
  totalRows: 0,
  currentSearcher: {},
};

export const reportsSlice = createSlice({
  name: '@Reports',
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
  },
});

export const reportsActions = reportsSlice.actions;
export const reportsReducer = reportsSlice.reducer;
