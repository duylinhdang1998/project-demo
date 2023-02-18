import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Searcher } from 'services/@types/SearchParams';
import { VehicleEvent } from 'services/models/Vehicle';
import { CreateVehicleEventFailure, CreateVehicleEventRequest, CreateVehicleEventSuccess } from './actions/vehicleEvents/CreateVehicleEvent';
import { DeleteVehicleEventFailure, DeleteVehicleEventRequest, DeleteVehicleEventSuccess } from './actions/vehicleEvents/DeleteVehicleEvent';
import { GetVehicleEventFailure, GetVehicleEventRequest, GetVehicleEventSuccess } from './actions/vehicleEvents/GetVehicleEvent';
import { GetVehicleEventsFailure, GetVehicleEventsRequest, GetVehicleEventsSuccess } from './actions/vehicleEvents/GetVehicleEvents';
import { UpdateVehicleEventFailure, UpdateVehicleEventRequest, UpdateVehicleEventSuccess } from './actions/vehicleEvents/UpdateVehicleEvent';

interface VehicleEventsManagerState {
  statusGetVehicleEvents: Status;
  statusGetVehicleEvent: Status;
  statusCreateVehicleEvent: Status;
  queueUpdateVehicleEvent: VehicleEvent['_id'][];
  queueDeleteVehicleEvent: VehicleEvent['_id'][];
  currentPage: number;
  totalPages: number;
  totalRows: number;
  currentSearcher: Searcher<VehicleEvent>;
  vehicleEvent: VehicleEvent | null;
  vehicleEvents: VehicleEvent[];
}

const initialState: VehicleEventsManagerState = {
  statusGetVehicleEvent: 'idle',
  statusGetVehicleEvents: 'idle',
  statusCreateVehicleEvent: 'idle',
  queueDeleteVehicleEvent: [],
  queueUpdateVehicleEvent: [],
  currentPage: 0,
  totalPages: 0,
  totalRows: 0,
  currentSearcher: {},
  vehicleEvent: null,
  vehicleEvents: [],
};

const vehicleEventsSlice = createSlice({
  name: '@VehicleEventsManager',
  initialState,
  reducers: {
    /** <---------- read multiple ----------> */
    getVehicleEventsRequest: (state, action: PayloadAction<GetVehicleEventsRequest>) => {
      const { page, searcher } = action.payload;
      return {
        ...state,
        statusGetVehicleEvents: 'loading',
        currentPage: page,
        currentSearcher: searcher,
        vehicleEvents: [],
      };
    },
    getVehicleEventsSuccess: (state, action: PayloadAction<GetVehicleEventsSuccess>) => {
      const { vehicleEvents, totalPages, totalRows, page, searcher } = action.payload;
      return {
        ...state,
        vehicleEvents,
        totalPages,
        totalRows,
        statusGetVehicleEvents: 'success',
        currentPage: page,
        currentSearcher: searcher,
      };
    },
    getVehicleEventsFailure: (state, _action: PayloadAction<GetVehicleEventsFailure>) => {
      return {
        ...state,
        statusGetVehicleEvents: 'failure',
      };
    },
    /** <---------- read 1 ----------> */
    getVehicleEventRequest: (state, _action: PayloadAction<GetVehicleEventRequest>) => {
      return {
        ...state,
        statusGetVehicleEvent: 'loading',
        vehicleEvent: null,
      };
    },
    getVehicleEventSuccess: (state, action: PayloadAction<GetVehicleEventSuccess>) => {
      const { vehicleEvent } = action.payload;
      return {
        ...state,
        statusGetVehicleEvent: 'success',
        vehicleEvent,
      };
    },
    getVehicleEventFailure: (state, _action: PayloadAction<GetVehicleEventFailure>) => {
      return {
        ...state,
        statusGetVehicleEvent: 'failure',
        vehicleEvent: null,
      };
    },
    /** <---------- create ----------> */
    createVehicleEventRequest: (state, _action: PayloadAction<CreateVehicleEventRequest>) => {
      return {
        ...state,
        statusCreateVehicleEvent: 'loading',
      };
    },
    createVehicleEventSuccess: (state, action: PayloadAction<CreateVehicleEventSuccess>) => {
      const { data } = action.payload;
      return {
        ...state,
        statusCreateVehicleEvent: 'success',
        vehicleEvents: state.vehicleEvents.concat(data),
      };
    },
    createVehicleEventFailure: (state, _action: PayloadAction<CreateVehicleEventFailure>) => {
      return {
        ...state,
        statusCreateVehicleEvent: 'failure',
      };
    },
    /** <---------- update ----------> */
    updateVehicleEventRequest: (state, action: PayloadAction<UpdateVehicleEventRequest>) => {
      const { id } = action.payload;
      return {
        ...state,
        queueUpdateVehicleEvent: state.queueUpdateVehicleEvent.concat(id),
      };
    },
    updateVehicleEventSuccess: (state, action: PayloadAction<UpdateVehicleEventSuccess>) => {
      const { data } = action.payload;
      return {
        ...state,
        queueUpdateVehicleEvent: state.queueUpdateVehicleEvent.filter(id => id !== data._id),
        vehicleEvents: state.vehicleEvents.map(vehicleEvent => {
          if (vehicleEvent._id === data._id) {
            return data;
          }
          return vehicleEvent;
        }),
      };
    },
    updateVehicleEventFailure: (state, action: PayloadAction<UpdateVehicleEventFailure>) => {
      const { id } = action.payload;
      return {
        ...state,
        queueUpdateVehicleEvent: state.queueUpdateVehicleEvent.filter(item => id !== item),
      };
    },
    deleteVehicleEventRequest: (state, action: PayloadAction<DeleteVehicleEventRequest>) => {
      const { id } = action.payload;
      return {
        ...state,
        queueDeleteVehicleEvent: state.queueDeleteVehicleEvent.concat(id),
      };
    },
    deleteVehicleEventSuccess: (state, action: PayloadAction<DeleteVehicleEventSuccess>) => {
      const { id } = action.payload;
      return {
        ...state,
        vehicleEvents: state.vehicleEvents.filter(vehicleEvent => vehicleEvent._id !== id),
        queueDeleteVehicleEvent: state.queueDeleteVehicleEvent.filter(item => item !== id),
      };
    },
    deleteVehicleEventFailure: (state, action: PayloadAction<DeleteVehicleEventFailure>) => {
      const { id } = action.payload;
      return {
        ...state,
        queueDeleteVehicleEvent: state.queueDeleteVehicleEvent.filter(item => item !== id),
      };
    },
  },
});

export const vehicleEventsActions = vehicleEventsSlice.actions;
export const vehicleEventsReducer = vehicleEventsSlice.reducer;
