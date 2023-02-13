import { RootState } from 'store/configureStore';

export const selectVehicles = (state: RootState) => state.vehicles;
export const selectVehicleEvents = (state: RootState) => state.vehicleEvents;
