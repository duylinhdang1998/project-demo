import { PackageSetting } from 'services/models/PackageSetting';
import { GetPackageSettings } from 'services/PackageSettings/Company/getPackageSettings';

export type GetPackageSettingsRequest = GetPackageSettings & {};

export interface GetPackageSettingsSuccess {
  data: PackageSetting[];
  totalPages: number;
  totalRows: number;
  page: GetPackageSettings['page'];
  searcher: GetPackageSettings['searcher'];
}

export interface GetPackageSettingsFailure {}
