import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as apiInterface from '../apiInterface';

export type ForgotPasswordResponse = {
  Error:   boolean;
  Message: string;
}

export type ForgotPasswordState = {
  ForgotPasswordData: ForgotPasswordResponse | null;
  loadingForgotPassword: boolean;
  ForgotPasswordError: boolean;
};

const initialState: ForgotPasswordState = {
    ForgotPasswordData: null,
    loadingForgotPassword: false,
    ForgotPasswordError: false,
};

export const createForgotPassword = createAsyncThunk<
  {ForgotPasswordData: ForgotPasswordResponse | null},
  {uri: any}
>('createForgotPassword', async ({uri}) => {
    const response = await apiInterface.createForgotPassword(uri);
    if (response.kind == 'success') {
      return {
        ForgotPasswordData: response.body ?? null,
      };
    } else {
      throw 'Error while creating';
    }
});

const ForgotPasswordSlice = createSlice({
  name: 'ForgotPassword',
  initialState: initialState,
  reducers: {
    reset: state => {
      return initialState;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(createForgotPassword.pending, state => {
        state.ForgotPasswordData = initialState.ForgotPasswordData;
        state.loadingForgotPassword = true;
        state.ForgotPasswordError = false;
      })
      .addCase(createForgotPassword.fulfilled, (state, action) => {
        state.ForgotPasswordData = action.payload.ForgotPasswordData;
        state.ForgotPasswordError = false;
        state.loadingForgotPassword = false;
      })
      .addCase(createForgotPassword.rejected, state => {
        state.ForgotPasswordError = true;
        state.loadingForgotPassword = false;
        state.ForgotPasswordData = initialState.ForgotPasswordData;
      });
  },
});

export const { reset } = ForgotPasswordSlice.actions;
export default ForgotPasswordSlice.reducer;
