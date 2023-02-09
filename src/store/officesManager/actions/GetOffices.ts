import { Office } from 'services/models/Office';
import { GetOffices } from 'services/OfficesManager/Company/getOffices';

export type GetOfficesRequest = GetOffices & {};

export interface GetOfficesSuccess {
  data: Office[];
  totalPages: number;
  totalRows: number;
  page: GetOffices['page'];
  searcher: GetOffices['searcher'];
}

export interface GetOfficesFailure {}
