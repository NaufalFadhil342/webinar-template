/**
 * We produced adding the webinar session into wishlist 
 * The code can be improve with your own style. 
 */

import { useEffect, useState } from "react"
import { SessionsContext } from "../sessionsContext";
import PropTypes from 'prop-types';

const SessionsProvider = ({ children }) => {
    const [selectedSessions, setSelectedSessions] = useState(() => {
        try {
            const storedSessions = localStorage.getItem('selectedSessions');
            return storedSessions ? JSON.parse(storedSessions) : [];
        } catch (error) {
            console.error('Error parsing sessions from localStorage:', error);
            return [];
        };
    });

    // Check if the item is exist
    useEffect(() => {
        try {
            localStorage.setItem('selectedSessions', JSON.stringify(selectedSessions));
        } catch (error) {
            console.log('Error saving sessions to localStorage:', error);
        }
    }, [selectedSessions]);

    // Adding new session to cart and payment
    const addSession = (session) => {
        if (!session) {
            console.error('Attempted to add undefined or null session');
            return;
        }

        if (!selectedSessions.some(s => s.id === session.id)) {
            setSelectedSessions(prev => [...prev, session]);
        }
    };

    //  Remove the session
    const removeSession = (sessionId) => {
        setSelectedSessions(prev => prev.filter(session => session.id !== sessionId));
    };

    const clearSessions = () => {
        setSelectedSessions([]);
        localStorage.removeItem('selectedSessions');
    };

    return (
        <SessionsContext.Provider value={{
            selectedSessions,
            addSession,
            removeSession,
            clearSessions
        }}>
            {children}
        </SessionsContext.Provider>
    )
};

SessionsProvider.propTypes = {
    children: PropTypes.node
};

export default SessionsProvider;