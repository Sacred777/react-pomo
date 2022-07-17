import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "../hooks/reduxHooks";

export type TTask = {
  id: number;
  name: string;
  count: number;
  time: number;
}

type TTasksState = {
  tasks: TTask[];
}

const initialState: TTasksState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<TTask>) {
      state.tasks.push(action.payload)
    },

    increaseTime(state, action: PayloadAction<number>) {
      const foundTask = state.tasks.find(task => task.id === action.payload)
      if(foundTask) foundTask.time += 60;
    },

    increaseCount(state, action: PayloadAction<number>) {
      const foundTask = state.tasks.find(task => task.id === action.payload)
      if(foundTask) foundTask.count += 1;
    },

    decreaseCount(state, action: PayloadAction<number>) {
      const foundTask = state.tasks.find(task => task.id === action.payload)
      if(foundTask) {
        // console.log('удалили помидор')
       if (foundTask.count > 1) foundTask.count -= 1;
      }
    },

    changeNameTask(state, action: PayloadAction<{id:number, value: string}>) {
      // TODO Написать функцию
      const foundTask = state.tasks.find(task => task.id === action.payload.id)
      if(foundTask) {
        // console.log('удалили помидор')
        foundTask.name = action.payload.value;
      }
    },

    removeTask(state, action: PayloadAction<number>) {
      // TODO Написать функцию
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  }
})

export const {
  addTask,
  increaseTime,
  increaseCount,
  decreaseCount,
  changeNameTask,
  removeTask
} = tasksSlice.actions;

export default tasksSlice.reducer;
