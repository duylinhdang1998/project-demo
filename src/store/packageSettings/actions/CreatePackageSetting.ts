import { PackageSetting } from 'services/models/PackageSetting';
import { CreatePackageSetting } from 'services/PackageSetting/Company/createPackageSetting';

export interface CreatePackageSettingRequest {
  data: CreatePackageSetting;
  onSuccess: () => void;
  onFailure: OnFailureWithMessageOfStatusCode;
}

export interface CreatePackageSettingSuccess {
  data: PackageSetting;
}

export interface CreatePackageSettingFailure {}
