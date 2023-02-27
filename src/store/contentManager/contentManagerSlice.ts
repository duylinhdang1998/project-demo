import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Content } from 'services/models/Content';
import { GetContentFailure, GetContentRequest, GetContentSuccess } from './actions/GetContent';
import { UpdateContentFailure, UpdateContentRequest, UpdateContentSuccess } from './actions/UpdateContent';

interface ContentManagerState {
  statusGetContent: Status;
  statusUpdateContent: Status;
  content: Content | null;
}

const initialState: ContentManagerState = {
  statusGetContent: 'idle',
  statusUpdateContent: 'idle',
  content: null,
};

const contentManagerSlice = createSlice({
  name: '@ContentManager',
  initialState,
  reducers: {
    getContentRequest: (state, _action: PayloadAction<GetContentRequest>) => {
      return {
        ...state,
        content: null,
        statusGetContent: 'loading',
      };
    },
    getContentSuccess: (state, action: PayloadAction<GetContentSuccess>) => {
      const { data } = action.payload;
      return {
        ...state,
        statusGetContent: 'success',
        content: data,
      };
    },
    getContentFailure: (state, _action: PayloadAction<GetContentFailure>) => {
      return {
        ...state,
        statusGetContent: 'failure',
      };
    },
    updateContentRequest: (state, _action: PayloadAction<UpdateContentRequest>) => {
      return {
        ...state,
        statusUpdateContent: 'loading',
      };
    },
    updateContentSuccess: (state, action: PayloadAction<UpdateContentSuccess>) => {
      const { data } = action.payload;
      return {
        ...state,
        statusUpdateContent: 'success',
        content: data,
      };
    },
    updateContentFailure: (state, _action: PayloadAction<UpdateContentFailure>) => {
      return {
        ...state,
        statusUpdateContent: 'failure',
      };
    },
  },
});

export const contentManagerActions = contentManagerSlice.actions;
export const contentManagerReducer = contentManagerSlice.reducer;
