import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {CreateStatState} from "../help/CreateStatsState";

// TODO Удалить. Служит для создания статистики
const testStat = CreateStatState();
// console.log(testStat);

export type TStat = {
  day: number;
  month: number;
  year: number;
  dayOfTheWeek: number;
  week: number;
  date: string;
  timerTime: number;
  pomodoroTime: number;
  pauseTime: number;
  stopCount: number;
  pomodoroCount: number;
  taskCount: number;
  lastLongBreakPomodoroCount: number;
}

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

//Todo на финише установить stat: [],
const initialState: TStatState = {
  stat: testStat,
};

const statSlice = createSlice({
  name: 'stat',
  initialState,
  reducers: {
    createStat(state, action: PayloadAction<TStat>) {
      state.stat.push(action.payload);
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
    },

    cleanLastLongBreakPomodoroCount(state, action: PayloadAction<string>) {
      const [currentStat] = state.stat.filter((stat) => stat.date === action.payload);
      currentStat.lastLongBreakPomodoroCount = 0;
    },



  }
})

export const {
  createStat,
  changeStat,
  cleanLastLongBreakPomodoroCount,
} = statSlice.actions;

export default statSlice.reducer;
