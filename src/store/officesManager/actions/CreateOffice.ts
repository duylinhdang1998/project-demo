import { Office } from 'services/models/Office';
import { CreateOffice } from 'services/OfficesManager/Company/createOffice';

export interface CreateOfficeRequest {
  data: CreateOffice;
  onSuccess: () => void;
  onFailure: () => void;
}

export interface CreateOfficeSuccess {
  data: Office;
}

export interface CreateOfficeFailure {}
