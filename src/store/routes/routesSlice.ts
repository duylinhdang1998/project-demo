import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Searcher } from 'services/@types/SearchParams';
import { Route, RoutePoint } from 'services/models/Route';
import { CreateMultipleStopTripFailure, CreateMultipleStopTripRequest, CreateMultipleStopTripSuccess } from './actions/CreateMultipleStopTrip';
import { CreateOneStopTripFailure, CreateOneStopTripRequest, CreateOneStopTripSuccess } from './actions/CreateOneStopTrip';
import { DeleteRouteFailure, DeleteRouteRequest, DeleteRouteSuccess } from './actions/DeleteRoute';
import { GetRouteFailure, GetRouteRequest, GetRouteSuccess } from './actions/GetRoute';
import { GetRoutesFailure, GetRoutesRequest, GetRoutesSuccess } from './actions/GetRoutes';
import { ToggleDayActiveFailure, ToggleDayActiveRequest, ToggleDayActiveSuccess } from './actions/ToggleDayActive';
import { UpdateActiveDaysFailure, UpdateActiveDaysRequest, UpdateActiveDaysSuccess } from './actions/UpdateActiveDays';
import { UpdateTripFailure, UpdateTripRequest, UpdateTripSuccess } from './actions/UpdateTrip';
import {
  UpdateParticularDayPriceFailure,
  UpdateParticularDayPriceRequest,
  UpdateParticularDayPriceSuccess,
} from './actions/UpdateParticularDayPrice';
import { UpdateRoutePointPriceFailure, UpdateRoutePointPriceRequest, UpdateRoutePointPriceSuccess } from './actions/UpdateRoutePointPrice';

interface RoutesManagerState {
  statusGetRoutes: Status;
  statusGetRoute: Status;
  statusCreateRoute: Status;
  statusUpdateRoute: Status;
  statusRemoveDayActive: Status;
  statusUpdateDayActive: Status;
  statusUpdateParticularDayPrice: Status;
  queueDeleteRoute: Route['_id'][];
  queueUpdateRoutePointPrice: RoutePoint['_id'][];
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
  statusUpdateRoute: 'idle',
  statusUpdateDayActive: 'idle',
  statusRemoveDayActive: 'idle',
  statusUpdateParticularDayPrice: 'idle',
  queueDeleteRoute: [],
  queueUpdateRoutePointPrice: [],
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
        routes: [],
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

    /** <---------- create one stop trip ----------> */
    createOneStopTripRequest: (state, _action: PayloadAction<CreateOneStopTripRequest>) => {
      return {
        ...state,
        route: null,
        statusCreateRoute: 'loading',
      };
    },
    createOneStopTripSuccess: (state, action: PayloadAction<CreateOneStopTripSuccess>) => {
      const { data } = action.payload;
      return {
        ...state,
        route: data,
        statusCreateRoute: 'success',
      };
    },
    createOneStopTripFailure: (state, _action: PayloadAction<CreateOneStopTripFailure>) => {
      return {
        ...state,
        route: null,
        statusCreateRoute: 'failure',
      };
    },

    /** <---------- create multiple stop trip ----------> */
    createMultipleStopTripRequest: (state, _action: PayloadAction<CreateMultipleStopTripRequest>) => {
      return {
        ...state,
        route: null,
        statusCreateRoute: 'loading',
      };
    },
    createMultipleStopTripSuccess: (state, action: PayloadAction<CreateMultipleStopTripSuccess>) => {
      const { data } = action.payload;
      return {
        ...state,
        route: data,
        statusCreateRoute: 'success',
      };
    },
    createMultipleStopTripFailure: (state, _action: PayloadAction<CreateMultipleStopTripFailure>) => {
      return {
        ...state,
        route: null,
        statusCreateRoute: 'failure',
      };
    },

    /** <---------- update trip by step form ----------> */
    updateTripRequest: (state, _action: PayloadAction<UpdateTripRequest>) => {
      return {
        ...state,
        statusUpdateRoute: 'loading',
      };
    },
    updateTripSuccess: (state, action: PayloadAction<UpdateTripSuccess>) => {
      const { data } = action.payload;
      return {
        ...state,
        route: data,
        statusUpdateRoute: 'success',
      };
    },
    updateTripFailure: (state, _action: PayloadAction<UpdateTripFailure>) => {
      return {
        ...state,
        statusUpdateRoute: 'failure',
      };
    },

