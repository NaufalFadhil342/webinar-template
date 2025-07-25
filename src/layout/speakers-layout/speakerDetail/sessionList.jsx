// import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import { useSessions } from '../../../hooks/useSessions';
import Icon from '@mdi/react';
import { mdiClockOutline, mdiCurrencyUsd } from '@mdi/js';

const SessionList = ({ sessions, dark }) => {
    const { addSession, selectedSessions } = useSessions();
    const navigate = useNavigate();

    if (!sessions || sessions.length === 0) {
        return <div className={`text-center py-10 ${dark ? 'text-zinc-400' : 'text-zinc-500'}`}>No sessions scheduled for this date.</div>
    };

    const handleBuyLecture = (session) => {
        // Make sure the session has all required fields
        if (!session || !session.id) {
            console.error('Invalid session data:', session);
            return;
        }

        // Add session to context and set a flag in sessionStorage that we're coming from buy action
        addSession(session);
        sessionStorage.setItem('buyingSessionId', session.id);

        // Navigate to payment page
        navigate('/payment', { state: { buyingSession: session } });
        window.scrollTo(0, 0);
    };

    const handleAddToWishlist = (session) => {
        // Make sure the session has all required fields
        if (!session || !session.id) {
            console.error('Invalid session data:', session);
            return;
        }

        // Add session to context (which will also save to localStorage via our provider)
        addSession(session);

        // Optional: Show some feedback to the user (you could use a toast notification here)
        alert(`"${session.title}" added to your schedule!`);
    };

    // Check if a session is already in the selected sessions
    const isSessionSelected = (sessionId) => {
        return selectedSessions.some(s => s.id === sessionId);
    };

    return (
        <ul className='w-full h-auto flex flex-col gap-8'>
            {sessions.map((session) => {
                const isSelected = isSessionSelected(session.id);

                return (
                    <li
                        key={session.id}
                        className={`p-6 w-full h-auto ${dark ? 'bg-zinc-800' : 'bg-white'} flex rounded-xl`}
                    >
                        <div className='lg:flex-[25%] w-full hidden lg:flex flex-col'>
                            <h3 className={`text-xl font-semibold ${dark ? 'text-white' : 'text-zinc-900'}`}>{session.times}</h3>
                            <span className={`text-sm ${dark ? 'text-zinc-300' : 'text-zinc-600'}`}>{session.hours} minutes</span>
                        </div>
                        <div className='lg:flex-[75%] w-full flex flex-col gap-4'>
                            <h3 className={`text-xl font-semibold ${dark ? 'text-white' : 'text-zinc-900'} leading-none`}>{session.title}</h3>
                            <p className={dark ? 'text-zinc-300' : 'text-zinc-600'}>{session.description}</p>
                            <div className='w-full flex flex-wrap items-center gap-2'>
                                {session.tags.map((tag, index) => (
                                    <span key={index} className={`py-2 px-3 text-sm rounded-full ${dark ? 'bg-white/15 text-secondary' : 'bg-primary/15 text-primary'}`}>{tag}</span>
                                ))}
                            </div>
                            <div className='w-full h-auto'>
                                <div className={`w-full h-auto flex items-center gap-2 lg:hidden ${dark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                    <Icon path={mdiClockOutline} size={0.85} />
                                    <span className='flex'>
                                        {session.times} ({session.hours} minutes)
                                    </span>
                                </div>
                                <div className={`w-full h-auto flex items-center gap-2 sm:hidden ${dark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                    <Icon path={mdiCurrencyUsd} size={0.85} />
                                    <span>{session.price}</span>
                                </div>
                            </div>
                            <div className='w-full h-auto flex justify-between items-center mt-4 gap-8'>
                                <div className='w-auto h-auto hidden sm:block'>
                                    <p className={`text-xl font-semibold ${dark ? 'text-secondary' : 'text-primary'}`}>${session.price}</p>
                                </div>
                                <div className='w-full h-auto flex flex-col sm:flex-row justify-end items-center gap-4'>
                                    <button onClick={() => handleBuyLecture(session)} className={`w-full sm:w-fit h-auto rounded-md px-4 py-2 text-white ${dark ? 'bg-secondary hover:bg-darkSecondary' : 'bg-primary hover:bg-darkPrimary'} duration-150 transition-all ease-in-out`}>Buy Lecture</button>
                                    <button onClick={() => handleAddToWishlist(session)} className={`w-full sm:w-fit h-auto rounded-md px-4 py-2 border ${isSelected
                                        ? (dark ? 'bg-white text-secondary' : 'bg-primary text-white')
                                        : (dark ? 'bg-transparent border-white text-white hover:bg-white hover:text-secondary' : 'bg-white border-primary text-primary hover:bg-primary hover:text-white')
                                        } duration-150 transition-all ease-in-out`}>{isSelected ? 'Added to Wishlist' : 'Add to Wishlist'}</button>
                                </div>
                            </div>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
};

SessionList.propTypes = {
    sessions: PropTypes.array.isRequired,
    dark: PropTypes.bool
}

export default SessionList