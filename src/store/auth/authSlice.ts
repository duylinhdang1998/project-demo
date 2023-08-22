import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInfo } from 'models/UserInfo';
import { LoginFailure, LoginRequest, LoginSuccess } from './actions/Login';
import { Logout } from './actions/Logout';

interface AuthState {
  statusLogin: Status;
  token: string;
  isLoggedIn: boolean;
  userInfo?: UserInfo;
  userMainRoute: string;
}

const initialState: AuthState = {
  statusLogin: 'idle',
  token: '',
  isLoggedIn: false,
  userInfo: {},
  userMainRoute: '/admin',
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
      const { role, token } = action.payload;
      return {
        ...state,
        isLoggedIn: true,
        token,
        userInfo: { role },
        userMainRoute: role === 'admin' ? '/admin' : '/agent',
        statusLogin: 'success',
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
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
