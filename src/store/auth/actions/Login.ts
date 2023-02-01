import { UserInfo } from "models/UserInfo";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginSuccess {
  token: string;
  role: UserInfo["role"];
}

export interface LoginFailure {}
