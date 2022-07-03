import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

const initialState: TStatState = {
  stat: [],
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

    addStop(state, action: PayloadAction<string>) {
      const [currentStat] = state.stat.filter((stat) => stat.date === action.payload);
      currentStat.stopCount = currentStat.stopCount + 1;
    },

    increaseLastLongBreakPomodoroCount(state, action: PayloadAction<string>) {
      const [currentStat] = state.stat.filter((stat) => stat.date === action.payload);
      currentStat.lastLongBreakPomodoroCount = currentStat.lastLongBreakPomodoroCount + 1;
    },

    cleanLastLongBreakPomodoroCount(state, action: PayloadAction<string>) {
      const [currentStat] = state.stat.filter((stat) => stat.date === action.payload);
      currentStat.lastLongBreakPomodoroCount = 0;
    },


    // increaseTime(state, action: PayloadAction<number>) {
    //   const foundTask = state.tasks.find(task => task.id === action.payload)
    //   if(foundTask) foundTask.time += 60;
    // },
    //
    // increaseCount(state, action: PayloadAction<number>) {
    //   const foundTask = state.tasks.find(task => task.id === action.payload)
    //   if(foundTask) foundTask.count += 1;
    // },
    //
    // decreaseCount(state, action: PayloadAction<number>) {
    //   const foundTask = state.tasks.find(task => task.id === action.payload)
    //   if(foundTask) {
    //     console.log()
    //     if (foundTask.count > 1) foundTask.count -= 1;
    //   }
    // },
    //
    // changeTask(state, action: PayloadAction<TTask>) {
    //   // TODO Написать функцию
    //   state.tasks.push(action.payload);
    // },
    //
    // removeTask(state, action: PayloadAction<number>) {
    //   // TODO Написать функцию
    //   state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    // },
  }
})

export const {
  createStat,
  changeStat,
  addStop,
  increaseLastLongBreakPomodoroCount,
  cleanLastLongBreakPomodoroCount,
  // increaseTime,
  // increaseCount,
  // decreaseCount,
  // changeTask,
  // removeTask
} = statSlice.actions;

export default statSlice.reducer;
