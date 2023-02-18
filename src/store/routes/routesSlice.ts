import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Searcher } from 'services/@types/SearchParams';
import { Route } from 'services/models/Route';
import { DeleteRouteFailure, DeleteRouteRequest, DeleteRouteSuccess } from './actions/DeleteRoute';
import { GetRouteFailure, GetRouteRequest, GetRouteSuccess } from './actions/GetRoute';
import { GetRoutesFailure, GetRoutesRequest, GetRoutesSuccess } from './actions/GetRoutes';

interface RoutesManagerState {
  statusGetRoutes: Status;
  statusGetRoute: Status;
  statusCreateRoute: Status;
  queueUpdateRoute: Route['_id'][];
  queueDeleteRoute: Route['_id'][];
  routes: Route[];
  currentPage: number;
  totalPages: number;
  totalRows: number;
  currentSearcher: Searcher<Route>;
  route: Route | null;
}

const initialState: RoutesManagerState = {
  statusGetRoute: 'idle',
  statusGetRoutes: 'idle',
  statusCreateRoute: 'idle',
  queueDeleteRoute: [],
  queueUpdateRoute: [],
  routes: [],
  currentPage: 0,
  totalPages: 0,
  totalRows: 0,
  currentSearcher: {},
  route: null,
};

export const routesSlice = createSlice({
  name: '@Routes',
  initialState,
  reducers: {
    /** <---------- read multiple ----------> */
    getRoutesRequest: (state, action: PayloadAction<GetRoutesRequest>) => {
      const { page, searcher } = action.payload;
      return {
        ...state,
        statusGetRoutes: 'loading',
        currentPage: page,
        currentSearcher: searcher,
      };
    },
    getRoutesSuccess: (state, action: PayloadAction<GetRoutesSuccess>) => {
      const { data, totalPages, totalRows, page, searcher } = action.payload;
      return {
        ...state,
        routes: data,
        totalPages,
        totalRows,
        statusGetRoutes: 'success',
        currentPage: page,
        currentSearcher: searcher,
      };
    },
    getRoutesFailure: (state, _action: PayloadAction<GetRoutesFailure>) => {
      return {
        ...state,
        statusGetRoutes: 'failure',
      };
    },
    /** <---------- read 1 ----------> */
    getRouteRequest: (state, _action: PayloadAction<GetRouteRequest>) => {
      return {
        ...state,
        statusGetRoute: 'loading',
        route: null,
      };
    },
    getRouteSuccess: (state, action: PayloadAction<GetRouteSuccess>) => {
      const { data } = action.payload;
      return {
        ...state,
        statusGetRoute: 'success',
        route: data,
      };
    },
    getRouteFailure: (state, _action: PayloadAction<GetRouteFailure>) => {
      return {
        ...state,
        statusGetRoute: 'failure',
        route: null,
      };
    },

    deleteRouteRequest: (state, action: PayloadAction<DeleteRouteRequest>) => {
      const { id } = action.payload;
      return {
        ...state,
        queueDeleteRoute: state.queueDeleteRoute.concat(id),
      };
    },
    deleteRouteSuccess: (state, action: PayloadAction<DeleteRouteSuccess>) => {
      const { id } = action.payload;
      return {
        ...state,
        routes: state.routes.filter(office => office._id !== id),
        queueDeleteRoute: state.queueDeleteRoute.filter(item => item !== id),
      };
    },
    deleteRouteFailure: (state, action: PayloadAction<DeleteRouteFailure>) => {
      const { id } = action.payload;
      return {
        ...state,
        queueDeleteRoute: state.queueDeleteRoute.filter(item => item !== id),
      };
    },
  },
});

export const routesActions = routesSlice.actions;
export const routesReducer = routesSlice.reducer;
