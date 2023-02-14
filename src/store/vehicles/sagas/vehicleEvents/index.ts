import { watchCreateVehicleEvent } from './watchCreateVehicleEvent';
import { watchDeleteVehicleEvent } from './watchDeleteVehicleEvent';
import { watchGetVehicleEvent } from './watchGetVehicleEvent';
import { watchGetVehicleEvents } from './watchGetVehicleEvents';
import { watchUpdateVehicleEvent } from './watchUpdateVehicleEvent';

export const vehicleEventsSagas = [
  watchCreateVehicleEvent,
  watchDeleteVehicleEvent,
  watchGetVehicleEvent,
  watchGetVehicleEvents,
  watchUpdateVehicleEvent,
];
