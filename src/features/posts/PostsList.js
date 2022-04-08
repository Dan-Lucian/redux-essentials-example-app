/* eslint-disable no-case-declarations */
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// slice helpers
import { selectAllPosts, fetchPosts } from './postsSlice';

// components
import { Spinner } from '../../components/Spinner';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import { ReactionButtons } from './ReactionButtons';

function PostExcerpt({ post }) {
  return (
    <article className="post-excerpt">
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content}</p>
      <Link to={`posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
      <ReactionButtons post={post} />
    </article>
  );
}

const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  useEffect(() => {
    if (postsStatus === 'idle') dispatch(fetchPosts());
  }, [dispatch, postsStatus]);

  let content;
  switch (postsStatus) {
    case 'loading':
      content = <Spinner text="Loading..." />;
      break;

    case 'succeeded':
      const orderedPosts = posts
        .slice()
        .sort((a, b) => b.date.localeCompare(a.date));

      content = orderedPosts.map((post) => (
        <PostExcerpt key={post.id} post={post} />
      ));
      break;

    case 'failed':
      content = <div>{error}</div>;
      break;

    default:
      <div>Uknown switch case: {postsStatus}</div>;
      break;
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  );
};

export default PostsList;
