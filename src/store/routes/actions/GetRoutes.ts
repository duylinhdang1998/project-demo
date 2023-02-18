import { Route } from 'services/models/Route';
import { GetRoutes } from 'services/Route/Company/getRoutes';

export type GetRoutesRequest = GetRoutes & {};

export interface GetRoutesSuccess {
  data: Route[];
  totalPages: number;
  totalRows: number;
  page: GetRoutes['page'];
  searcher: GetRoutes['searcher'];
}

export interface GetRoutesFailure {}
