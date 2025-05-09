import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';
import { ServiceResponse } from './ServiceResponse';

export type ServiceListState = {
  services: ServiceResponse | null;
  loadingServices: boolean;
  serviceError: boolean;
};

const initialState: ServiceListState = {
    services: null,
    loadingServices: false,
    serviceError: false,
};

export const fetchServiceList = createAsyncThunk<
  {services: ServiceResponse | null},
  {uri: any}
>('fetchServiceList', async ({uri}) => {
  const response = await apiInterface.fetchServiceList(uri);
  

  if (response.kind == 'success') {
    return {
        services: response.body ?? null,
    };
  } else {
    throw 'Error fetching customers';
  }
});

const ServiceListSlice = createSlice({
  name: 'ServiceList',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchServiceList.pending, state => {
        state.loadingServices = true;
        state.serviceError = false;
        state.services = initialState.services;
      })
      .addCase(fetchServiceList.fulfilled, (state, action) => {
        state.services = initialState.services;
        state.services = action.payload.services;
        state.serviceError = false;
        state.loadingServices = false;
      })
      .addCase(fetchServiceList.rejected, state => {
        state.serviceError = true;
        state.loadingServices = false;
        state.services = initialState.services;
      });
  },
});

export default ServiceListSlice.reducer;
