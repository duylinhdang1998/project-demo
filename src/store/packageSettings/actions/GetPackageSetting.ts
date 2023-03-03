import { PackageSetting } from 'services/models/PackageSetting';
import { GetPackageSetting } from 'services/PackageSetting/Company/getPackageSetting';

export type GetPackageSettingRequest = GetPackageSetting;

export interface GetPackageSettingSuccess {
  data: PackageSetting;
}

export interface GetPackageSettingFailure {}
