import { UserInfo } from 'models/UserInfo';

export interface LoginRequest {
  email: string;
  password: string;
  onSuccess: () => void;
  onFailure: () => void;
}

export interface LoginSuccess {
  token: string;
  role: UserInfo['role'];
}

export interface LoginFailure {}
