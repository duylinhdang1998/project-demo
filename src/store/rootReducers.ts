import { authReducer } from './auth/authSlice';
import { officesManagerReducer } from './officesManager/officesManagerSlice';
import { packageSettingsReducer } from './packageSettings/packageSettingsSlice';

const reducers = {
  auth: authReducer,
  officesManager: officesManagerReducer,
  packageSettings: packageSettingsReducer,
};

export default reducers;
