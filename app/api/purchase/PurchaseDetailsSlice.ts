import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';
import { PurchaseDetailsResponse } from './PurchaseDetailsResponse';

export type PurchaseDetailsState = {
  details: PurchaseDetailsResponse | null;
  loadingDetails: boolean;
  detailsError: boolean;
};

const initialState: PurchaseDetailsState = {
  details: null,
  loadingDetails: false,
  detailsError: false,
};

export const fetchPurchaseDetails = createAsyncThunk<
  { details: PurchaseDetailsResponse | null },
  { uri: any }
>('fetchPurchaseDetails', async ({ uri }) => {
  const response = await apiInterface.fetchPurchaseDetails(uri);
  if (response.kind === 'success') {
    return {
      details: response.body ?? null,
    };
  } else {
    throw 'Error fetching purchase details';
  }
});

const PurchaseDetailsSlice = createSlice({
  name: 'PurchaseDetails',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPurchaseDetails.pending, state => {
        state.loadingDetails = true;
        state.detailsError = false;
        state.details = initialState.details;
      })
      .addCase(fetchPurchaseDetails.fulfilled, (state, action) => {
        state.details = action.payload.details;
        state.detailsError = false;
        state.loadingDetails = false;
      })
      .addCase(fetchPurchaseDetails.rejected, state => {
        state.detailsError = true;
        state.loadingDetails = false;
        state.details = initialState.details;
      });
  },
});

export default PurchaseDetailsSlice.reducer;
