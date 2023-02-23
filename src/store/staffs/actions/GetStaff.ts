import { Staff } from 'services/models/Staff';
import { GetStaff } from 'services/Staff/Company/getStaff';

export type GetStaffRequest = GetStaff;

export interface GetStaffSuccess {
  data: Staff;
}

export interface GetStaffFailure {}
