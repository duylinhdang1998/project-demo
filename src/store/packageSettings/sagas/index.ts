import { watchCreatePackageSetting } from './watchCreatePackageSetting';
import { watchDeletePackageSetting } from './watchDeletePackageSetting';
import { watchGetPackageSetting } from './watchGetPackageSetting';
import { watchGetPackageSettings } from './watchGetPackageSettings';
import { watchUpdatePackageSetting } from './watchUpdatePackageSetting';

export const packageSettingsSagas = [
  watchGetPackageSettings,
  watchGetPackageSetting,
  watchCreatePackageSetting,
  watchDeletePackageSetting,
  watchUpdatePackageSetting,
];
