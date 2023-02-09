import { Office } from 'services/models/Office';
import { DeleteOffice } from 'services/OfficesManager/Company/deleteOffice';

export type DeleteOfficeRequest = DeleteOffice & {
  onSuccess: () => void;
  onFailure: () => void;
};

export interface DeleteOfficeSuccess {
  id: Office['_id'];
}

export interface DeleteOfficeFailure {
  id: Office['_id'];
}
