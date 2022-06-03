import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './settingsSlice';
import modalReducer from './modalSlice';

const store = configureStore({
  reducer: {
    settings: settingsReducer,
    modal: modalReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
