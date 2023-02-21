import { Staff } from 'services/models/Staff';
import { DeleteStaff } from 'services/Staff/Company/deleteStaff';

export type DeleteStaffRequest = DeleteStaff & {
  onSuccess: () => void;
  onFailure: () => void;
};

export interface DeleteStaffSuccess {
  id: Staff['_id'];
}

export interface DeleteStaffFailure {
  id: Staff['_id'];
}
