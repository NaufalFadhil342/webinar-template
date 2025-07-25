import { useNavigate, useParams } from 'react-router';
import { useState } from 'react';
import Form from "../../../UI/form";
import { useTopics } from '../../../hooks/useTopics';

const AddReply = () => {
    const [replyText, setReplyText] = useState('');
    const { addReply } = useTopics();
    const { discussId, commentId } = useParams();
    const navigate = useNavigate();

    const handleReplyText = (e) => setReplyText(e.target.value);

    const handleCancel = () => {
        setReplyText('');
        navigate(`/discuss`);
    };

    const handleReplySubmit = (e) => {
        e.preventDefault();

        if (!replyText.trim()) return;

        addReply(commentId, discussId, replyText);
        setReplyText('');
        navigate(`/discuss`);
    };

    return (
        <Form className='w-full h-auto flex flex-col' submitForm={handleReplySubmit}>
            <textarea id='replyText' onChange={handleReplyText} value={replyText} className='w-full h-24 rounded-lg bg-zinc-200/50 px-3 py-2 mt-3 outline-none text-sm' placeholder="Type your reply here..." />
            <div className='w-full flex items-center justify-start gap-4'>
                <button
                    type='submit'
                    className="w-fit h-8 flex items-center mt-4 text-sm text-white px-4 rounded-md bg-primary hover:bg-darkPrimary transition-all duration-150">
                    Submit
                </button>
                <button
                    type='button'
                    onClick={handleCancel}
                    className="w-fit h-8 flex items-center mt-4 text-sm text-zinc-600 px-4 rounded-md bg-transparent border border-zinc-600 hover:text-white hover:bg-primary hover:border-primary transition-all duration-150">
                    Cancel
                </button>
            </div>
        </Form>
    )
};

export default AddReply;