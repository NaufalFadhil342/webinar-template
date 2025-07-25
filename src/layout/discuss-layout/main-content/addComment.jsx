import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import Form from '../../../UI/form';
import { useTopics } from '../../../hooks/useTopics';
import PropTypes from 'prop-types';

const AddComment = ({ dark }) => {
  const [comment, setComment] = useState('');
  const { addComment } = useTopics();
  const { discussId } = useParams();
  const navigate = useNavigate();

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    addComment(discussId, comment);
    console.log(discussId, comment);
    setComment('');
    navigate('/discuss');
  };

  const handleCancel = () => {
    setComment('');
    navigate(`/discuss`);
  };

  return (
    <Form className='w-full h-auto bg-transparent flex flex-col gap-6' submitForm={handleCommentSubmit}>
      <div>
        <textarea
          className={`w-full h-32 ${dark ? 'bg-zinc-200/15 text-zinc-300' : 'bg-zinc-200/50 text-zinc-600'} p-2 outline-none rounded-md`}
          placeholder='Write your comment'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <div className='w-full h-auto flex items-center gap-4'>
        <button
          type='submit'
          className={`w-fit h-10 px-4 rounded-md ${dark ? 'text-white bg-secondary hover:bg-darkSecondary' : 'text-white bg-primary hover:bg-darkPrimary'} transition-colors duration-150`}
        >
          Post
        </button>
        <button
          type='button'
          className={`w-fit h-10 px-4 rounded-md ${dark ? 'text-white bg-secondary/20 hover:bg-secondary/100' : 'text-primary bg-primary/20 hover:bg-primary/100'} hover:text-white transition-all duration-150`}
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </Form>
  );
};

AddComment.propTypes = {
  dark: PropTypes.bool.isRequired,
}

export default AddComment;