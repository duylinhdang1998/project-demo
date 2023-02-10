import { Vehicle } from 'services/models/Vehicle';
import { GetVehicles } from 'services/Vehicle/Company/getVehicles';

export type GetVehiclesRequest = GetVehicles & {};

export interface GetVehiclesSuccess {
  data: Vehicle[];
  totalPages: number;
  totalRows: number;
  page: GetVehicles['page'];
  searcher: GetVehicles['searcher'];
}

export interface GetVehiclesFailure {}
