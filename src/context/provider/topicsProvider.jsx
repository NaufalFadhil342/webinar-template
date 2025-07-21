/**
 * The component for adding new topic, comment, and reply
 * The code can be improve with your own style. 
 */

import { useState } from "react";
import { faker } from "@faker-js/faker";
import PropTypes from "prop-types";
import { TopicsContext } from "../topicsContext";

const TopicsProvider = ({ children }) => {
    const [topics, setTopics] = useState([]);
    const [comments, setComments] = useState({});
    const [replies, setReplies] = useState({});

    // adding new topic
    const addTopic = (topicData) => {
        const topicContent = typeof topicData === 'object' ? topicData : { text: String(topicData) }

        const newTopic = {
            id: faker.string.alphanumeric(10),
            topic: topicContent,
            imagePict: faker.image.urlLoremFlickr({ category: 'person' }),
            namePict: faker.person.fullName(),
            published: new Date().toISOString(),
        };

        // In real app, add the topic to your API

        setTopics((prevTopics) => [...prevTopics, newTopic]);
        return newTopic;
    };

    // adding new comment
    const addComment = (discussId, commentText) => {
        const newComment = {
            id: faker.string.alphanumeric(10),
            imagePict: faker.image.urlLoremFlickr({ category: 'person' }),
            namePict: faker.person.fullName(),
            text: commentText,
            createdAt: new Date().toISOString()
        };

        // Adding the comment to your API

        setComments(prevComments => ({
            ...prevComments,
            [discussId]: [...(prevComments[discussId] || []), newComment]
        }));

        return newComment;
    };

    // Adding new reply
    const addReply = (commentId, discussId, replyText) => {
        const newReply = {
            id: faker.string.alphanumeric(10),
            imagePict: faker.image.urlLoremFlickr({ category: 'person' }),
            namePict: faker.person.fullName(),
            text: replyText,
            createdAt: new Date().toISOString(),
            parentId: commentId,
            discussId: discussId
        };

        // Adding the reply to your API

        setReplies(prevReplies => ({
            ...prevReplies,
            [commentId]: [...(prevReplies[commentId] || []), newReply]
        }));

        return newReply;
    };

    return (
        <TopicsContext.Provider value={{ topics, setTopics, comments, replies, addTopic, addComment, addReply }}>
            {children}
        </TopicsContext.Provider>
    )
};

TopicsProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default TopicsProvider;