import { configureStore } from '@reduxjs/toolkit';

// reducers
import postsReducer from '../features/posts/postsSlice';

export default configureStore({
  reducer: {
    posts: postsReducer,
  },
});
