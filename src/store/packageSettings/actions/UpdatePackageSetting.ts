import { PackageSetting } from 'services/models/PackageSetting';
import { UpdatePackageSetting } from 'services/PackageSetting/Company/updatePackageSetting';

export type UpdatePackageSettingRequest = UpdatePackageSetting & {
  onSuccess: () => void;
  onFailure: () => void;
};

export interface UpdatePackageSettingSuccess {
  data: PackageSetting;
}

export interface UpdatePackageSettingFailure {
  id: PackageSetting['_id'];
}
