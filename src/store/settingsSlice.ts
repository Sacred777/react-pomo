import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TSettings = {
  taskTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  longBreakCycle: number;
  theme: boolean;
  massage: boolean;
}

const initialState: TSettings = {
  taskTime: 1500,
  shortBreakTime: 300,
  longBreakTime: 1800,
  longBreakCycle: 240,
  theme: false,
  massage: true,
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    changeSettings(state, action: PayloadAction<object>) {
      // TODO поправить typescript
      // @ts-ignore
      state = action.payload;
      // console.log(state);
      // console.log(action);
    },
  }
})

export const { changeSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
