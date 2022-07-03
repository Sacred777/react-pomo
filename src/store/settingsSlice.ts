import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TSettings = {
  taskTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  longBreakCycle: number;
  massage: boolean;
}

const initialState: TSettings = {
  taskTime: 60,
  shortBreakTime: 100,
  longBreakTime: 120,
  longBreakCycle: 2,
  massage: true,
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    changeSettings(state, action: PayloadAction<TSettings>) {
      state.taskTime = action.payload.taskTime;
      state.shortBreakTime = action.payload.shortBreakTime;
      state.longBreakTime = action.payload.longBreakTime;
      state.longBreakCycle = action.payload.longBreakCycle;
      state.massage = action.payload.massage;
    },
  }
})

export const { changeSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
