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

    increaseCount(state, action: PayloadAction<number>) {
      // TODO Написать функцию
      // state.tasks.push(action.payload);
      const foundTask = state.tasks.find(task => task.id === action.payload)
      if(foundTask) foundTask.time += 60;
    },

    decreaseCount(state, action: PayloadAction<TTask>) {
      // TODO Написать функцию
      state.tasks.push(action.payload);
    },

    changeTask(state, action: PayloadAction<TTask>) {
      // TODO Написать функцию
      state.tasks.push(action.payload);
    },

    removeTask(state, action: PayloadAction<TTask>) {
      // TODO Написать функцию
      state.tasks.push(action.payload);
    },
  }
})

export const { addTask, increaseCount, decreaseCount, changeTask, removeTask } = tasksSlice.actions;

export default tasksSlice.reducer;
