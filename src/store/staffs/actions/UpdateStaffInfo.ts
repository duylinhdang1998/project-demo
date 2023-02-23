import { Staff } from 'services/models/Staff';
import { UpdateStaffInfo } from 'services/Staff/Company/updateStaff';

export type UpdateStaffInfoRequest = UpdateStaffInfo & {
  onSuccess: () => void;
  onFailure: () => void;
};

export interface UpdateStaffInfoSuccess {
  data: Staff;
}

export interface UpdateStaffInfoFailure {}
