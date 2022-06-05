import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './settingsSlice';
import modalReducer from './modalSlice';
import tasksReducer from './tasksSlice';

const store = configureStore({
  reducer: {
    settings: settingsReducer,
    modal: modalReducer,
    tasks: tasksReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
