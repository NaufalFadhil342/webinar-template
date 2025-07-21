import { useContext, useEffect } from "react";
import { TopicsContext } from "../context/topicsContext";
import { DUMMY_TOPICS } from "../data/communityData";

export function useTopics() {
    const { topics, setTopics, comments, replies, addTopic, addComment, addReply } = useContext(TopicsContext);

    useEffect(() => {
        if (topics.length === 0) {
            setTopics(DUMMY_TOPICS);
        }
    }, [topics, setTopics]);

    return {
        topics,
        setTopics,
        comments,
        addTopic,
        addComment,
        replies,
        addReply,
    }
};