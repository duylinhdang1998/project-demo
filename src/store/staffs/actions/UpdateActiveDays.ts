import { Staff } from 'services/models/Staff';
import { CreatePresenceDay } from 'services/Staff/Company/createPresenceDay';

export interface UpdateActiveDaysRequest {
  data: CreatePresenceDay;
  onSuccess: () => void;
  onFailure: () => void;
}

export interface UpdateActiveDaysSuccess {
  data: Staff;
}

export interface UpdateActiveDaysFailure {}
