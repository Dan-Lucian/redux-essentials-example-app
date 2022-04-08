import { useSelector } from 'react-redux';

const PostAuthor = ({ userId }) => {
  const author = useSelector((state) =>
    state.users.find((user) => user.id === userId)
  );

  return <span>by {author ? author.name : 'Uknown'}</span>;
};

export default PostAuthor;
