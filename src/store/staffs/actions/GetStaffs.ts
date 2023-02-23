import { Staff } from 'services/models/Staff';
import { GetStaffs } from 'services/Staff/Company/getStaffs';

export type GetStaffsRequest = GetStaffs & {};

export interface GetStaffsSuccess {
  data: Staff[];
  totalPages: number;
  totalRows: number;
  page: GetStaffs['page'];
  searcher: GetStaffs['searcher'];
}

export interface GetStaffsFailure {}
