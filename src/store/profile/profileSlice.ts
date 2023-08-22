import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile } from 'models/Profile';
import { UpdateProfileFailure, UpdateProfileRequest, UpdateProfileSuccess } from '../profile/actions/UpdateProfile';
import { GetProfileFailure, GetProfileRequest, GetProfileSuccess } from './actions/GetProfile';

interface ProfileState {
  statusGetProfile: Status;
  statusUpdateProfile: Status;
  profile: Profile | null;
}

const initialState: ProfileState = {
  statusGetProfile: 'idle',
  statusUpdateProfile: 'idle',
  profile: null,
};

const profileSlice = createSlice({
  name: '@Profile',
  initialState,
  reducers: {
    getProfileRequest: (state, _action: PayloadAction<GetProfileRequest>) => {
      return {
        ...state,
        profile: null,
        statusGetProfile: 'loading',
      };
    },
    getProfileSuccess: (state, action: PayloadAction<GetProfileSuccess>) => {
      const { profile } = action.payload;
      return {
        ...state,
        statusGetProfile: 'success',
        profile,
      };
    },
    getProfileFailure: (state, _action: PayloadAction<GetProfileFailure>) => {
      return {
        ...state,
        statusGetProfile: 'failure',
      };
    },
    updateProfileRequest: (state, _action: PayloadAction<UpdateProfileRequest>) => {
      return {
        ...state,
        statusUpdateProfile: 'loading',
      };
    },
    updateProfileSuccess: (state, action: PayloadAction<UpdateProfileSuccess>) => {
      const { data } = action.payload;
      return {
        ...state,
        statusUpdateProfile: 'success',
        profile: data,
      };
    },
    updateProfileFailure: (state, _action: PayloadAction<UpdateProfileFailure>) => {
      return {
        ...state,
        statusUpdateProfile: 'failure',
      };
    },
    setCurrencySetting: (state, action) => {
      // @ts-ignore
      state.profile = { ...state.profile, currency: action.payload };
    },
  },
});

export const profileActions = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
