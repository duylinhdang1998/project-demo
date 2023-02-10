import { authReducer } from './auth/authSlice';
import { contentManagerReducer } from './contentManager/contentManagerSlice';
import { officesManagerReducer } from './officesManager/officesManagerSlice';
import { packageSettingsReducer } from './packageSettings/packageSettingsSlice';
import { subscriptionsReducer } from './subscriptions/subscriptionsSlice';

const reducers = {
  auth: authReducer,
  officesManager: officesManagerReducer,
  packageSettings: packageSettingsReducer,
  subscriptions: subscriptionsReducer,
  contentManager: contentManagerReducer,
};

export default reducers;
