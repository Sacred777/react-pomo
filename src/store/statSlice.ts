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
  lastBreakPomodoroCount: number;
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
    addTask(state, action: PayloadAction<TStat>) {
      state.stat.push(action.payload)
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
  addTask,
  // increaseTime,
  // increaseCount,
  // decreaseCount,
  // changeTask,
  // removeTask
} = statSlice.actions;

export default statSlice.reducer;
