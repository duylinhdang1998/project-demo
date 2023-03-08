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
          _id: '63f1de4a520db06a111ef90c',
          company: '63d8d5e3b4c7b31bf36765c2',
          title: 'Wc',
          icon: '63f1de49520db06a111ef907',
          createdAt: '2023-02-19T08:31:06.335Z',
          updatedAt: '2023-02-19T08:31:06.335Z',
          __v: 0,
        },
        {
          _id: '63edddd4520db06a111eeb26',
          company: '63d8d5e3b4c7b31bf36765c2',
          title: 'Water',
          icon: '63efa705520db06a111ef2d2',
          createdAt: '2023-02-16T07:40:04.952Z',
          updatedAt: '2023-02-17T16:10:52.943Z',
          __v: 0,
        },
        {
          _id: '63d9e301447890b3ddfe61e5',
          company: '63d8d5e3b4c7b31bf36765c2',
          title: 'Food',
          icon: '63f0f831520db06a111ef476',
          createdAt: '2023-02-01T03:56:49.640Z',
          updatedAt: '2023-02-18T16:09:28.078Z',
          __v: 0,
        },
        {
          _id: '63eddef8520db06a111eeb3b',
          company: '63d8d5e3b4c7b31bf36765c2',
          title: 'Air',
          icon: '63eddef4520db06a111eeb36',
          createdAt: '2023-02-16T07:44:56.317Z',
          updatedAt: '2023-02-16T07:44:56.317Z',
          __v: 0,
        },
      ],
      merchandises: [
        {
          _id: '63e3b001778ca324cb4ef17a',
          company: '63d8d5e3b4c7b31bf36765c2',
          title: 'Package 4kg',
          description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          createdAt: '2023-02-08T14:21:53.019Z',
          updatedAt: '2023-02-08T14:21:53.019Z',
          __v: 0,
        },
        {
          _id: '63e3b098778ca324cb4ef1c2',
          company: '63d8d5e3b4c7b31bf36765c2',
          title: 'The Wild Hunt',
          description:
            'A BuzzFeed, LitHub, Tor, and Library Journal Best Book of Summer  A CrimeReads Most Anticipated Book of the Year  “An eerie, melodic debut.” —The New York Times Book Review        The islanders have only three rules: don’t stick your nose where it’s not wanted, don’t mention the war, and never let your guard down during October.  Leigh Welles has not set foot on the island in years, but when she finds herself called home from life on the Scottish mainland by her father’s unexpected death, she is determined to forget the sorrows of the past—her mother’s abandonment, her brother’s icy distance, the unspeakable tragedy of World War II—and start fresh. Fellow islander Iain MacTavish, an RAF veteran with his eyes on the sky and his head in the past, is also in desperate need of a new beginning. A young widower, Iain struggles to return to the normal life he knew before the war.  But this October is anything but normal. This October, the sluagh are restless. The ominous, birdlike creatures of Celtic legend—whispered to carry the souls of the dead—have haunted the islanders for decades, but in the war’s wake, there are more wandering souls and more sluagh. When a young man disappears, Leigh and Iain are thrown together to investigate the truth at the island’s dark heart and reveal hidden secrets of their own. Rich with historical detail, a skillful speculative edge, and a deep imagination, Emma Seckel’s propulsive and transporting debut The Wild Hunt unwinds long-held tales of love, loss, and redemption.',
          createdAt: '2023-02-08T14:24:24.739Z',
          updatedAt: '2023-02-08T14:24:24.739Z',
          __v: 0,
        },
        {
          _id: '63e3b0c0778ca324cb4ef1fe',
          company: '63d8d5e3b4c7b31bf36765c2',
          title: 'Tin House: Memory',
          description:
            'What is memory? How does it work? Reliable, unreliable, manipulated, historical, contradictory–from pure speculation to hard cognitive science, this issue brings you fiction, poetry, interviews, essays, and memoirs that explore memory.',
          createdAt: '2023-02-08T14:25:04.732Z',
          updatedAt: '2023-02-08T14:25:04.732Z',
          __v: 0,
        },
        {
          _id: '63e3b0ad778ca324cb4ef1de',
          company: '63d8d5e3b4c7b31bf36765c2',
          title: 'Kiss Me Someone',
          description:
            'A New York Times Book Review Editors’ Choice  A Best Book of Fall at The Washington Post, BuzzFeed, BUST, and more  “Dark yet sensitive explorations of family and love—of all kinds—from a masterful writer. The women at the centers of these stories are sharp-edged and complicated and irresistible; you won’t be able to look away.” —Celeste Ng Bold and unapologetic, Karen Shepard’s Kiss Me Someone is inhabited by women who walk the line between various states: adolescence and adulthood, stability and uncertainty, selfishness and compassion. They navigate the obstacles that come with mixed-race identity and instabilities in social class, and they use their liminal positions to leverage power. They employ rage and tenderness and logic and sex, but for all of their rationality they’re drawn to self-destructive behavior. Shepard’s stories explore what we do to lessen our burdens of sadness and isolation; her characters, fiercely true to themselves, are caught between their desire to move beyond their isolation and a fear that it’s exactly where they belong.',
          createdAt: '2023-02-08T14:24:45.657Z',
          updatedAt: '2023-02-08T14:24:45.657Z',
          __v: 0,
        },
      ],
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
      updatedAt: '2023-03-07T14:30:10.010Z',
      __v: 0,
    },
    departurePoint: 'Paris saint german',
    departureTime: '02:00',
    dayActives: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    startPeriod: 1707177600000,
    endPeriod: 1771372800000,
    stopPoints: [
      {
        stopPoint: 'Ars- Manchester City',
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
        stopPoint: 'Liverpool - Mu',
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
        stopPoint: 'Bayern - PSg',
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
        stopPoint: 'Hà nội Fc - Viettel Fc',
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
    tripType: 'MULTI_STOP',
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
          _id: '63f1de4a520db06a111ef90c',
          company: '63d8d5e3b4c7b31bf36765c2',
          title: 'Wc',
          icon: '63f1de49520db06a111ef907',
          createdAt: '2023-02-19T08:31:06.335Z',
          updatedAt: '2023-02-19T08:31:06.335Z',
          __v: 0,
        },
        {
          _id: '63edddd4520db06a111eeb26',
          company: '63d8d5e3b4c7b31bf36765c2',
          title: 'Water',
          icon: '63efa705520db06a111ef2d2',
          createdAt: '2023-02-16T07:40:04.952Z',
          updatedAt: '2023-02-17T16:10:52.943Z',
          __v: 0,
        },
        {
          _id: '63d9e301447890b3ddfe61e5',
          company: '63d8d5e3b4c7b31bf36765c2',
          title: 'Food',
          icon: '63f0f831520db06a111ef476',
          createdAt: '2023-02-01T03:56:49.640Z',
          updatedAt: '2023-02-18T16:09:28.078Z',
          __v: 0,
        },
        {
          _id: '63eddef8520db06a111eeb3b',
          company: '63d8d5e3b4c7b31bf36765c2',
          title: 'Air',
          icon: '63eddef4520db06a111eeb36',
          createdAt: '2023-02-16T07:44:56.317Z',
          updatedAt: '2023-02-16T07:44:56.317Z',
          __v: 0,
        },
      ],
      merchandises: [
        {
          _id: '63e3b001778ca324cb4ef17a',
          company: '63d8d5e3b4c7b31bf36765c2',
          title: 'Package 4kg',
          description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          createdAt: '2023-02-08T14:21:53.019Z',
          updatedAt: '2023-02-08T14:21:53.019Z',
          __v: 0,
        },
        {
          _id: '63e3b098778ca324cb4ef1c2',
          company: '63d8d5e3b4c7b31bf36765c2',
          title: 'The Wild Hunt',
          description:
            'A BuzzFeed, LitHub, Tor, and Library Journal Best Book of Summer  A CrimeReads Most Anticipated Book of the Year  “An eerie, melodic debut.” —The New York Times Book Review        The islanders have only three rules: don’t stick your nose where it’s not wanted, don’t mention the war, and never let your guard down during October.  Leigh Welles has not set foot on the island in years, but when she finds herself called home from life on the Scottish mainland by her father’s unexpected death, she is determined to forget the sorrows of the past—her mother’s abandonment, her brother’s icy distance, the unspeakable tragedy of World War II—and start fresh. Fellow islander Iain MacTavish, an RAF veteran with his eyes on the sky and his head in the past, is also in desperate need of a new beginning. A young widower, Iain struggles to return to the normal life he knew before the war.  But this October is anything but normal. This October, the sluagh are restless. The ominous, birdlike creatures of Celtic legend—whispered to carry the souls of the dead—have haunted the islanders for decades, but in the war’s wake, there are more wandering souls and more sluagh. When a young man disappears, Leigh and Iain are thrown together to investigate the truth at the island’s dark heart and reveal hidden secrets of their own. Rich with historical detail, a skillful speculative edge, and a deep imagination, Emma Seckel’s propulsive and transporting debut The Wild Hunt unwinds long-held tales of love, loss, and redemption.',
          createdAt: '2023-02-08T14:24:24.739Z',
          updatedAt: '2023-02-08T14:24:24.739Z',
          __v: 0,
        },
        {
          _id: '63e3b0c0778ca324cb4ef1fe',
          company: '63d8d5e3b4c7b31bf36765c2',
          title: 'Tin House: Memory',
          description:
            'What is memory? How does it work? Reliable, unreliable, manipulated, historical, contradictory–from pure speculation to hard cognitive science, this issue brings you fiction, poetry, interviews, essays, and memoirs that explore memory.',
          createdAt: '2023-02-08T14:25:04.732Z',
          updatedAt: '2023-02-08T14:25:04.732Z',
          __v: 0,
        },
        {
          _id: '63e3b0ad778ca324cb4ef1de',
          company: '63d8d5e3b4c7b31bf36765c2',
          title: 'Kiss Me Someone',
          description:
            'A New York Times Book Review Editors’ Choice  A Best Book of Fall at The Washington Post, BuzzFeed, BUST, and more  “Dark yet sensitive explorations of family and love—of all kinds—from a masterful writer. The women at the centers of these stories are sharp-edged and complicated and irresistible; you won’t be able to look away.” —Celeste Ng Bold and unapologetic, Karen Shepard’s Kiss Me Someone is inhabited by women who walk the line between various states: adolescence and adulthood, stability and uncertainty, selfishness and compassion. They navigate the obstacles that come with mixed-race identity and instabilities in social class, and they use their liminal positions to leverage power. They employ rage and tenderness and logic and sex, but for all of their rationality they’re drawn to self-destructive behavior. Shepard’s stories explore what we do to lessen our burdens of sadness and isolation; her characters, fiercely true to themselves, are caught between their desire to move beyond their isolation and a fear that it’s exactly where they belong.',
          createdAt: '2023-02-08T14:24:45.657Z',
          updatedAt: '2023-02-08T14:24:45.657Z',
          __v: 0,
        },
      ],
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
      updatedAt: '2023-03-07T14:30:10.010Z',
      __v: 0,
    },
    departurePoint: 'Indonesia Bali',
    departureTime: '02:00',
    dayActives: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    startPeriod: 1677456000000,
    endPeriod: 1677542400000,
    stopPoints: [
      {
        stopPoint: 'Thái Lan Bangkok',
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
    tripType: 'ONE_TRIP',
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
