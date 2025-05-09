import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';
import { RequestAppointmentResponse } from './RequestAppointmentResponse';

export type RequestAppointmentState = {
    requestAppointmentData: RequestAppointmentResponse | null;
    loadingRequestAppointment: boolean;
    requestAppointmentError: boolean;
};

const initialState: RequestAppointmentState = {
    requestAppointmentData: null,
    loadingRequestAppointment: false,
    requestAppointmentError: false,
};

export const requestAppointment = createAsyncThunk<
  {requestAppointmentData: RequestAppointmentResponse | null},
  {uri: any}
>('requestAppointment', async ({uri}) => {
    const response = await apiInterface.requestAppointment( uri);
    if (response.kind == 'success') {
      return {
        requestAppointmentData: response.body ?? null,
      };
    } else {
      throw 'Error while creating';
    }
});

const RequestAppointmentSlice = createSlice({
  name: 'RequestAppointment',
  initialState: initialState,
  reducers: {
    requestAppointmentReset: state => {
      return initialState;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(requestAppointment.pending, state => {
        state.requestAppointmentData = initialState.requestAppointmentData;
        state.loadingRequestAppointment = true;
        state.requestAppointmentError = false;
      })
      .addCase(requestAppointment.fulfilled, (state, action) => {
        state.requestAppointmentData = action.payload.requestAppointmentData;
        state.requestAppointmentError = false;
        state.loadingRequestAppointment = false;
      })
      .addCase(requestAppointment.rejected, state => {
        state.requestAppointmentError = true;
        state.loadingRequestAppointment = false;
        state.requestAppointmentData = initialState.requestAppointmentData;
      });
  },
});

export const {requestAppointmentReset} = RequestAppointmentSlice.actions;
export default RequestAppointmentSlice.reducer;

