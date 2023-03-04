import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Searcher } from 'services/@types/SearchParams';
import { Route } from 'services/models/Route';
import { CreateMultipleStopTripFailure, CreateMultipleStopTripRequest, CreateMultipleStopTripSuccess } from './actions/CreateMultipleStopTrip';
import { CreateOneStopTripFailure, CreateOneStopTripRequest, CreateOneStopTripSuccess } from './actions/CreateOneStopTrip';
import { DeleteRouteFailure, DeleteRouteRequest, DeleteRouteSuccess } from './actions/DeleteRoute';
import { GetRouteFailure, GetRouteRequest, GetRouteSuccess } from './actions/GetRoute';
import { GetRoutesFailure, GetRoutesRequest, GetRoutesSuccess } from './actions/GetRoutes';
import { RemoveDayActiveFailure, RemoveDayActiveRequest, RemoveDayActiveSuccess } from './actions/RemoveDayActive';
import { UpdateActiveDaysFailure, UpdateActiveDaysRequest, UpdateActiveDaysSuccess } from './actions/UpdateActiveDays';
import { UpdateTicketPricesFailure, UpdateTicketPricesRequest, UpdateTicketPricesSuccess } from './actions/UpdateTicketPrices';

const DATA_SAMPLE: Record<string, Route> = {
  multipleStops: {
    _id: '63f1e258520db06a111ef978',
    company: '63d8d5e3b4c7b31bf36765c2',
    routeCode: '14321242',
    vehicle: {
      _id: '63ece1c8277819c958d5384a',
      company: '63d8d5e3b4c7b31bf36765c2',
      brand: 'BMW',
      model: 'X5 E70 3.5D 286HP',
      registrationId: 'EDC16CP35',
      ECOseats: 8,
      VIPseats: 16,
      services: [
        {
          _id: '63d9e301447890b3ddfe61e5',
          company: '63d8d5e3b4c7b31bf36765c2',
          title: 'Food',
          icon: '63f0f831520db06a111ef476',
          createdAt: '2023-02-01T03:56:49.640Z',
          updatedAt: '2023-02-18T16:09:28.078Z',
          __v: 0,
        },
      ],
      merchandises: [],
      attach: {
        _id: '63ece1c6277819c958d53845',
        publicUrl: 'images/origin/63ece1c6277819c958d53845.webp',
        thumbnail: 'images/300-300/63ece1c6277819c958d53845.webp',
        thumbnail2x: 'images/600-600/63ece1c6277819c958d53845.webp',
        size: 5369,
        mimetype: 'image/jpeg',
        uploader: 'Alibaba',
        encoding: '7bit',
        bucketName: 'images',
        state: 'PUBLIC_FOR_INTERNET',
        createdAt: '2023-02-15T13:44:38.097Z',
        updatedAt: '2023-02-15T13:44:38.097Z',
        __v: 0,
      },
      createdAt: '2023-02-15T13:44:40.655Z',
      updatedAt: '2023-02-15T13:53:10.903Z',
      __v: 0,
    },
    departurePoint: 'Hà Nam',
    departureTime: '02:00',
    dayActives: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    startPeriod: 1707177600000,
    endPeriod: 1771372800000,
    stopPoints: [
      {
        stopPoint: 'Nam Định',
        stopCode: '63f1e258520db06a111ef975',
        durationTime: 33,
        ECOPrices: {
          ADULT: 33,
          CHILD: 33,
          STUDENT: 33,
        },
        VIPPrices: {
          ADULT: 33,
          CHILD: 33,
          STUDENT: 33,
        },
        createdAt: '2023-02-19T08:48:24.428Z',
        updatedAt: '2023-02-19T08:48:24.428Z',
      },
      {
        stopPoint: 'Hà Nam',
        stopCode: '63f1e258520db06a2222f976',
        durationTime: 33,
        ECOPrices: {
          ADULT: 33,
          CHILD: 33,
          STUDENT: 13,
        },
        VIPPrices: {
          ADULT: 33,
          CHILD: 33,
          STUDENT: 333,
        },
        createdAt: '2023-02-19T08:48:24.428Z',
        updatedAt: '2023-02-19T08:48:24.428Z',
      },
      {
        stopPoint: 'Hà Nam',
        stopCode: '63f1e258333336a111ef976',
        durationTime: 33,
        ECOPrices: {
          ADULT: 33,
          CHILD: 33,
          STUDENT: 13,
        },
        VIPPrices: {
          ADULT: 33,
          CHILD: 33,
          STUDENT: 333,
        },
        createdAt: '2023-02-19T08:48:24.428Z',
        updatedAt: '2023-02-19T08:48:24.428Z',
      },
      {
        stopPoint: 'Hà Nam',
        stopCode: '63f1e258520db06a111ef976',
        durationTime: 33,
        ECOPrices: {
          ADULT: 33,
          CHILD: 33,
          STUDENT: 13,
        },
        VIPPrices: {
          ADULT: 33,
          CHILD: 33,
          STUDENT: 333,
        },
        createdAt: '2023-02-19T08:48:24.428Z',
        updatedAt: '2023-02-19T08:48:24.428Z',
      },
    ],
    particularDays: ['2024-02-24', '2024-02-27'],
    dayoffs: [1707177600000, 1707696000000, 1707955200000],
    routeType: 'MULTI_STOP',
    createdAt: '2023-02-19T08:48:24.428Z',
    updatedAt: '2023-02-19T08:49:11.354Z',
    __v: 2,
  },
  oneStop: {
    _id: '63f19f68520db06a111ef6e1',
    company: '63d8d5e3b4c7b31bf36765c2',
    routeCode: '03388437',
    vehicle: {
      _id: '63ece1c8277819c958d5384a',
      company: '63d8d5e3b4c7b31bf36765c2',
      brand: 'BMW',
      model: 'X5 E70 3.5D 286HP',
      registrationId: 'EDC16CP35',
      ECOseats: 8,
      VIPseats: 16,
      services: [
        {
          _id: '63d9e301447890b3ddfe61e5',
          company: '63d8d5e3b4c7b31bf36765c2',
          title: 'Food',
          icon: '63f0f831520db06a111ef476',
          createdAt: '2023-02-01T03:56:49.640Z',
          updatedAt: '2023-02-18T16:09:28.078Z',
          __v: 0,
        },
      ],
      merchandises: [],
      attach: {
        _id: '63ece1c6277819c958d53845',
        publicUrl: 'images/origin/63ece1c6277819c958d53845.webp',
        thumbnail: 'images/300-300/63ece1c6277819c958d53845.webp',
        thumbnail2x: 'images/600-600/63ece1c6277819c958d53845.webp',
        size: 5369,
        mimetype: 'image/jpeg',
        uploader: 'Alibaba',
        encoding: '7bit',
        bucketName: 'images',
        state: 'PUBLIC_FOR_INTERNET',
        createdAt: '2023-02-15T13:44:38.097Z',
        updatedAt: '2023-02-15T13:44:38.097Z',
        __v: 0,
      },
      createdAt: '2023-02-15T13:44:40.655Z',
      updatedAt: '2023-02-15T13:53:10.903Z',
      __v: 0,
    },
    departurePoint: 'Hà Nam',
    departureTime: '02:00',
    dayActives: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    startPeriod: 1677456000000,
    endPeriod: 1677542400000,
    stopPoints: [
      {
        stopPoint: 'Nam Định',
        stopCode: '63f19f68520db06a111ef6df',
        durationTime: 4,
        ECOPrices: {
          ADULT: 11,
          CHILD: 11,
          STUDENT: 101,
        },
        VIPPrices: {
          ADULT: 11,
          CHILD: 110,
          STUDENT: 11,
        },
        createdAt: '2023-02-19T04:02:48.899Z',
        updatedAt: '2023-02-19T04:02:48.899Z',
      },
    ],
    particularDays: ['2023-02-07'],
    dayoffs: [1675209600000],
    routeType: 'ONE_TRIP',
    createdAt: '2023-02-19T04:02:48.900Z',
    updatedAt: '2023-02-19T08:06:37.835Z',
    __v: 1,
  },
};

