import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';
import { MasterResponse } from './MasterResponse';

export type MasterDataState = {
  masterData: MasterResponse | null;
  loadingMasterData: boolean;
  masterDataError: boolean;
};

const initialState: MasterDataState = {
    masterData: null,
    loadingMasterData: false,
    masterDataError: false,
};

export const fetchMasterData = createAsyncThunk<
  {masterData: MasterResponse | null},
  {uri: any}
>('fetchMasterData', async ({uri}) => {
  const response = await apiInterface.fetchMasterData(uri);
  
  if (response.kind == 'success') {
    return {
        masterData: response.body ?? null,
    };
  } else {
    throw 'Error fetching customers';
  }
});

const MasterDataSlice = createSlice({
  name: 'MasterData',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchMasterData.pending, state => {
        state.loadingMasterData = true;
        state.masterDataError = false;
        state.masterData = initialState.masterData;
      })
      .addCase(fetchMasterData.fulfilled, (state, action) => {
        state.masterData = initialState.masterData;
        state.masterData = action.payload.masterData;
        state.masterDataError = false;
        state.loadingMasterData = false;
      })
      .addCase(fetchMasterData.rejected, state => {
        state.masterDataError = true;
        state.loadingMasterData = false;
        state.masterData = initialState.masterData;
      });
  },
});

export default MasterDataSlice.reducer;
