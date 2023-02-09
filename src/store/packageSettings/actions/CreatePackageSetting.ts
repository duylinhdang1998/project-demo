import { PackageSetting } from 'services/models/PackageSetting';
import { CreatePackageSetting } from 'services/PackageSettings/Company/createPackageSetting';

export interface CreatePackageSettingRequest {
  data: CreatePackageSetting;
  onSuccess: () => void;
  onFailure: () => void;
}

export interface CreatePackageSettingSuccess {
  data: PackageSetting;
}

export interface CreatePackageSettingFailure {}
