import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PackageSalePayload } from 'services/PackageSales/packageSales';

interface PackageSaleState {
  data: Omit<PackageSalePayload, 'merchandises'> & {
    merchandise?: {
      title: {
        value: string;
        label: string;
      };
      weight: string;
      price: string;
    }[];
  };
}

const initialState: PackageSaleState = {
  data: {},
};

const packageSaleSlice = createSlice({
  name: 'packageSales',
  initialState,
  reducers: {
    setOrderInfomation: (state, action: PayloadAction<PackageSalePayload>) => {
      state.data = { ...state.data, ...action.payload };
    },
    resetOrderInformation: state => {
      state.data = {};
    },
  },
});

export const { setOrderInfomation, resetOrderInformation } = packageSaleSlice.actions;

const packageSaleReducer = packageSaleSlice.reducer;
export default packageSaleReducer;
