import { Outlet, Link, useLocation } from "react-router-dom";
import { formatDistanceToNow, parseISO } from 'date-fns';
import Icon from "@mdi/react";
import { mdiReply } from '@mdi/js';
import PropTypes from 'prop-types';

const CommentDetail = ({ comment, topic, dark, replies }) => {
    const location = useLocation();

    const latestReplies = [...replies].sort((a, b) => {
        return parseISO(b.createdAt) - parseISO(a.createdAt);
    });

    return (
        <section className="w-full h-auto flex gap-6">
            <div className="w-11 h-10 rounded-full overflow-hidden">
                <img className="w-full h-full object-cover object-center" src={comment.imagePict} alt={comment.namePict || "User"} />
            </div>
            <div className="w-full h-auto">
                <h3 className={dark ? "text-zinc-200" : "text-zinc-900"}>{comment.namePict || "User"}</h3>
                <div className={`${dark ? 'bg-zinc-200/10' : 'bg-zinc-200/50'} p-3 rounded-md mt-4`}>
                    <p className={dark ? "text-zinc-300" : "text-zinc-600"}>{comment.text}</p>
                    <small className="text-zinc-400">{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</small>
                </div>
                <div className='w-full'>
                    <div className="w-full flex justify-end mt-1 -ml-2">
                        <Link to={`/discuss/${topic.id}/${comment.id}`} type='button' className='flex items-center gap-1 text-sm text-primary'>
                            <>Reply</>
                            <Icon path={mdiReply} size={0.7} />
                        </Link>
                    </div>
                    {location.pathname.includes(`/discuss/${topic.id}/${comment.id}`) && (
                        <div>
                            <Outlet />
                        </div>
                    )}
                    {replies && replies.length > 0 && (
                        <div className="w-full h-auto mt-3 rounded-lg flex flex-col gap-4">
                            {latestReplies.map((reply, index) => {
                                const createdAt = formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })

                                return (
                                    <div key={reply.id || index} className="w-full h-auto flex flex-col gap-4 bg-zinc-200/50 p-4 rounded-md">
                                        <div className="w-full h-auto flex items-center gap-4">
                                            <div className="w-11 h-10 rounded-full overflow-hidden">
                                                <img className='w-full h-full object-cover' src={reply.imagePict} alt={reply.namePict || "User"} />
                                            </div>
                                            <div className="w-full h-auto">
                                                <div className='text-zinc-900 leading-none'>{reply.namePict || "User"}</div>
                                                <small className='text-zinc-400 text-sm'>{createdAt}</small>
                                            </div>
                                        </div>
                                        <div className='w-full flex flex-col gap-2'>
                                            <p className="text-zinc-600">{reply.text}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
};

CommentDetail.propTypes = {
    comment: PropTypes.shape({
        id: PropTypes.string.isRequired,
        imagePict: PropTypes.string.isRequired,
        namePict: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
    }).isRequired,
    topic: PropTypes.shape({
        id: PropTypes.string.isRequired,
        imagePict: PropTypes.string.isRequired,
        namePict: PropTypes.string.isRequired,
    }).isRequired,
    dark: PropTypes.bool,
    replies: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        imagePict: PropTypes.string.isRequired,
        namePict: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
    })),
}

export default CommentDetail;