import { configureStore } from '@reduxjs/toolkit';

// reducers
import postsReducer from '../features/posts/postsSlice';
import usersReducer from '../features/users/usersSlice';

export default configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
  },
});