    updateRoutePointPriceRequest: (state, action: PayloadAction<UpdateRoutePointPriceRequest>) => {
      const { routePointId } = action.payload;
      return {
        ...state,
        queueUpdateRoutePointPrice: state.queueUpdateRoutePointPrice.concat(routePointId),
      };
    },
    updateRoutePointPriceSuccess: (state, action: PayloadAction<UpdateRoutePointPriceSuccess>) => {
      const { data, routePointId } = action.payload;
      return {
        ...state,
        routes: state.routes.map(route => {
          if (route._id === data._id) {
            return data;
          }
          return route;
        }),
        queueUpdateRoutePointPrice: state.queueUpdateRoutePointPrice.filter(item => item !== routePointId),
      };
    },
    updateRoutePointPriceFailure: (state, action: PayloadAction<UpdateRoutePointPriceFailure>) => {
      const { routePointId } = action.payload;
      return {
        ...state,
        queueUpdateRoutePointPrice: state.queueUpdateRoutePointPrice.filter(item => item !== routePointId),
      };
    },

    /** <---------- update active days ----------> */
    updateActiveDaysRequest: (state, _action: PayloadAction<UpdateActiveDaysRequest>) => {
      return {
        ...state,
        statusUpdateDayActive: 'loading',
      };
    },
    updateActiveDaysSuccess: (state, action: PayloadAction<UpdateActiveDaysSuccess>) => {
      const { data } = action.payload;
      return {
        ...state,
        route: data,
        statusUpdateDayActive: 'success',
      };
    },
    updateActiveDaysFailure: (state, _action: PayloadAction<UpdateActiveDaysFailure>) => {
      return {
        ...state,
        statusUpdateDayActive: 'failure',
      };
    },

    /** <---------- toggle active day (create & remove dayoffs) ----------> */
    toggleDayActiveRequest: (state, _action: PayloadAction<ToggleDayActiveRequest>) => {
      return {
        ...state,
        statusRemoveDayActive: 'loading',
      };
    },
    toggleDayActiveSuccess: (state, action: PayloadAction<ToggleDayActiveSuccess>) => {
      const { data } = action.payload;
      return {
        ...state,
        route: data,
        statusRemoveDayActive: 'success',
      };
    },
    toggleDayActiveFailure: (state, _action: PayloadAction<ToggleDayActiveFailure>) => {
      return {
        ...state,
        statusRemoveDayActive: 'failure',
      };
    },

    /** <---------- update ticket prices ----------> */
    updateParticularDayPriceRequest: (state, _action: PayloadAction<UpdateParticularDayPriceRequest>) => {
      return {
        ...state,
        statusUpdateParticularDayPrice: 'loading',
      };
    },
    updateParticularDayPriceSuccess: (state, action: PayloadAction<UpdateParticularDayPriceSuccess>) => {
      const { data } = action.payload;
      return {
        ...state,
        route: data,
        routes: state.routes.map(route => {
          if (route._id === data._id) {
            return data;
          }
          return route;
        }),
        statusUpdateParticularDayPrice: 'success',
      };
    },
    updateParticularDayPriceFailure: (state, _action: PayloadAction<UpdateParticularDayPriceFailure>) => {
      return {
        ...state,
        statusUpdateParticularDayPrice: 'failure',
      };
    },

    /** <---------- delete route ----------> */
    deleteRouteRequest: (state, action: PayloadAction<DeleteRouteRequest>) => {
      const { routeCode } = action.payload;
      return {
        ...state,
        queueDeleteRoute: state.queueDeleteRoute.concat(routeCode),
      };
    },
    deleteRouteSuccess: (state, action: PayloadAction<DeleteRouteSuccess>) => {
      const { routeCode } = action.payload;
      return {
        ...state,
        routes: state.routes.filter(route => route.routeCode !== routeCode),
        queueDeleteRoute: state.queueDeleteRoute.filter(item => item !== routeCode),
      };
    },
    deleteRouteFailure: (state, action: PayloadAction<DeleteRouteFailure>) => {
      const { routeCode } = action.payload;
      return {
        ...state,
        queueDeleteRoute: state.queueDeleteRoute.filter(item => item !== routeCode),
      };
    },
  },
});

export const routesActions = routesSlice.actions;
export const routesReducer = routesSlice.reducer;
