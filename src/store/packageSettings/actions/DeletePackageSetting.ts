import { PackageSetting } from 'services/models/PackageSetting';
import { DeletePackageSetting } from 'services/PackageSettings/Company/deletePackageSetting';

export type DeletePackageSettingRequest = DeletePackageSetting & {
  onSuccess: () => void;
  onFailure: () => void;
};

export interface DeletePackageSettingSuccess {
  id: PackageSetting['_id'];
}

export interface DeletePackageSettingFailure {
  id: PackageSetting['_id'];
}
