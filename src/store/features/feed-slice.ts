import { createSlice } from '@reduxjs/toolkit';

export type FeedState = {
  newsAPI: any;
};

const initialState: FeedState = {
  newsAPI: {
    sources: 'cnn',
  },
};

export const feedSlice = createSlice({
  name: 'Feed',
  initialState,
  reducers: {
    setNewsAPIState: (state, action) => {
      state.newsAPI = {
        ...state.newsAPI,
        ...action.payload,
      };
    },
  },
});

export const { setNewsAPIState } = feedSlice.actions;

export default feedSlice.reducer;
