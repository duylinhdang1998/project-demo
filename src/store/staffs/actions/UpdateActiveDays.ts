import { Staff } from 'services/models/Staff';
import { CreatePresenceDay } from 'services/Staff/Company/createPresenceDay';

export interface UpdateActiveDaysRequest {
  data: CreatePresenceDay;
  onSuccess: () => void;
  onFailure: OnFailureWithMessageOfStatusCode;
}

export interface UpdateActiveDaysSuccess {
  data: Staff;
}

export interface UpdateActiveDaysFailure {}
