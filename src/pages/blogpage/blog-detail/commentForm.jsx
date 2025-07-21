import Form from '../../../UI/form';
import PropTypes from "prop-types";

const CommentForm = ({ addComment, handleCommentChange, handleCommentSubmit, dark }) => {
    return (
        <Form className="w-full h-auto flex flex-col items-start gap-6 p-6" submitForm={handleCommentSubmit}>
            <div className={dark ? 'text-white font-semibold' : 'text-zinc-900 font-semibold'}>Leave a Comment</div>
            <div className='w-full h-auto'>
                <textarea
                    className={`w-full h-28 px-4 py-2 border bg-transparent rounded-lg outline-none ${dark ? 'border-zinc-400/75 focus:border-secondary' : 'border-zinc-400 focus:border-primary'}`}
                    placeholder="Write your comment here..."
                    value={addComment}
                    onChange={handleCommentChange}
                />
            </div>
            <button className={`w-fit h-10 px-4 flex items-center rounded-md ${dark ? 'bg-secondary hover:bg-darkSecondary' : 'bg-primary hover:bg-darkPrimary'} text-white transition-all duration-150`} type='submit'>Post Comment</button>
        </Form>
    )
};

CommentForm.propTypes = {
    addComment: PropTypes.string,
    handleCommentChange: PropTypes.func.isRequired,
    handleCommentSubmit: PropTypes.func.isRequired,
    dark: PropTypes.bool
}

export default CommentForm;