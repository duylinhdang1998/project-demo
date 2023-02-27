import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Searcher } from 'services/@types/SearchParams';
import { Vehicle } from 'services/models/Vehicle';
import { CreateVehicleFailure, CreateVehicleRequest, CreateVehicleSuccess } from './actions/vehicles/CreateVehicle';
import { DeleteVehicleFailure, DeleteVehicleRequest, DeleteVehicleSuccess } from './actions/vehicles/DeleteVehicle';
import { GetVehicleFailure, GetVehicleRequest, GetVehicleSuccess } from './actions/vehicles/GetVehicle';
import { GetVehiclesFailure, GetVehiclesRequest, GetVehiclesSuccess } from './actions/vehicles/GetVehicles';
import { UpdateVehicleFailure, UpdateVehicleRequest, UpdateVehicleSuccess } from './actions/vehicles/UpdateVehicle';

interface VehiclesManagerState {
  statusGetVehicles: Status;
  statusGetVehicle: Status;
  statusCreateVehicle: Status;
  queueUpdateVehicle: Vehicle['_id'][];
  queueDeleteVehicle: Vehicle['_id'][];
  vehicles: Vehicle[];
  currentPage: number;
  totalPages: number;
  totalRows: number;
  currentSearcher: Searcher<Vehicle>;
  vehicle: Vehicle | null;
  office?: any;
}

const initialState: VehiclesManagerState = {
  statusGetVehicle: 'idle',
  statusGetVehicles: 'idle',
  statusCreateVehicle: 'idle',
  queueDeleteVehicle: [],
  queueUpdateVehicle: [],
  vehicles: [],
  currentPage: 0,
  totalPages: 0,
  totalRows: 0,
  currentSearcher: {},
  vehicle: null,
};

const vehiclesSlice = createSlice({
  name: '@Vehicles',
  initialState,
  reducers: {
    /** <---------- read multiple ----------> */
    getVehiclesRequest: (state, action: PayloadAction<GetVehiclesRequest>) => {
      const { page, searcher } = action.payload;
      return {
        ...state,
        vehicles: [],
        statusGetVehicles: 'loading',
        currentPage: page,
        currentSearcher: searcher,
      };
    },
    getVehiclesSuccess: (state, action: PayloadAction<GetVehiclesSuccess>) => {
      const { data, totalPages, totalRows, page, searcher } = action.payload;
      return {
        ...state,
        vehicles: data,
        totalPages,
        totalRows,
        statusGetVehicles: 'success',
        currentPage: page,
        currentSearcher: searcher,
      };
    },
    getVehiclesFailure: (state, _action: PayloadAction<GetVehiclesFailure>) => {
      return {
        ...state,
        statusGetVehicles: 'failure',
      };
    },
    /** <---------- read 1 ----------> */
    getVehicleRequest: (state, _action: PayloadAction<GetVehicleRequest>) => {
      return {
        ...state,
        statusGetVehicle: 'loading',
        vehicle: null,
      };
    },
    getVehicleSuccess: (state, action: PayloadAction<GetVehicleSuccess>) => {
      const { data } = action.payload;
      return {
        ...state,
        statusGetVehicle: 'success',
        vehicle: data,
      };
    },
    getVehicleFailure: (state, _action: PayloadAction<GetVehicleFailure>) => {
      return {
        ...state,
        statusGetVehicle: 'failure',
        vehicle: null,
      };
    },
    /** <---------- create ----------> */
    createVehicleRequest: (state, _action: PayloadAction<CreateVehicleRequest>) => {
      return {
        ...state,
        statusCreateVehicle: 'loading',
      };
    },
    createVehicleSuccess: (state, action: PayloadAction<CreateVehicleSuccess>) => {
      const { data } = action.payload;
      return {
        ...state,
        statusCreateVehicle: 'success',
        vehicles: state.vehicles.concat(data),
      };
    },
    createVehicleFailure: (state, _action: PayloadAction<CreateVehicleFailure>) => {
      return {
        ...state,
        statusCreateVehicle: 'failure',
      };
    },
    /** <---------- update ----------> */
    updateVehicleRequest: (state, action: PayloadAction<UpdateVehicleRequest>) => {
      const { id } = action.payload;
      return {
        ...state,
        queueUpdateVehicle: state.queueUpdateVehicle.concat(id),
      };
    },
    updateVehicleSuccess: (state, action: PayloadAction<UpdateVehicleSuccess>) => {
      const { data } = action.payload;
      return {
        ...state,
        queueUpdateVehicle: state.queueUpdateVehicle.filter(id => id !== data._id),
        vehicles: state.vehicles.map(vehicle => {
          if (vehicle._id === data._id) {
            return data;
          }
          return vehicle;
        }),
      };
    },
    updateVehicleFailure: (state, action: PayloadAction<UpdateVehicleFailure>) => {
      const { id } = action.payload;
      return {
        ...state,
        queueUpdateVehicle: state.queueUpdateVehicle.filter(item => id !== item),
      };
    },
    deleteVehicleRequest: (state, action: PayloadAction<DeleteVehicleRequest>) => {
      const { id } = action.payload;
      return {
        ...state,
        queueDeleteVehicle: state.queueDeleteVehicle.concat(id),
      };
    },
    deleteVehicleSuccess: (state, action: PayloadAction<DeleteVehicleSuccess>) => {
      const { id } = action.payload;
      return {
        ...state,
        vehicles: state.vehicles.filter(vehicle => vehicle._id !== id),
        queueDeleteVehicle: state.queueDeleteVehicle.filter(item => item !== id),
      };
    },
    deleteVehicleFailure: (state, action: PayloadAction<DeleteVehicleFailure>) => {
      const { id } = action.payload;
      return {
        ...state,
        queueDeleteVehicle: state.queueDeleteVehicle.filter(item => item !== id),
      };
    },
  },
});

export const vehiclesActions = vehiclesSlice.actions;
export const vehiclesReducer = vehiclesSlice.reducer;
