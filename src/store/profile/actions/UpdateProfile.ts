import { Profile } from 'models/Profile';
import { UpdateProfile } from 'services/Company/updateProfile';

export interface UpdateProfileRequest {
  data: UpdateProfile;
  targetProfile: Profile;
  onSuccess: () => void;
  onFailure: OnFailureWithMessageOfStatusCode;
}

export interface UpdateProfileSuccess {
  data: Profile;
}

export interface UpdateProfileFailure {}
