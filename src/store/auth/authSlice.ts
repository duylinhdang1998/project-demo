import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile } from 'models/Profile';
import { UserInfo } from 'models/UserInfo';
import { LoginFailure, LoginRequest, LoginSuccess } from './actions/Login';
import { Logout } from './actions/Logout';
import { UpdateProfileFailure, UpdateProfileRequest, UpdateProfileSuccess } from './actions/UpdateProfile';

interface AuthState {
  statusLogin: Status;
  statusUpdateProfile: Status;
  token: string;
  isLoggedIn: boolean;
  userInfo?: UserInfo;
  profile: Profile | null;
}

const initialState: AuthState = {
  statusLogin: 'idle',
  statusUpdateProfile: 'idle',
  token: '',
  isLoggedIn: false,
  userInfo: {},
  profile: null,
};

const authSlice = createSlice({
  name: '@Auth',
  initialState,
  reducers: {
    loginRequest: (state, _action: PayloadAction<LoginRequest>) => {
      return {
        ...state,
        statusLogin: 'loading',
      };
    },
    loginSuccess: (state, action: PayloadAction<LoginSuccess>) => {
      const { role, token, profile } = action.payload;
      return {
        ...state,
        isLoggedIn: true,
        token,
        userInfo: { role },
        statusLogin: 'success',
        profile,
      };
    },
    loginFailure: (state, _action: PayloadAction<LoginFailure>) => {
      return {
        ...state,
        statusLogin: 'failure',
      };
    },
    logout: (_state, _action: PayloadAction<Logout>) => {
      return initialState;
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
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