interface RoutesManagerState {
  statusGetRoutes: Status;
  statusGetRoute: Status;
  statusCreateRoute: Status;
  statusUpdateRoute: Status;
  statusRemoveDayActive: Status;
  statusUpdateDayActive: Status;
  statusUpdateTicketPrices: Status;
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
  statusUpdateRoute: 'idle',
  statusUpdateDayActive: 'idle',
  statusRemoveDayActive: 'idle',
  statusUpdateTicketPrices: 'idle',
  queueDeleteRoute: [],
  routes: [DATA_SAMPLE.multipleStops, DATA_SAMPLE.oneStop],
  currentPage: 0,
  totalPages: 0,
  totalRows: 0,
  currentSearcher: {},
  route: DATA_SAMPLE.multipleStops,
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

    /** <---------- remove active day (create dayoffs) ----------> */
    removeDayActiveRequest: (state, _action: PayloadAction<RemoveDayActiveRequest>) => {
      return {
        ...state,
        statusRemoveDayActive: 'loading',
      };
    },
    removeDayActiveSuccess: (state, action: PayloadAction<RemoveDayActiveSuccess>) => {
      const { data } = action.payload;
      return {
        ...state,
        route: data,
        statusRemoveDayActive: 'success',
      };
    },
    removeDayActiveFailure: (state, _action: PayloadAction<RemoveDayActiveFailure>) => {
      return {
        ...state,
        statusRemoveDayActive: 'failure',
      };
    },

    /** <---------- update ticket prices ----------> */
    updateTicketPricesRequest: (state, _action: PayloadAction<UpdateTicketPricesRequest>) => {
      return {
        ...state,
        statusUpdateTicketPrices: 'loading',
      };
    },
    updateTicketPricesSuccess: (state, action: PayloadAction<UpdateTicketPricesSuccess>) => {
      const { data } = action.payload;
      return {
        ...state,
        route: data,
        statusUpdateTicketPrices: 'success',
      };
    },
    updateTicketPricesFailure: (state, _action: PayloadAction<UpdateTicketPricesFailure>) => {
      return {
        ...state,
        statusRemoveDayActive: 'failure',
      };
    },

    /** <---------- delete route ----------> */
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
