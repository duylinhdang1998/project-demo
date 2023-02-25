import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Searcher } from 'services/@types/SearchParams';
import { Staff } from 'services/models/Staff';
import { CreateStaffFailure, CreateStaffRequest, CreateStaffSuccess } from './actions/CreateStaff';
import { DeleteStaffFailure, DeleteStaffRequest, DeleteStaffSuccess } from './actions/DeleteStaff';
import { GetStaffFailure, GetStaffRequest, GetStaffSuccess } from './actions/GetStaff';
import { GetStaffsFailure, GetStaffsRequest, GetStaffsSuccess } from './actions/GetStaffs';
import { UpdateDayOffFailure, UpdateDayOffLocal, UpdateDayOffRequest, UpdateDayOffSuccess } from './actions/UpdateDayOff';
import { UpdateActiveDaysFailure, UpdateActiveDaysRequest, UpdateActiveDaysSuccess } from './actions/UpdateActiveDays';
import { UpdateStaffInfoFailure, UpdateStaffInfoRequest, UpdateStaffInfoSuccess } from './actions/UpdateStaffInfo';

interface StaffsManagerState {
  statusGetStaffs: Status;
  statusGetStaff: Status;
  statusCreateStaff: Status;
  statusUpdateStaffInfo: Status;
  statusUpdateDayOff: Status;
  statusUpdateDayActive: Status;
  queueDeleteStaff: Staff['_id'][];
  staffs: Staff[];
  currentPage: number;
  totalPages: number;
  totalRows: number;
  currentSearcher: Searcher<Staff>;
  staff: Staff | null;
}

const initialState: StaffsManagerState = {
  statusGetStaff: 'idle',
  statusGetStaffs: 'idle',
  statusCreateStaff: 'idle',
  statusUpdateStaffInfo: 'idle',
  statusUpdateDayActive: 'idle',
  statusUpdateDayOff: 'idle',
  queueDeleteStaff: [],
  staffs: [],
  currentPage: 0,
  totalPages: 0,
  totalRows: 0,
  currentSearcher: {},
  staff: null,
};

export const staffsSlice = createSlice({
  name: '@Staffs',
  initialState,
  reducers: {
    /** <---------- read multiple ----------> */
    getStaffsRequest: (state, action: PayloadAction<GetStaffsRequest>) => {
      const { page, searcher } = action.payload;
      return {
        ...state,
        statusGetStaffs: 'loading',
        currentPage: page,
        currentSearcher: searcher,
      };
    },
    getStaffsSuccess: (state, action: PayloadAction<GetStaffsSuccess>) => {
      const { data, totalPages, totalRows, page, searcher } = action.payload;
      return {
        ...state,
        staffs: data,
        totalPages,
        totalRows,
        statusGetStaffs: 'success',
        currentPage: page,
        currentSearcher: searcher,
      };
    },
    getStaffsFailure: (state, _action: PayloadAction<GetStaffsFailure>) => {
      return {
        ...state,
        statusGetStaffs: 'failure',
      };
    },
    /** <---------- read 1 ----------> */
    getStaffRequest: (state, _action: PayloadAction<GetStaffRequest>) => {
      return {
        ...state,
        statusGetStaff: 'loading',
        staff: null,
      };
    },
    getStaffSuccess: (state, action: PayloadAction<GetStaffSuccess>) => {
      const { data } = action.payload;
      return {
        ...state,
        statusGetStaff: 'success',
        staff: data,
      };
    },
    getStaffFailure: (state, _action: PayloadAction<GetStaffFailure>) => {
      return {
        ...state,
        statusGetStaff: 'failure',
        staff: null,
      };
    },

    /** <---------- create staff info ----------> */
    createStaffRequest: (state, _action: PayloadAction<CreateStaffRequest>) => {
      return {
        ...state,
        staff: null,
        statusCreateStaff: 'loading',
      };
    },
    createStaffSuccess: (state, action: PayloadAction<CreateStaffSuccess>) => {
      const { data } = action.payload;
      return {
        ...state,
        staff: data,
        statusCreateStaff: 'success',
      };
    },
    createStaffFailure: (state, _action: PayloadAction<CreateStaffFailure>) => {
      return {
        ...state,
        staff: null,
        statusCreateStaff: 'failure',
      };
    },

    /** <---------- update staff info ----------> */
    updateStaffInfoRequest: (state, _action: PayloadAction<UpdateStaffInfoRequest>) => {
      return {
        ...state,
        statusUpdateStaffInfo: 'loading',
      };
    },
    updateStaffInfoSuccess: (state, action: PayloadAction<UpdateStaffInfoSuccess>) => {
      const { data } = action.payload;
      return {
        ...state,
        staff: data,
        statusUpdateStaffInfo: 'success',
      };
    },
    updateStaffInfoFailure: (state, _action: PayloadAction<UpdateStaffInfoFailure>) => {
      return {
        ...state,
        statusUpdateStaffInfo: 'failure',
      };
    },

    /** <---------- update presence days ----------> */
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
        staff: data,
        statusUpdateDayActive: 'success',
      };
    },
    updateActiveDaysFailure: (state, _action: PayloadAction<UpdateActiveDaysFailure>) => {
      return {
        ...state,
        statusUpdateDayActive: 'failure',
      };
    },

    /** <---------- create day off ----------> */
    updateDayOffLocal: (state, action: PayloadAction<UpdateDayOffLocal>) => {
      const { dayOff } = action.payload;
      if (state.staff) {
        return {
          ...state,
          staff: {
            ...state.staff,
            dayOff,
          },
        };
      }
      return state;
    },
    updateDayOffRequest: (state, _action: PayloadAction<UpdateDayOffRequest>) => {
      return {
        ...state,
        statusUpdateDayOff: 'loading',
      };
    },
    updateDayOffSuccess: (state, action: PayloadAction<UpdateDayOffSuccess>) => {
      const { data } = action.payload;
      return {
        ...state,
        staff: data,
        statusUpdateDayOff: 'success',
      };
    },
    updateDayOffFailure: (state, _action: PayloadAction<UpdateDayOffFailure>) => {
      return {
        ...state,
        statusUpdateDayOff: 'failure',
      };
    },

    /** <---------- delete staff ----------> */
    deleteStaffRequest: (state, action: PayloadAction<DeleteStaffRequest>) => {
      const { id } = action.payload;
      return {
        ...state,
        queueDeleteStaff: state.queueDeleteStaff.concat(id),
      };
    },
    deleteStaffSuccess: (state, action: PayloadAction<DeleteStaffSuccess>) => {
      const { id } = action.payload;
      return {
        ...state,
        staffs: state.staffs.filter(office => office._id !== id),
        queueDeleteStaff: state.queueDeleteStaff.filter(item => item !== id),
      };
    },
    deleteStaffFailure: (state, action: PayloadAction<DeleteStaffFailure>) => {
      const { id } = action.payload;
      return {
        ...state,
        queueDeleteStaff: state.queueDeleteStaff.filter(item => item !== id),
      };
    },
  },
});

export const staffsActions = staffsSlice.actions;
export const staffsReducer = staffsSlice.reducer;
