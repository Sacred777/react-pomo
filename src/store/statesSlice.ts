import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const LS_STATES_KEY = 'states';

export type TStates = {
  isStarted: boolean;
  onPause: boolean;
  isBreak: boolean;
  onBreakPause: boolean;
}

const initialState: TStates = JSON.parse(localStorage.getItem(LS_STATES_KEY)
  ?? JSON.stringify({
    isStarted: false,
    onPause: false,
    isBreak: false,
    onBreakPause: false,
  }));

if (!localStorage.getItem(LS_STATES_KEY)) localStorage.setItem(LS_STATES_KEY, JSON.stringify(initialState));

const statesSlice = createSlice({
  name: 'states',
  initialState,
  reducers: {
    setInitialState(state, action: PayloadAction<boolean>) {
      state.isStarted = false;
      state.onPause = false;
      state.isBreak = false;
      state.onBreakPause = false;
      localStorage.setItem(LS_STATES_KEY, JSON.stringify(state));
    },

    startTimer(state, action: PayloadAction<boolean>) {
      state.isStarted = action.payload;
      state.onPause = false;
      state.isBreak = false;
      state.onBreakPause = false;
      localStorage.setItem(LS_STATES_KEY, JSON.stringify(state));
    },

    pauseTimer(state, action: PayloadAction<boolean>) {
      state.isStarted = false;
      state.onPause = action.payload;
      state.isBreak = false;
      state.onBreakPause = false;
      localStorage.setItem(LS_STATES_KEY, JSON.stringify(state));
    },

    breakTimer(state, action: PayloadAction<boolean>) {
      state.isStarted = false;
      state.onPause = false;
      state.isBreak = action.payload;
      state.onBreakPause = false;
      localStorage.setItem(LS_STATES_KEY, JSON.stringify(state));
    },

    pauseBreakTimer(state, action: PayloadAction<boolean>) {
      state.isStarted = false;
      state.onPause = false;
      state.isBreak = false;
      state.onBreakPause = action.payload;
      localStorage.setItem(LS_STATES_KEY, JSON.stringify(state));
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
