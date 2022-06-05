import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export type TTask = {
//   id: number;
//   name: string;
//   count: number;
//   time: number;
// }

// const initialState = {
//   id: 0,
//   name: '',
//   count: 0,
//   time: 0,
// };

// @ts-ignore
const initialState = [];

const tasksSlice = createSlice({
  name: 'tasks',
  // @ts-ignore
  initialState,
  reducers: {
    changeTasks(state, action: PayloadAction<object>) {
      state.push(action.payload);
      // TODO поправить typescript
      // @ts-ignore
      // state.taskTime = action.payload.taskTime;
      // @ts-ignore
      // state.shortBreakTime = action.payload.shortBreakTime;
      // @ts-ignore
      // state.longBreakTime = action.payload.longBreakTime;
      // @ts-ignore
      // state.longBreakCycle = action.payload.longBreakCycle;
      // @ts-ignore
      // state.massage = action.payload.massage;

      // console.log(state);
      // console.log(action);
    },
  }
})

export const { changeTasks } = tasksSlice.actions;

export default tasksSlice.reducer;
