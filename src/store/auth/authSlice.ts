import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "models/UserInfo";
import { LoginFailure, LoginRequest, LoginSuccess } from "./actions/Login";
import { Logout } from "./actions/Logout";

interface AuthState {
  token: string;
  isLoggedIn: boolean;
  userInfo?: UserInfo;
}

const initialState: AuthState = {
  token: "",
  isLoggedIn: false,
  userInfo: {},
};

const authSlice = createSlice({
  name: "@Auth",
  initialState,
  reducers: {
    loginRequest: (state, _action: PayloadAction<LoginRequest>) => {
      return state;
    },
    loginSuccess: (state, action: PayloadAction<LoginSuccess>) => {
      const { role, token } = action.payload;
      return {
        ...state,
        isLoggedIn: true,
        token,
        userInfo: { role },
      };
    },
    loginFailure: (state, _action: PayloadAction<LoginFailure>) => {
      return state;
    },
    logout: (_state, _action: PayloadAction<Logout>) => {
      return initialState;
    },
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
