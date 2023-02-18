import { authReducer } from './auth/authSlice';
import { contentManagerReducer } from './contentManager/contentManagerSlice';
import { officesManagerReducer } from './officesManager/officesManagerSlice';
import { packageSettingsReducer } from './packageSettings/packageSettingsSlice';
import { routesReducer } from './routes/routesSlice';
import { subscriptionsReducer } from './subscriptions/subscriptionsSlice';
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
};

export default reducers;
