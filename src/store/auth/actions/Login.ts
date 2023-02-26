import { Profile } from 'models/Profile';
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
  profile: Profile;
}

export interface LoginFailure {}
