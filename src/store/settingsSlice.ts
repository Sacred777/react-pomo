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
    changeSettings(state, action: PayloadAction<object>) {
      // TODO поправить typescript
      // @ts-ignore
      state.taskTime = action.payload.taskTime;
      // @ts-ignore
      state.shortBreakTime = action.payload.shortBreakTime;
      // @ts-ignore
      state.longBreakTime = action.payload.longBreakTime;
      // @ts-ignore
      state.longBreakCycle = action.payload.longBreakCycle;
      // @ts-ignore
      state.massage = action.payload.massage;

      // console.log(state);
      // console.log(action);
    },
  }
})

export const { changeSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
