import { Office } from 'services/models/Office';
import { UpdateOffice } from 'services/OfficesManager/Company/updateOffice';

export type UpdateOfficeRequest = UpdateOffice & {
  onSuccess: () => void;
  onFailure: OnFailureWithMessageOfStatusCode;
};

export interface UpdateOfficeSuccess {
  data: Office;
}

export interface UpdateOfficeFailure {
  id: Office['_id'];
}
