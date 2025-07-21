import { formatDistanceToNow, parseISO, isValid } from 'date-fns';
import { useTopics } from '../../../hooks/useTopics';
import PropTypes from 'prop-types';

const DiscussActivity = ({ topics, dark }) => {
    const { comments, replies } = useTopics();

    const generateActivities = () => {
        const allActivities = [];

        // Checking the existing topic
        if (topics && topics.length > 0) {
            topics.forEach(topic => {
                if (topic && topic.namePict) {
                    const formattedDate = (() => {
                        try {
                            if (topic.published) {
                                const date = parseISO(topic.published);
                                if (isValid(date)) {
                                    return formatDistanceToNow(date, { addSuffix: true });
                                }
                            }
                            return topic.published;
                        } catch (error) {
                            console.error("Error formatting date:", error);
                            return 'Unknown date';
                        }
                    })();

                    allActivities.push({
                        id: `topic-${topic.id}`,
                        profilePict: topic.imagePict,
                        author: topic.namePict,
                        activity: 'Created topic',
                        mentioned: topic.topic?.text || 'Untitled topic',
                        rawDate: topic.published,
                        createdAt: formattedDate
                    })
                }
            });
        };

        // Check if the topic has comment
        if (comments && Object.keys(comments).length > 0) {
            Object.keys(comments).forEach(topicId => {
                if (comments[topicId] && comments[topicId].length > 0) {
                    comments[topicId].forEach(comment => {
                        if (comment && comment.namePict) {
                            const relatedTopic = topics.find(t => t.id === topicId);

                            const formattedDate = (() => {
                                try {
                                    if (comment.createdAt) {
                                        const date = parseISO(comment.createdAt);
                                        if (isValid(date)) {
                                            return formatDistanceToNow(date, { addSuffix: true });
                                        }
                                    }
                                    return 'Unknown date';
                                } catch (error) {
                                    console.error("Error formatting date:", error);
                                    return 'Unknown date';
                                }
                            })();

                            allActivities.push({
                                id: `comment-${comment.id}`,
                                profilePict: comment.imagePict,
                                author: comment.namePict,
                                createdAt: formattedDate,
                                rawDate: comment.createdAt,
                                activity: 'Commmented on',
                                mentioned: relatedTopic ? relatedTopic.topic?.text : 'Unknown topic'
                            })
                        }
                    })
                }
            })
        };

        // Check if the topic has reply from commment
        if (replies && Object.keys(replies).length > 0) {
            Object.keys(replies).forEach(commentId => {
                if (replies[commentId] && replies[commentId].length > 0) {
                    replies[commentId].forEach((reply) => {
                        if (reply && reply.namePict) {

                            let relatedTopic;
                            Object.keys(comments).forEach(topicId => {
                                const foundComment = comments[topicId].find(c => c.id === commentId)

                                if (foundComment) {
                                    relatedTopic = topics.find(t => t.id === topicId)
                                }
                            });

                            const formattedDate = (() => {
                                try {
                                    if (reply.createdAt) {
                                        const date = parseISO(reply.createdAt);
                                        if (isValid(date)) {
                                            return formatDistanceToNow(date, { addSuffix: true });
                                        }
                                    }
                                    return 'Unknown date';
                                } catch (error) {
                                    console.error("Error formatting date:", error);
                                    return 'Unknown date';
                                }
                            })();

                            allActivities.push({
                                id: `reply-${reply.id}`,
                                profilePict: reply.imagePict,
                                author: reply.namePict,
                                createdAt: formattedDate,
                                rawDate: reply.createdAt,
                                activity: 'Replied to',
                                mentioned: relatedTopic ? relatedTopic.topic?.text : 'Unknown Topic'
                            })
                        };
                    })
                };
            })
        };

        return allActivities.sort((a, b) => {
            let timeA = 0;
            let timeB = 0;

            try {
                if (a.rawDate) {
                    const dateA = parseISO(a.rawDate);
                    if (isValid(dateA)) timeA = dateA.getTime();
                }
            } catch (e) { console.error("Error parsing date A:", e); }

            try {
                if (b.rawDate) {
                    const dateB = parseISO(b.rawDate);
                    if (isValid(dateB)) timeB = dateB.getTime();
                }
            } catch (e) { console.error("Error parsing date B:", e); }

            return timeB - timeA;
        }).slice(0, 3);
    };

    const activities = generateActivities();

    return (
        <main className={`w-full h-auto flex flex-col ${dark ? 'bg-zinc-800' : 'bg-white'} rounded-lg shadow-md overflow-hidden`}>
            <header className={`p-3 border-l ${dark ? 'border-secondary' : 'border-primary'}`}>
                <h1 className={`${dark ? 'text-secondary' : 'text-primary'} font-semibold`}>Recent Activity</h1>
            </header>
            <ul className={`p-6 border-t ${dark ? 'border-zinc-400' : 'border-zinc-200'} flex flex-col gap-6`}>
                {activities.map((activity, index) => (
                    <li key={index} className={`w-full h-auto p-4 flex flex-col gap-4 ${dark ? 'bg-zinc-500/50' : 'bg-zinc-200/50'} rounded-md`}>
                        <section className='flex items-center gap-4'>
                            <div className='w-12 h-11 overflow-hidden rounded-full'>
                                <img className='w-full h-full object-cover' src={activity.profilePict} alt={activity.author} />
                            </div>
                            <div className='w-full h-auto flex flex-col'>
                                <span className={dark ? 'text-white font-medium' : 'text-zinc-900 font-medium'}>{activity.author}</span>
                                <small className={'text-sm text-zinc-400'}>{activity.createdAt}</small>
                            </div>
                        </section>
                        <section className='w-full h-auto'>
                            <span className='flex items-center gap-2 flex-wrap'>
                                <p className={dark ? 'text-zinc-300' : 'text-zinc-600'}>{activity.activity}</p>
                                <p className={`h-7 ${dark ? 'text-secondary' : 'text-primary'} font-medium overflow-y-hidden`}>{activity.mentioned}</p>
                            </span>
                        </section>
                    </li>
                ))}
            </ul>
        </main>
    )
};

DiscussActivity.propTypes = {
    topics: PropTypes.array,
    dark: PropTypes.bool
}

export default DiscussActivity;