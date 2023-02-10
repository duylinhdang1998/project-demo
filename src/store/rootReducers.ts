import { authReducer } from './auth/authSlice';
import { officesManagerReducer } from './officesManager/officesManagerSlice';
import { packageSettingsReducer } from './packageSettings/packageSettingsSlice';
import { subscriptionsReducer } from './subscriptions/subscriptionsSlice';

const reducers = {
  auth: authReducer,
  officesManager: officesManagerReducer,
  packageSettings: packageSettingsReducer,
  subscriptions: subscriptionsReducer,
};

export default reducers;
