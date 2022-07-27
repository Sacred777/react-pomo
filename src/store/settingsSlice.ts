import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const LS_SETTINGS_KEY = 'settings'

export type TSettings = {
  taskTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  longBreakCycle: number;
  massage: boolean;
}

const initialState: TSettings = JSON.parse(localStorage.getItem(LS_SETTINGS_KEY)
  ?? JSON.stringify({
    taskTime: 60,
    shortBreakTime: 120,
    longBreakTime: 180,
    longBreakCycle: 2,
    massage: true,
  }))

if (!localStorage.getItem(LS_SETTINGS_KEY)) localStorage.setItem(LS_SETTINGS_KEY, JSON.stringify(initialState));

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
      localStorage.setItem(LS_SETTINGS_KEY, JSON.stringify(state));
    },

    changeTaskTime(state, action: PayloadAction<number>) {
      state.taskTime = action.payload;
      localStorage.setItem(LS_SETTINGS_KEY, JSON.stringify(state));
    },

    changeShortBreakTime(state, action: PayloadAction<number>) {
      state.shortBreakTime = action.payload;
      localStorage.setItem(LS_SETTINGS_KEY, JSON.stringify(state));
    },

    changeLongBreakTime(state, action: PayloadAction<number>) {
      state.longBreakTime = action.payload;
      localStorage.setItem(LS_SETTINGS_KEY, JSON.stringify(state));
    },

    changeLongBreakCycle(state, action: PayloadAction<number>) {
      state.longBreakCycle = action.payload;
      localStorage.setItem(LS_SETTINGS_KEY, JSON.stringify(state));
    },
  }
})

export const {
  changeTaskTime,
  changeShortBreakTime,
  changeLongBreakTime,
  changeLongBreakCycle,
} = settingsSlice.actions;

export default settingsSlice.reducer;
