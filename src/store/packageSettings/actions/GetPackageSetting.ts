import { PackageSetting } from 'services/models/PackageSetting';
import { GetPackageSetting } from 'services/PackageSettings/Company/getPackageSetting';

export type GetPackageSettingRequest = GetPackageSetting;

export interface GetPackageSettingSuccess {
  data: PackageSetting;
}

export interface GetPackageSettingFailure {}
