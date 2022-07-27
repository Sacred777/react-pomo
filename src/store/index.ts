import {configureStore} from '@reduxjs/toolkit';
import settingsReducer from './settingsSlice';
import tasksReducer from './tasksSlice';
import statReducer from './statSlice';
import statesReducer from './statesSlice';


const store = configureStore({
  reducer: {
    settings: settingsReducer,
    tasks: tasksReducer,
    stat: statReducer,
    states: statesReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
