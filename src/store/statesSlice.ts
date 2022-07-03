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
    setInitialState(state, action: PayloadAction<boolean>) {
      state.isStarted = false;
      state.onPause = false;
      state.isBreak = false;
      state.onBreakPause = false;
    },

    startTimer(state, action: PayloadAction<boolean>) {
      state.isStarted = action.payload;
      state.onPause = false;
      state.isBreak = false;
      state.onBreakPause = false;
    },

    pauseTimer(state, action: PayloadAction<boolean>) {
      state.isStarted = false;
      state.onPause = action.payload;
      state.isBreak = false;
      state.onBreakPause = false;
    },

    breakTimer(state, action: PayloadAction<boolean>) {
      state.isStarted = false;
      state.onPause = false;
      state.isBreak = action.payload;
      state.onBreakPause = false;
    },

    pauseBreakTimer(state, action: PayloadAction<boolean>) {
      state.isStarted = false;
      state.onPause = false;
      state.isBreak = false;
      state.onBreakPause = action.payload;
    },
  }
})

export const {
  setInitialState,
  startTimer,
  pauseTimer,
  breakTimer,
  pauseBreakTimer,
} = statesSlice.actions;

export default statesSlice.reducer;
