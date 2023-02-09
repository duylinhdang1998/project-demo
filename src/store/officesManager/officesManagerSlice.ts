import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Searcher } from 'services/@types/SearchParams';
import { Office } from 'services/models/Office';
import { CreateOfficeFailure, CreateOfficeRequest, CreateOfficeSuccess } from './actions/CreateOffice';
import { DeleteOfficeFailure, DeleteOfficeRequest, DeleteOfficeSuccess } from './actions/DeleteOffice';
import { GetOfficeFailure, GetOfficeRequest, GetOfficeSuccess } from './actions/GetOffice';
import { GetOfficesFailure, GetOfficesRequest, GetOfficesSuccess } from './actions/GetOffices';
import { UpdateOfficeFailure, UpdateOfficeRequest, UpdateOfficeSuccess } from './actions/UpdateOffice';

interface OfficesManagerState {
  statusGetOffices: Status;
  statusGetOffice: Status;
  statusCreateOffice: Status;
  queueUpdateOffice: Office['_id'][];
  queueDeleteOffice: Office['_id'][];
  offices: Office[];
  currentPage: number;
  totalPages: number;
  totalRows: number;
  currentSearcher: Searcher<Office>;
  office: Office | null;
}

const initialState: OfficesManagerState = {
  statusGetOffice: 'idle',
  statusGetOffices: 'idle',
  statusCreateOffice: 'idle',
  queueDeleteOffice: [],
  queueUpdateOffice: [],
  offices: [],
  currentPage: 0,
  totalPages: 0,
  totalRows: 0,
  currentSearcher: {},
  office: null,
};

export const officesManagerSlice = createSlice({
  name: '@OfficesManager',
  initialState,
  reducers: {
    /** <---------- read multiple ----------> */
    getOfficesRequest: (state, action: PayloadAction<GetOfficesRequest>) => {
      const { page, searcher } = action.payload;
      return {
        ...state,
        statusGetOffices: 'loading',
        currentPage: page,
        currentSearcher: searcher,
      };
    },
    getOfficesSuccess: (state, action: PayloadAction<GetOfficesSuccess>) => {
      const { data, totalPages, totalRows, page, searcher } = action.payload;
      return {
        ...state,
        offices: data,
        totalPages,
        totalRows,
        statusGetOffices: 'success',
        currentPage: page,
        currentSearcher: searcher,
      };
    },
    getOfficesFailure: (state, _action: PayloadAction<GetOfficesFailure>) => {
      return {
        ...state,
        statusGetOffices: 'failure',
      };
    },
    /** <---------- read 1 ----------> */
    getOfficeRequest: (state, _action: PayloadAction<GetOfficeRequest>) => {
      return {
        ...state,
        statusGetOffice: 'loading',
        office: null,
      };
    },
    getOfficeSuccess: (state, action: PayloadAction<GetOfficeSuccess>) => {
      const { data } = action.payload;
      return {
        ...state,
        statusGetOffice: 'success',
        office: data,
      };
    },
    getOfficeFailure: (state, _action: PayloadAction<GetOfficeFailure>) => {
      return {
        ...state,
        statusGetOffice: 'failure',
        office: null,
      };
    },
    /** <---------- create ----------> */
    createOfficeRequest: (state, _action: PayloadAction<CreateOfficeRequest>) => {
      return {
        ...state,
        statusCreateOffice: 'loading',
      };
    },
    createOfficeSuccess: (state, action: PayloadAction<CreateOfficeSuccess>) => {
      const { data } = action.payload;
      return {
        ...state,
        statusCreateOffice: 'success',
        offices: state.offices.concat(data),
      };
    },
    createOfficeFailure: (state, _action: PayloadAction<CreateOfficeFailure>) => {
      return {
        ...state,
        statusCreateOffice: 'failure',
      };
    },
    /** <---------- update ----------> */
    updateOfficeRequest: (state, action: PayloadAction<UpdateOfficeRequest>) => {
      const { id } = action.payload;
      return {
        ...state,
        queueUpdateOffice: state.queueUpdateOffice.concat(id),
      };
    },
    updateOfficeSuccess: (state, action: PayloadAction<UpdateOfficeSuccess>) => {
      const { data } = action.payload;
      return {
        ...state,
        queueUpdateOffice: state.queueUpdateOffice.filter((id) => id !== data._id),
        offices: state.offices.map((office) => {
          if (office._id === data._id) {
            return data;
          }
          return office;
        }),
      };
    },
    updateOfficeFailure: (state, action: PayloadAction<UpdateOfficeFailure>) => {
      const { id } = action.payload;
      return {
        ...state,
        queueUpdateOffice: state.queueUpdateOffice.filter((item) => id !== item),
      };
    },
    deleteOfficeRequest: (state, action: PayloadAction<DeleteOfficeRequest>) => {
      const { id } = action.payload;
      return {
        ...state,
        queueDeleteOffice: state.queueDeleteOffice.concat(id),
      };
    },
    deleteOfficeSuccess: (state, action: PayloadAction<DeleteOfficeSuccess>) => {
      const { id } = action.payload;
      return {
        ...state,
        offices: state.offices.filter((office) => office._id !== id),
        queueDeleteOffice: state.queueDeleteOffice.filter((item) => item !== id),
      };
    },
    deleteOfficeFailure: (state, action: PayloadAction<DeleteOfficeFailure>) => {
      const { id } = action.payload;
      return {
        ...state,
        queueDeleteOffice: state.queueDeleteOffice.filter((item) => item !== id),
      };
    },
  },
});

export const officesManagerActions = officesManagerSlice.actions;
export const officesManagerReducer = officesManagerSlice.reducer;
