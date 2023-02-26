import { Profile } from 'models/Profile';
import { UpdateProfile } from 'services/Company/updateProfile';

export interface UpdateProfileRequest {
  data: UpdateProfile;
  onSuccess: () => void;
  onFailure: () => void;
}

export interface UpdateProfileSuccess {
  data: Profile;
}

export interface UpdateProfileFailure {}
