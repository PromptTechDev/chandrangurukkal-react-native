import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';
import { PurchaseResponse } from './PurchaseResponse';

export type PurchaseListState = {
  purchases: PurchaseResponse | null;
  loadingPurchases: boolean;
  purchaseError: boolean;
};

const initialState: PurchaseListState = {
  purchases: null,
  loadingPurchases: false,
  purchaseError: false,
};

export const fetchPurchaseList = createAsyncThunk<
  { purchases: PurchaseResponse | null },
  { uri: any }
>('fetchPurchaseList', async ({ uri }) => {
  const response = await apiInterface.fetchPurchaseList(uri);

  if (response.kind === 'success') {
    return {
      purchases: response.body ?? null,
    };
  } else {
    throw 'Error fetching purchases';
  }
});

const PurchaseListSlice = createSlice({
  name: 'PurchaseList',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPurchaseList.pending, state => {
        state.loadingPurchases = true;
        state.purchaseError = false;
        state.purchases = initialState.purchases;
      })
      .addCase(fetchPurchaseList.fulfilled, (state, action) => {
        state.purchases = initialState.purchases;
        state.purchases = action.payload.purchases;
        state.purchaseError = false;
        state.loadingPurchases = false;
      })
      .addCase(fetchPurchaseList.rejected, state => {
        state.purchaseError = true;
        state.loadingPurchases = false;
        state.purchases = initialState.purchases;
      });
  },
});

export default PurchaseListSlice.reducer;
