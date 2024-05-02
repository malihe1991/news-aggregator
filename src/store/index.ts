import { configureStore } from '@reduxjs/toolkit';
import feedReducer from './features/feed-slice';

const store = configureStore({
  reducer: {
    feed: feedReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
