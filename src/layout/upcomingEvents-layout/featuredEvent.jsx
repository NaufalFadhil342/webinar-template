import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiCalendarMonth, mdiClockOutline, mdiCurrencyUsd, mdiMapMarker } from '@mdi/js';
import { useNavigate } from 'react-router-dom';
import { useSessions } from '../../hooks/useSessions';

const FeaturedEvent = ({ event, dark }) => {
    const { addSession, selectedSessions } = useSessions();
    const navigate = useNavigate();

    const buySession = (event) => {
        if (!event || !event.id) {
            console.error('Invalid session data:', event);
            return;
        }

        addSession(event);
        sessionStorage.setItem('buyingSessionId', event.id);

        navigate('/payment', { state: { buyingSession: event } });
        window.scrollTo(0, 0);
    };

    const handleAddToWishlist = (event) => {
        if (!event || !event.id) {
            console.error('Invalid session data:', event);
            return;
        }

        addSession(event);
        alert(`"${event.title}" added to your wishlist!`);
    };

    const isSelectedEvent = eventId => {
        return selectedSessions.some(s => s.id === eventId)
    };

    const isSelected = isSelectedEvent(event.id)

    return (
        <div className={`w-full h-auto ${dark ? 'bg-zinc-800' : 'bg-white'} rounded-xl overflow-hidden shadow-wide flex`}>
            <div className="w-1/2 h-auto hidden lg:block">
                <div className='w-full h-full bg-cover bg-no-repeat bg-center' style={{ backgroundImage: 'url(https://placehold.co/600x400)' }} />
            </div>
            <div className="w-full lg:w-1/2 p-8 flex flex-col justify-between">
                <div>
                    <span className={`text-sm font-medium ${dark ? 'text-secondary' : 'text-primary'}`}>
                        {event.category}
                    </span>
                    <h2 className={`text-3xl font-semibold mt-2 ${dark ? 'text-white' : 'text-zinc-900'}`}>
                        {event.title}
                    </h2>
                    <div className='mt-2 flex flex-col w-full gap-2'>
                        <p className='text-zinc-600'>By <span className={dark ? 'text-secondary font-medium' : 'text-primary font-medium'}>{event.speaker}</span></p>
                    </div>
                    <p className={`mt-4 ${dark ? 'text-zinc-300' : 'text-zinc-600'}`}>
                        {event.description}
                    </p>
                </div>
                <ul className='w-full flex items-center gap-4 mt-4 flex-wrap'>
                    {event.tags.map((tag, index) => (
                        <li key={index} className={`py-2 px-3 rounded-full ${dark ? 'bg-zinc-400/20 text-white' : 'bg-primary/20 text-primary'} text-sm`}>{tag}</li>
                    ))}
                </ul>
                <div className="mt-8">
                    <div className="flex items-center gap-2 mb-2">
                        <Icon path={mdiCalendarMonth} size={0.85} className={dark ? 'text-zinc-400' : 'text-zinc-500'} />
                        <span className={dark ? 'text-zinc-300' : 'text-zinc-600'}>
                            {event.date}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                        <Icon path={mdiClockOutline} size={0.85} className={dark ? 'text-zinc-400' : 'text-zinc-500'} />
                        <span className={dark ? 'text-zinc-300' : 'text-zinc-600'}>
                            {event.times} ({event.hours} minutes)
                        </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                        <Icon path={mdiMapMarker} size={0.85} className={dark ? 'text-zinc-400' : 'text-zinc-500'} />
                        <span className={dark ? 'text-zinc-300' : 'text-zinc-600'}>
                            {event.location}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2 sm:hidden">
                        <Icon path={mdiCurrencyUsd} size={0.85} className={dark ? 'text-zinc-400' : 'text-zinc-500'} />
                        <span className={dark ? 'text-secondary' : 'text-primary'}>{event.price}</span>
                    </div>
                    <div className="flex items-center justify-between mt-6">
                        <span className={`text-lg font-semibold hidden sm:block ${dark ? 'text-secondary' : 'text-primary'}`}>
                            ${event.price}
                        </span>
                        <div className='w-full sm:w-auto flex flex-col sm:flex-row items-center gap-4'>
                            <button
                                onClick={() => buySession(event)}
                                className={`w-full sm:w-fit px-6 py-2 rounded-md ${dark ? 'bg-secondary hover:bg-darkSecondary' : 'bg-primary hover:bg-darkPrimary'} text-white transition-all duration-150`}
                            >
                                Buy Now
                            </button>
                            <button onClick={() => handleAddToWishlist(event)} className={`w-full sm:w-fit px-6 py-2 rounded-md bg-transparent border ${dark ? 'border-secondary hover:bg-secondary text-secondary hover:text-white' : 'hover:bg-primary border-primary text-primary hover:text-white'} transition-all duration-150 ease-in-out`}>
                                {isSelected ? 'Session has Added' : 'Add to Wishlist'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

FeaturedEvent.propTypes = {
    event: PropTypes.object,
    dark: PropTypes.bool,
    EdgeBottomRight: PropTypes.func,
    EdgeTopLeft: PropTypes.func
};

export default FeaturedEvent;