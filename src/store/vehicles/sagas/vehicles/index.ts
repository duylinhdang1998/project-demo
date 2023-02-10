import { watchCreateVehicle } from './watchCreateVehicle';
import { watchDeleteVehicle } from './watchDeleteVehicle';
import { watchGetVehicle } from './watchGetVehicle';
import { watchGetVehicles } from './watchGetVehicles';
import { watchUpdateVehicle } from './watchUpdateVehicle';

export const vehiclesSagas = [watchGetVehicles, watchGetVehicle, watchCreateVehicle, watchDeleteVehicle, watchUpdateVehicle];
