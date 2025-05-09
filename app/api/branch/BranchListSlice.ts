import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';
import { BranchResponse } from './BranchResponse';

export type BranchListState = {
  branches: BranchResponse | null;
  loadingBranches: boolean;
  branchError: boolean;
};

const initialState: BranchListState = {
    branches: null,
    loadingBranches: false,
    branchError: false,
};

export const fetchBranchList = createAsyncThunk<
  {branches: BranchResponse | null},
  {uri: any}
>('fetchBranchList', async ({uri}) => {
  const response = await apiInterface.fetchBranchList(uri);
  

  if (response.kind == 'success') {
    return {
        branches: response.body ?? null,
    };
  } else {
    throw 'Error fetching customers';
  }
});

const BranchListSlice = createSlice({
  name: 'BranchList',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchBranchList.pending, state => {
        state.loadingBranches = true;
        state.branchError = false;
        state.branches = initialState.branches;
      })
      .addCase(fetchBranchList.fulfilled, (state, action) => {
        state.branches = initialState.branches;
        state.branches = action.payload.branches;
        state.branchError = false;
        state.loadingBranches = false;
      })
      .addCase(fetchBranchList.rejected, state => {
        state.branchError = true;
        state.loadingBranches = false;
        state.branches = initialState.branches;
      });
  },
});

export default BranchListSlice.reducer;
