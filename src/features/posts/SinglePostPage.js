/* eslint-disable no-shadow */
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// selector function
import { selectPostById } from './postsSlice';

// components
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';

const SinglePostPage = ({ match }) => {
  const { postId } = match.params;

  const post = useSelector((state) => selectPostById(state, postId));

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <div>
          <PostAuthor userId={post.user} />
          <TimeAgo timestamp={post.date} />
        </div>
        <p className="post-content">{post.content}</p>
        <Link to={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link>
      </article>
    </section>
  );
};

export default SinglePostPage;
