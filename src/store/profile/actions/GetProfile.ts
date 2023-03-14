import { Profile } from 'models/Profile';

export interface GetProfileRequest {}

export interface GetProfileSuccess {
  profile: Profile;
}

export interface GetProfileFailure {}
