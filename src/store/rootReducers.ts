import { authReducer } from './auth/authSlice';
import { contentManagerReducer } from './contentManager/contentManagerSlice';
import { officesManagerReducer } from './officesManager/officesManagerSlice';
import { packageSettingsReducer } from './packageSettings/packageSettingsSlice';
import { profileReducer } from './profile/profileSlice';
import { passengersReducer } from './passengers/passengersSlice';
import { routesReducer } from './routes/routesSlice';
import { staffsReducer } from './staffs/staffsSlice';
import { subscriptionsReducer } from './subscriptions/subscriptionsSlice';
import { vehicleEventsReducer } from './vehicles/vehicleEventsSlice';
import { vehiclesReducer } from './vehicles/vehiclesSlice';
import { ticketSalesReducer } from './ticketSales/ticketSalesSlice';
import packageSaleReducer from './packageSales/packageSalesSlice';

const reducers = {
  auth: authReducer,
  officesManager: officesManagerReducer,
  packageSettings: packageSettingsReducer,
  subscriptions: subscriptionsReducer,
  contentManager: contentManagerReducer,
  vehicles: vehiclesReducer,
  vehicleEvents: vehicleEventsReducer,
  routes: routesReducer,
  staffs: staffsReducer,
  profile: profileReducer,
  passengers: passengersReducer,
  ticketSales: ticketSalesReducer,
  packageSales: packageSaleReducer,
};

export default reducers;
