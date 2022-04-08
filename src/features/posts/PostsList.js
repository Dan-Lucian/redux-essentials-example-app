import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// components
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import { ReactionButtons } from './ReactionButtons';

const PostsList = () => {
  const posts = useSelector((state) => state.posts);

  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {orderedPosts.map((post) => (
        <article className="post-excerpt" key={post.id}>
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
      ))}
    </section>
  );
};

export default PostsList;
