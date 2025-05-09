import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';
import { AppointListResponse } from './AppointListResponse';

export type AppointmentListState = {
  appointments: AppointListResponse | null;
  loadingAppointments: boolean;
  appointmentError: boolean;
};

const initialState: AppointmentListState = {
  appointments: null,
  loadingAppointments: false,
  appointmentError: false,
};

export const fetchAppointmentList = createAsyncThunk<
  { appointments: AppointListResponse | null },
  { uri: any }
>('fetchAppointmentList', async ({ uri }) => {
  const response = await apiInterface.fetchAppointmentList(uri);

  if (response.kind == 'success') {
    return {
      appointments: response.body ?? null,
    };
  } else {
    throw 'Error fetching appointments';
  }
});

const AppointmentListSlice = createSlice({
  name: 'AppointmentList',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointmentList.pending, (state) => {
        state.loadingAppointments = true;
        state.appointmentError = false;
        state.appointments = initialState.appointments;
      })
      .addCase(fetchAppointmentList.fulfilled, (state, action) => {
        state.appointments = initialState.appointments;
        state.appointments = action.payload.appointments;
        state.appointmentError = false;
        state.loadingAppointments = false;
      })
      .addCase(fetchAppointmentList.rejected, (state) => {
        state.appointmentError = true;
        state.loadingAppointments = false;
        state.appointments = initialState.appointments;
      });
  },
});

export default AppointmentListSlice.reducer;
