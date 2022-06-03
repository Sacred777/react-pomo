import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TSettings = {
  isActive: boolean;
}

const initialState: TSettings = {
  isActive: false,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setIsActive(state, action: PayloadAction<boolean>) {
      state.isActive = action.payload;
      // console.log(state);
      // console.log(action);
    },
  }
})

export const { setIsActive } = modalSlice.actions;

export default modalSlice.reducer;
