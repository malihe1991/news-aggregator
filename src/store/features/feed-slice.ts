import { createSlice } from '@reduxjs/toolkit';

export type FeedState = {
  newsAPI: { sources: string };
  guardian: { category: string };
};

const initialState: FeedState = {
  newsAPI: {
    sources: 'cnn',
  },
  guardian: {
    category: 'games',
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
    setGuardianState: (state, action) => {
      state.guardian = {
        ...state.guardian,
        ...action.payload,
      };
    },
  },
});

export const { setNewsAPIState, setGuardianState } = feedSlice.actions;

export default feedSlice.reducer;
