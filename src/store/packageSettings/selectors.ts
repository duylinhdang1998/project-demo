import { RootState } from 'store/configureStore';

export const selectPackageSettings = (state: RootState) => state.packageSettings;
