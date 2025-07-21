import { faker } from "@faker-js/faker";
import PropTypes from "prop-types";
import { useState } from "react";
import CommentForm from "./commentForm";

const Comments = ({ comments, setComments, dark }) => {
    const [addComment, setAddComment] = useState('');

    const handleCommentChange = (e) => setAddComment(e.target.value);

    const handleCommentSubmit = (e) => {
        e.preventDefault();

        if (addComment.trim()) {
            const newComment = {
                id: faker.string.alphanumeric(10),
                name: faker.person.fullName(),
                text: addComment,
                date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                avatar: faker.image.url(),
            };

            setComments((prevComments) => [...prevComments, newComment]);
            setAddComment('');
        };
    };

    const latestComments = [...comments].sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <section className={`w-full h-auto flex flex-col rounded-xl overflow-hidden ${dark ? 'bg-zinc-800' : 'bg-white'}`} aria-label="Comments Section">
            <h1 className={`text-2xl font-semibold p-6 border-l-[1.5px] ${dark ? 'text-white border-secondary' : 'text-zinc-900 border-primary'}`}>
                Comments ({comments.length})
            </h1>
            <div className={`w-full h-auto border-t ${dark ? 'border-zinc-300/50' : 'border-zinc-300'} px-6 pb-6`}>
                {latestComments.map((comment) => (
                    <div key={comment.id} className={`w-full h-auto flex flex-col gap-4 border-b ${dark ? 'border-zinc-300/50' : 'border-zinc-300'} py-6`}>
                        <div className="w-full flex items-center gap-4">
                            <div className="size-10 rounded overflow-hidden">
                                <img className="w-full h-full object-cover" src={comment.avatar} alt={comment.name} />
                            </div>
                            <span className={`${dark ? 'text-white' : 'text-zinc-900'} font-semibold text-lg`}>{comment.name}</span>
                        </div>
                        <p className={dark ? "text-zinc-300" : "text-zinc-600"}>{comment.text}</p>
                        <div className="flex items-center">
                            <small className="text-zinc-400">{comment.date}</small>
                        </div>
                    </div>
                ))}
            </div>
            <div className="w-full h-auto">
                <CommentForm
                    addComment={addComment}
                    handleCommentChange={handleCommentChange}
                    handleCommentSubmit={handleCommentSubmit}
                    dark={dark}
                />
            </div>
        </section>
    )
};

Comments.propTypes = {
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            comment: PropTypes.string,
            avatar: PropTypes.string,
            date: PropTypes.string,
        })
    ).isRequired,
    setComments: PropTypes.func.isRequired,
    dark: PropTypes.bool
};

export default Comments;