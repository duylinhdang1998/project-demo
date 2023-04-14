import { Staff } from 'services/models/Staff';
import { CreateStaff } from 'services/Staff/Company/createStaff';

export interface CreateStaffRequest {
  data: CreateStaff;
  onSuccess: () => void;
  onFailure: OnFailureWithMessageOfStatusCode;
}

export interface CreateStaffSuccess {
  data: Staff;
}

export interface CreateStaffFailure {}
