import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';
import { PackageResponse } from './PackageResponse';

export type PackageListState = {
  packages: PackageResponse | null;
  loadingPackages: boolean;
  packageError: boolean;
};

const initialState: PackageListState = {
    packages: null,
    loadingPackages: false,
    packageError: false,
};

export const fetchPackageList = createAsyncThunk<
  {packages: PackageResponse | null},
  {uri: any}
>('fetchPackageList', async ({ uri}) => {
  const response = await apiInterface.fetchPackageList( uri);
  

  if (response.kind == 'success') {
    return {
        packages: response.body ?? null,
    };
  } else {
    throw 'Error fetching packages';
  }
});

const PackageListSlice = createSlice({
  name: 'PackageList',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPackageList.pending, state => {
        state.loadingPackages = true;
        state.packageError = false;
        state.packages = initialState.packages;
      })
      .addCase(fetchPackageList.fulfilled, (state, action) => {
        state.packages = initialState.packages;
        state.packages = action.payload.packages;
        state.packageError = false;
        state.loadingPackages = false;
      })
      .addCase(fetchPackageList.rejected, state => {
        state.packageError = true;
        state.loadingPackages = false;
        state.packages = initialState.packages;
      });
  },
});

export default PackageListSlice.reducer;
