/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// https://redux.js.org/tutorials/essentials/part-4-using-data

// redux actions
import { addPost } from './postsSlice';

const AddPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');

  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && content) {
      dispatch(addPost(title, content, userId));
      setTitle('');
      setContent('');
    }
  };

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Add a New Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author: </label>
        <select value={userId} onChange={onAuthorChanged} id="postAuthor">
          <option value="" />
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button disabled={!canSave} type="submit">
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
