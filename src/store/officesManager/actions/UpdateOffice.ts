import { Office } from 'services/models/Office';
import { UpdateOffice } from 'services/OfficesManager/Company/updateOffice';

export type UpdateOfficeRequest = UpdateOffice & {
  targetOffice: Office;
  onSuccess: () => void;
  onFailure: OnFailureWithMessageOfStatusCode;
};

export interface UpdateOfficeSuccess {
  data: Office;
}

export interface UpdateOfficeFailure {
  id: Office['_id'];
}
