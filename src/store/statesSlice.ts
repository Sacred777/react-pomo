import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TStates = {
  isStarted: boolean;
  onPause: boolean;
  isBreak: boolean;
  onBreakPause: boolean;
}

const initialState: TStates = {
  isStarted: false,
  onPause: false,
  isBreak: false,
  onBreakPause: false,
};

const statesSlice = createSlice({
  name: 'states',
  initialState,
  reducers: {
    startTimer(state, action: PayloadAction<boolean>) {
      state.isStarted = action.payload;
    },

    pauseTimer(state, action: PayloadAction<boolean>) {
      state.onPause = action.payload;
    },

    breakTimer(state, action: PayloadAction<boolean>) {
      state.isBreak = action.payload;
    },

    pauseBreakTimer(state, action: PayloadAction<boolean>) {
      state.onBreakPause = action.payload;
    },
  }
})

export const {
  startTimer,
  pauseTimer,
  breakTimer,
  pauseBreakTimer,
} = statesSlice.actions;

export default statesSlice.reducer;
