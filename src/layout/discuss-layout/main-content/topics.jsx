import { useEffect, useRef, useState, createRef } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { formatDistanceToNow, isValid, parseISO } from 'date-fns';
import PropTypes from 'prop-types';
import Icon from "@mdi/react";
import { mdiDotsHorizontal, mdiForum, mdiMinusCircleOutline, mdiCheckCircleOutline } from '@mdi/js';
import { useTopics } from '../../../hooks/useTopics';
import CommentDetail from "./detail/commentDetail";
import Pagination from "../../../UI/pagination";

const Topics = ({ dark, topics }) => {
    const { comments, replies } = useTopics();
    const location = useLocation();
    const [isFavorite, setIsFavorite] = useState({});
    const [showFavorite, setShowFavorite] = useState(null);

    const favoriteRefs = useRef(new Map());

    const [currentPage, setCurrentPage] = useState(1);
    const discussPerPage = 5;

    const sortedTopics = [...topics].sort((a, b) => {
        return new Date(b.published) - new Date(a.published);
    });

    const totalDiscuss = sortedTopics.length;
    const totalPages = Math.ceil(totalDiscuss / discussPerPage);

    const indexOfLastDiscuss = currentPage * discussPerPage;
    const indexOfFirstDiscuss = indexOfLastDiscuss - discussPerPage;
    const currentPages = sortedTopics.slice(indexOfFirstDiscuss, indexOfLastDiscuss);

    // Handle topic by favorite
    const handleFavorite = (topicsId) => {
        setIsFavorite(prev => ({
            ...prev,
            [topicsId]: !prev[topicsId]
        }))
    };

    const handleShowFavorite = (topicsId) => {
        setShowFavorite(prev => prev === topicsId ? null : topicsId);
    };

    const isTopicFavorite = (topicsId) => {
        return isFavorite[topicsId] || false;
    };

    const getTopicRef = (topicId) => {
        if (!favoriteRefs.current.has(topicId)) {
            favoriteRefs.current.set(topicId, createRef());
        }
        return favoriteRefs.current.get(topicId);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);

        window.scrollTo(0, 0);
    };

    // check if the feature can hide by click outside layout
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (showFavorite) {
                const currentRef = favoriteRefs.current.get(showFavorite);
                if (currentRef && currentRef.current && !currentRef.current.contains(event.target)) {
                    setShowFavorite(null);
                }
            }
        }

        if (showFavorite) {
            const timeoutId = setTimeout(() => {
                document.addEventListener('mousedown', handleOutsideClick, true);
                document.addEventListener('touchstart', handleOutsideClick, true);
            }, 100);

            return () => {
                clearTimeout(timeoutId);
                document.removeEventListener('mousedown', handleOutsideClick, true);
                document.removeEventListener('touchstart', handleOutsideClick, true);
            };
        }
    }, [showFavorite])

    // The function for displayed topic by date
    const topicsContent = currentPages.map((topic) => {
        if (!topic || typeof topic !== 'object') {
            console.error('Invalid topic object:', topic);
            return null;
        };

        let published;
        try {
            if (topic.published) {
                const date = parseISO(topic.published);
                if (isValid(date)) {
                    published = formatDistanceToNow(date, { addSuffix: true })
                }
            }
        } catch (error) {
            console.error("Error formatting date for topic:", topic.id, error)
        };

        const topicContent = topic.topic && typeof topic.topic === 'object' && topic.topic.text ? topic.topic.text : (typeof topic.topic === 'string' ? topic.topic : 'No content');

        const topicIsFavorite = isTopicFavorite(topic.id);

        return (
            <li key={topic.id} className={`${dark ? 'bg-zinc-800' : 'bg-white'} w-full h-auto p-6 rounded-xl shadow-md shadow-zinc-500/15 flex flex-col gap-6`} ref={getTopicRef(topic.id)}>
                <section className="w-full flex items-center justify-between gap-6 relative">
                    <div className="w-auto h-auto flex gap-4 items-center">
                        <div className="size-10 rounded-full overflow-hidden">
                            <img
                                className="w-full h-full object-cover object-center"
                                src={topic.imagePict}
                                alt={topic.namePict || "User"}
                            />
                        </div>
                        <div className="w-auto h-auto">
                            <label className={`font-semibold ${dark ? 'text-white' : 'text-zinc-900'}`}>{topic.namePict || "User"}</label>
                            <p className="text-sm text-zinc-400">{published || topic.published}</p>
                        </div>
                    </div>
                    <div
                        className="size-8 rounded-full bg-transparent flex items-center justify-center hover:bg-zinc-200 transition-all duration-150"
                        onClick={() => handleShowFavorite(topic.id)}
                        aria-label="show favorite button"
                    >
                        <Icon path={mdiDotsHorizontal} size={1} className='text-zinc-600' />
                    </div>
                    {showFavorite === topic.id && (
                        <button
                            type="button"
                            className={`w-auto h-auto px-3 py-2 ${topicIsFavorite ? 'bg-primary text-white' : 'bg-zinc-300 text-zinc-600'} rounded text-sm absolute z-[3] left-full flex items-center gap-1`}
                            onClick={(e) => {
                                handleFavorite(topic.id)
                                e.stopPropagation()
                            }}
                        >
                            <Icon path={topicIsFavorite ? mdiCheckCircleOutline : mdiMinusCircleOutline} size={0.8} />
                            <span>{topicIsFavorite ? 'Favorited' : 'Favorite'}</span>
                        </button>
                    )}
                </section>
                <section className={`w-full p-4 rounded-md ${dark ? 'bg-zinc-200/10' : 'bg-zinc-200/50'}`}>
                    <p className={dark ? "text-zinc-300" : "text-zinc-500"}>{topicContent}</p>
                </section>
                <section className="w-full h-auto">
                    <Link
                        to={`/discuss/${topic.id}`}
                        className={`w-fit h-10 ${dark ? 'text-zinc-300 border-zinc-200 hover:text-secondary' : 'text-zinc-600 border-zinc-500 hover:text-primary'} flex items-center gap-2 border-b-2 hover:border-b transition-all duration-300`}
                    >
                        <Icon path={mdiForum} size={0.7} />
                        <>comment</>
                        <span>{comments[topic.id]?.length || 0}</span>
                    </Link>
                </section>
                {comments[topic.id] && comments[topic.id].length > 0 ? (
                    <section className="w-full h-auto flex flex-col gap-4">
                        <h3 className={`${dark ? 'text-white' : 'text-zinc-900'} font-semibold`}>Comments</h3>
                        {comments[topic.id].map((comment, index) => (
                            <CommentDetail
                                key={index}
                                comment={comment}
                                topic={topic}
                                dark={dark}
                                replies={replies[comment.id] || []}
                            />
                        ))}
                    </section>
                ) : <p className="text-zinc-400 w-fit mx-auto">No comment yet. Be the first to comment!</p>}
                {location.pathname === `/discuss/${topic.id}` && (
                    <section>
                        <Outlet />
                    </section>
                )}
            </li>
        )
    });

    if (!topics || topics.length === 0) {
        return <p className="text-zinc-400 w-fit mx-auto">No topics yet. Be the first to post!</p>
    };

    return (
        <section className="w-full h-auto flex flex-col gap-10 mt-10">
            <ul className="w-full h-auto flex flex-col gap-8">
                {topicsContent}
            </ul>
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                dark={dark}
            />
        </section>
    )
};

Topics.propTypes = {
    dark: PropTypes.bool,
    topics: PropTypes.array
}

export default Topics;