import { authReducer } from './auth/authSlice';
import { contentManagerReducer } from './contentManager/contentManagerSlice';
import { officesManagerReducer } from './officesManager/officesManagerSlice';
import packageSaleReducer from './packageSales/packageSalesSlice';
import { packageSettingsReducer } from './packageSettings/packageSettingsSlice';
import { passengersReducer } from './passengers/passengersSlice';
import { profileReducer } from './profile/profileSlice';
import { reportsReducer } from './report/reportSlice';
import { routesReducer } from './routes/routesSlice';
import { staffsReducer } from './staffs/staffsSlice';
import { subscriptionsReducer } from './subscriptions/subscriptionsSlice';
import { ticketSalesReducer } from './ticketSales/ticketSalesSlice';
import { vehicleEventsReducer } from './vehicles/vehicleEventsSlice';
import { vehiclesReducer } from './vehicles/vehiclesSlice';

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
  reports: reportsReducer,
};

export default reducers;
