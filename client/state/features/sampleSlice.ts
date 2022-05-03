import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SampleItem = {
  endpoint: string,
}

type InitialState = SampleItem[];

const initialState: InitialState = [];

export const sampleSlice = createSlice({
  name: "sampleState",
  initialState,
  reducers: {
    sampleReducer: (state, action: PayloadAction<SampleItem>) => {
      state.unshift(action.payload);
    },
  }
})

export const { sampleReducer } = sampleSlice.actions;

export default sampleSlice.reducer;