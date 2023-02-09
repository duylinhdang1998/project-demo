import { Office } from 'services/models/Office';
import { GetOffice } from 'services/OfficesManager/Company/getOffice';

export type GetOfficeRequest = GetOffice;

export interface GetOfficeSuccess {
  data: Office;
}

export interface GetOfficeFailure {}
