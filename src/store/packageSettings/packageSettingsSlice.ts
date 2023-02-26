import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Searcher } from 'services/@types/SearchParams';
import { PackageSetting } from 'services/models/PackageSetting';
import { CreatePackageSettingFailure, CreatePackageSettingRequest, CreatePackageSettingSuccess } from './actions/CreatePackageSetting';
import { DeletePackageSettingFailure, DeletePackageSettingRequest, DeletePackageSettingSuccess } from './actions/DeletePackageSetting';
import { GetPackageSettingFailure, GetPackageSettingRequest, GetPackageSettingSuccess } from './actions/GetPackageSetting';
import { GetPackageSettingsFailure, GetPackageSettingsRequest, GetPackageSettingsSuccess } from './actions/GetPackageSettings';
import { UpdatePackageSettingFailure, UpdatePackageSettingRequest, UpdatePackageSettingSuccess } from './actions/UpdatePackageSetting';

interface PackageSettingsState {
  statusGetPackageSettings: Status;
  statusGetPackageSetting: Status;
  statusCreatePackageSetting: Status;
  queueUpdatePackageSetting: PackageSetting['_id'][];
  queueDeletePackageSetting: PackageSetting['_id'][];
  packageSettings: PackageSetting[];
  currentPage: number;
  totalPages: number;
  totalRows: number;
  currentSearcher: Searcher<PackageSetting>;
  packageSetting: PackageSetting | null;
}

const initialState: PackageSettingsState = {
  statusGetPackageSetting: 'idle',
  statusGetPackageSettings: 'idle',
  statusCreatePackageSetting: 'idle',
  queueDeletePackageSetting: [],
  queueUpdatePackageSetting: [],
  packageSettings: [],
  currentPage: 0,
  totalPages: 0,
  totalRows: 0,
  currentSearcher: {},
  packageSetting: null,
};

export const packageSettingsSlice = createSlice({
  name: '@PackageSettings',
  initialState,
  reducers: {
    /** <---------- read multiple ----------> */
    getPackageSettingsRequest: (state, action: PayloadAction<GetPackageSettingsRequest>) => {
      const { page, searcher } = action.payload;
      return {
        ...state,
        packageSettings: [],
        statusGetPackageSettings: 'loading',
        currentPage: page,
        currentSearcher: searcher,
      };
    },
    getPackageSettingsSuccess: (state, action: PayloadAction<GetPackageSettingsSuccess>) => {
      const { data, totalPages, totalRows, page, searcher } = action.payload;
      return {
        ...state,
        packageSettings: data,
        totalPages,
        totalRows,
        statusGetPackageSettings: 'success',
        currentPage: page,
        currentSearcher: searcher,
      };
    },
    getPackageSettingsFailure: (state, _action: PayloadAction<GetPackageSettingsFailure>) => {
      return {
        ...state,
        statusGetPackageSettings: 'failure',
      };
    },
    /** <---------- read 1 ----------> */
    getPackageSettingRequest: (state, _action: PayloadAction<GetPackageSettingRequest>) => {
      return {
        ...state,
        statusGetPackageSetting: 'loading',
        packageSetting: null,
      };
    },
    getPackageSettingSuccess: (state, action: PayloadAction<GetPackageSettingSuccess>) => {
      const { data } = action.payload;
      return {
        ...state,
        statusGetPackageSetting: 'success',
        packageSetting: data,
      };
    },
    getPackageSettingFailure: (state, _action: PayloadAction<GetPackageSettingFailure>) => {
      return {
        ...state,
        statusGetPackageSetting: 'failure',
        packageSetting: null,
      };
    },
    /** <---------- create ----------> */
    createPackageSettingRequest: (state, _action: PayloadAction<CreatePackageSettingRequest>) => {
      return {
        ...state,
        statusCreatePackageSetting: 'loading',
      };
    },
    createPackageSettingSuccess: (state, action: PayloadAction<CreatePackageSettingSuccess>) => {
      const { data } = action.payload;
      return {
        ...state,
        statusCreatePackageSetting: 'success',
        packageSettings: state.packageSettings.concat(data),
      };
    },
    createPackageSettingFailure: (state, _action: PayloadAction<CreatePackageSettingFailure>) => {
      return {
        ...state,
        statusCreatePackageSetting: 'failure',
      };
    },
    /** <---------- update ----------> */
    updatePackageSettingRequest: (state, action: PayloadAction<UpdatePackageSettingRequest>) => {
      const { id } = action.payload;
      return {
        ...state,
        queueUpdatePackageSetting: state.queueUpdatePackageSetting.concat(id),
      };
    },
    updatePackageSettingSuccess: (state, action: PayloadAction<UpdatePackageSettingSuccess>) => {
      const { data } = action.payload;
      return {
        ...state,
        queueUpdatePackageSetting: state.queueUpdatePackageSetting.filter(id => id !== data._id),
        packageSettings: state.packageSettings.map(packageSetting => {
          if (packageSetting._id === data._id) {
            return data;
          }
          return packageSetting;
        }),
      };
    },
    updatePackageSettingFailure: (state, action: PayloadAction<UpdatePackageSettingFailure>) => {
      const { id } = action.payload;
      return {
        ...state,
        queueUpdatePackageSetting: state.queueUpdatePackageSetting.filter(item => id !== item),
      };
    },
    deletePackageSettingRequest: (state, action: PayloadAction<DeletePackageSettingRequest>) => {
      const { id } = action.payload;
      return {
        ...state,
        queueDeletePackageSetting: state.queueDeletePackageSetting.concat(id),
      };
    },
    deletePackageSettingSuccess: (state, action: PayloadAction<DeletePackageSettingSuccess>) => {
      const { id } = action.payload;
      return {
        ...state,
        packageSettings: state.packageSettings.filter(packageSetting => packageSetting._id !== id),
        queueDeletePackageSetting: state.queueDeletePackageSetting.filter(item => item !== id),
      };
    },
    deletePackageSettingFailure: (state, action: PayloadAction<DeletePackageSettingFailure>) => {
      const { id } = action.payload;
      return {
        ...state,
        queueDeletePackageSetting: state.queueDeletePackageSetting.filter(item => item !== id),
      };
    },
  },
});

export const packageSettingsActions = packageSettingsSlice.actions;
export const packageSettingsReducer = packageSettingsSlice.reducer;
