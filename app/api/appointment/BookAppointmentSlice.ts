import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';
import { BookAppointmentResponse } from './BookAppointmentResponse';

export type BookAppointmentState = {
    bookAppointmentData: BookAppointmentResponse | null;
    loadingBookAppointment: boolean;
    bookAppointmentError: boolean;
};

const initialState: BookAppointmentState = {
    bookAppointmentData: null,
    loadingBookAppointment: false,
    bookAppointmentError: false,
};

export const bookAppointment = createAsyncThunk<
  {bookAppointmentData: BookAppointmentResponse | null},
  {uri: any}
>('bookAppointment', async ({uri}) => {
    const response = await apiInterface.bookAppointment(uri);
    if (response.kind == 'success') {
      return {
        bookAppointmentData: response.body ?? null,
      };
    } else {
      throw 'Error while creating';
    }
});

const BookAppointmentSlice = createSlice({
  name: 'BookAppointment',
  initialState: initialState,
  reducers: {
    bookAppointmentReset: state => {
      return initialState;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(bookAppointment.pending, state => {
        state.bookAppointmentData = initialState.bookAppointmentData;
        state.loadingBookAppointment = true;
        state.bookAppointmentError = false;
      })
      .addCase(bookAppointment.fulfilled, (state, action) => {
        state.bookAppointmentData = action.payload.bookAppointmentData;
        state.bookAppointmentError = false;
        state.loadingBookAppointment = false;
      })
      .addCase(bookAppointment.rejected, state => {
        state.bookAppointmentError = true;
        state.loadingBookAppointment = false;
        state.bookAppointmentData = initialState.bookAppointmentData;
      });
  },
});

export const {bookAppointmentReset} = BookAppointmentSlice.actions;
export default BookAppointmentSlice.reducer;
