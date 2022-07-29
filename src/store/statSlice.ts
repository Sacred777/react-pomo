import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CreateStatState} from "../help/CreateStatsState";
import {TStat} from "../models/statObject";

const LS_STAT_KEY = 'stat';

// TODO Удалить. Служит для создания статистики
const testStat = CreateStatState();

export type TShortStat = {
  date: string;
  timerTime: number;
  pomodoroTime: number;
  pauseTime: number;
  stopCount: number;
  pomodoroCount: number;
  taskCount: number;
  lastLongBreakPomodoroCount: number;
}

type TStatState = {
  stat: TStat[];
}

// TODO на финише удалить.
if (!localStorage.getItem(LS_STAT_KEY)) localStorage.setItem(LS_STAT_KEY, JSON.stringify(testStat));

const initialState: TStatState = {
  stat: JSON.parse(localStorage.getItem(LS_STAT_KEY) ?? '[]')
};

const statSlice = createSlice({
  name: 'stat',
  initialState,
  reducers: {
    createStat(state, action: PayloadAction<TStat>) {
      state.stat.push(action.payload);
      localStorage.setItem(LS_STAT_KEY, JSON.stringify(state.stat));
    },

    changeStat(state, action: PayloadAction<TShortStat>) {
      const [currentStat] = state.stat.filter((stat) => stat.date === action.payload.date);
      currentStat.timerTime = currentStat.timerTime + action.payload.timerTime;
      currentStat.pomodoroTime = currentStat.pomodoroTime + action.payload.pomodoroTime;
      currentStat.pauseTime = currentStat.pauseTime + action.payload.pauseTime;
      currentStat.stopCount = currentStat.stopCount + action.payload.stopCount;
      currentStat.pomodoroCount = currentStat.pomodoroCount + action.payload.pomodoroCount;
      currentStat.taskCount = currentStat.taskCount + action.payload.taskCount;
      currentStat.lastLongBreakPomodoroCount = currentStat.lastLongBreakPomodoroCount + action.payload.lastLongBreakPomodoroCount;
      localStorage.setItem(LS_STAT_KEY, JSON.stringify(state.stat));
    },

    cleanLastLongBreakPomodoroCount(state, action: PayloadAction<string>) {
      const [currentStat] = state.stat.filter((stat) => stat.date === action.payload);
      currentStat.lastLongBreakPomodoroCount = 0;
      localStorage.setItem(LS_STAT_KEY, JSON.stringify(state.stat));
    },
  }
})

export const {
  createStat,
  changeStat,
  cleanLastLongBreakPomodoroCount,
} = statSlice.actions;

export default statSlice.reducer;
