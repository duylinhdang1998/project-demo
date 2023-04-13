import { UserInfo } from 'models/UserInfo';

export interface LoginRequest {
  email: string;
  password: string;
  onSuccess: () => void;
  onFailure: OnFailureWithMessageOfStatusCode;
}

export interface LoginSuccess {
  token: string;
  role: UserInfo['role'];
}

export interface LoginFailure {}
