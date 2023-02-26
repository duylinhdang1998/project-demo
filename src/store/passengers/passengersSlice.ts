import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Searcher } from 'services/@types/SearchParams';
import { Passenger } from 'services/models/Passenger';
import { GetPassengerFailure, GetPassengerRequest, GetPassengerSuccess } from './actions/GetPassenger';
import { GetPassengersFailure, GetPassengersRequest, GetPassengersSuccess } from './actions/GetPassengers';
import { UpdatePassengerFailure, UpdatePassengerRequest, UpdatePassengerSuccess } from './actions/UpdatePassenger';
import { UpdateStatusPassengerFailure, UpdateStatusPassengerRequest, UpdateStatusPassengerSuccess } from './actions/UpdateStatusPassenger';

interface PassengersState {
  statusGetPassengers: Status;
  statusGetPassenger: Status;
  queueUpdatePassenger: Passenger['_id'][];
  passengers: Passenger[];
  currentPage: number;
  totalPages: number;
  totalRows: number;
  currentSearcher: Searcher<Passenger>;
  passenger: Passenger | null;
}

const initialState: PassengersState = {
  statusGetPassenger: 'idle',
  statusGetPassengers: 'idle',
  queueUpdatePassenger: [],
  passengers: [],
  currentPage: 0,
  totalPages: 0,
  totalRows: 0,
  currentSearcher: {},
  passenger: null,
};

export const passengersSlice = createSlice({
  name: '@Passengers',
  initialState,
  reducers: {
    /** <---------- read multiple ----------> */
    getPassengersRequest: (state, action: PayloadAction<GetPassengersRequest>) => {
      const { page, searcher } = action.payload;
      return {
        ...state,
        statusGetPassengers: 'loading',
        currentPage: page,
        currentSearcher: searcher,
      };
    },
    getPassengersSuccess: (state, action: PayloadAction<GetPassengersSuccess>) => {
      const { data, totalPages, totalRows, page, searcher } = action.payload;
      return {
        ...state,
        passengers: data,
        totalPages,
        totalRows,
        statusGetPassengers: 'success',
        currentPage: page,
        currentSearcher: searcher,
      };
    },
    getPassengersFailure: (state, _action: PayloadAction<GetPassengersFailure>) => {
      return {
        ...state,
        statusGetPassengers: 'failure',
      };
    },
    /** <---------- read 1 ----------> */
    getPassengerRequest: (state, _action: PayloadAction<GetPassengerRequest>) => {
      return {
        ...state,
        statusGetPassenger: 'loading',
        passenger: null,
      };
    },
    getPassengerSuccess: (state, action: PayloadAction<GetPassengerSuccess>) => {
      const { data } = action.payload;
      return {
        ...state,
        statusGetPassenger: 'success',
        passenger: data,
      };
    },
    getPassengerFailure: (state, _action: PayloadAction<GetPassengerFailure>) => {
      return {
        ...state,
        statusGetPassenger: 'failure',
        passenger: null,
      };
    },
    /** <---------- update ----------> */
    updatePassengerRequest: (state, action: PayloadAction<UpdatePassengerRequest>) => {
      const { id } = action.payload;
      return {
        ...state,
        queueUpdatePassenger: state.queueUpdatePassenger.concat(id),
      };
    },
    updatePassengerSuccess: (state, action: PayloadAction<UpdatePassengerSuccess>) => {
      const { data } = action.payload;
      return {
        ...state,
        queueUpdatePassenger: state.queueUpdatePassenger.filter(id => id !== data._id),
        passengers: state.passengers.map(passenger => {
          if (passenger._id === data._id) {
            return data;
          }
          return passenger;
        }),
      };
    },
    updatePassengerFailure: (state, action: PayloadAction<UpdatePassengerFailure>) => {
      const { id } = action.payload;
      return {
        ...state,
        queueUpdatePassenger: state.queueUpdatePassenger.filter(item => id !== item),
      };
    },
    updateStatusPassengerRequest: (state, action: PayloadAction<UpdateStatusPassengerRequest>) => {
      const { id } = action.payload;
      return {
        ...state,
        queueUpdatePassenger: state.queueUpdatePassenger.concat(id),
      };
    },
    updateStatusPassengerSuccess: (state, action: PayloadAction<UpdateStatusPassengerSuccess>) => {
      const { data } = action.payload;
      return {
        ...state,
        queueUpdatePassenger: state.queueUpdatePassenger.filter(id => id !== data._id),
        passengers: state.passengers.map(passenger => {
          if (passenger._id === data._id) {
            return data;
          }
          return passenger;
        }),
      };
    },
    updateStatusPassengerFailure: (state, action: PayloadAction<UpdateStatusPassengerFailure>) => {
      const { id } = action.payload;
      return {
        ...state,
        queueUpdatePassenger: state.queueUpdatePassenger.filter(item => id !== item),
      };
    },
  },
});

export const passengersActions = passengersSlice.actions;
export const passengersReducer = passengersSlice.reducer;
