import { useDispatch } from 'react-redux';

// reducers
import { addReaction } from './postsSlice';

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
};

export const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => (
    <button
      onClick={() => dispatch(addReaction({ postId: post.id, reaction: name }))}
      key={name}
      type="button"
      className="muted-button reaction-button"
    >
      {emoji} {post.reactions[name]}
    </button>
  ));

  return <div>{reactionButtons}</div>;
};
