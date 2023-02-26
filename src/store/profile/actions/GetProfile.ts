import { Profile } from 'models/Profile';
import { GetProfile } from 'services/Company/getProfile';

export type GetProfileRequest = GetProfile;

export interface GetProfileSuccess {
  profile: Profile;
}

export interface GetProfileFailure {}
