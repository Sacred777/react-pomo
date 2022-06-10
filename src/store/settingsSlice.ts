import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TSettings = {
  taskTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  longBreakCycle: number;
  massage: boolean;
}

const initialState: TSettings = {
  taskTime: 1500,
  shortBreakTime: 300,
  longBreakTime: 1800,
  longBreakCycle: 4,
  massage: true,
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    changeSettings(state, action: PayloadAction<TSettings>) {
      // TODO поправить typescript
      state.taskTime = action.payload.taskTime;
      state.shortBreakTime = action.payload.shortBreakTime;
      state.longBreakTime = action.payload.longBreakTime;
      state.longBreakCycle = action.payload.longBreakCycle;
      state.massage = action.payload.massage;

      // console.log(state);
      // console.log(action);
    },
  }
})

export const { changeSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
