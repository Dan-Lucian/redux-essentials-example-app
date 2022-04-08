import { createSlice, nanoid } from '@reduxjs/toolkit';
import { sub } from 'date-fns';

const initialState = [
  {
    id: '1',
    title: 'First post!',
    content: 'Welcome to the first post',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
  },
  {
    id: '2',
    title: 'Second post!',
    content: 'Welcome to the second post',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
  },
];

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: (title, content, userId) => ({
        payload: {
          id: nanoid(),
          date: new Date().toISOString(),
          title,
          content,
          userId,
        },
      }),
    },
    updatePost: (state, action) => {
      const { id, title, content } = action.payload;
      const foundPost = state.find((post) => post.id === id);
      if (foundPost) {
        foundPost.title = title;
        foundPost.content = content;
      }
    },
    addReaction: (state, action) => {
      const { postId, reaction } = action.payload;
      const foundPost = state.find((post) => post.id === postId);
      if (foundPost) {
        foundPost.reactions[reaction] += 1;
      }
    },
  },
});

export const { addPost, updatePost, addReaction } = postsSlice.actions;
export default postsSlice.reducer;
