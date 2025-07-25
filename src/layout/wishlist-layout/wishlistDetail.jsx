import WishlistDetailStats from './wishlistDetailStats';
import WishlistDetailItems from './wishlistDetailItems';
import { useSessions } from '../../hooks/useSessions';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';

const WishlistDetail = ({ dark }) => {
    const { selectedSessions, removeSession, addSession } = useSessions();
    const navigate = useNavigate();

    // Handle empty state - check for both null/undefined AND empty array
    if (!selectedSessions || !Array.isArray(selectedSessions) || selectedSessions.length === 0) {
        return (
            <div className='w-full h-auto flex items-center justify-center min-h-64'>
                <div className='text-center'>
                    <h1 className='text-zinc-500 font-semibold text-4xl mb-4'>
                        No Sessions Added to Your Wishlist
                    </h1>
                    <p className='text-zinc-400 text-lg'>
                        Start exploring sessions and add them to your wishlist to see them here.
                    </p>
                </div>
            </div>
        );
    };

    const buySelectedSession = (session) => {
        if (!session || !session.id) {
            console.error('Invalid session data:', session);
            return;
        }

        addSession(session);
        sessionStorage.setItem('buyingSessionId', session.id);

        navigate('/payment', { state: { buyingSession: session } });
        window.scrollTo(0, 0);
    };

    return (
        <section className='w-full h-auto flex flex-col gap-10 pb-24'>
            <div>
                <WishlistDetailStats selectedSessions={selectedSessions} dark={dark} />
            </div>
            <div className='w-full h-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start gap-8 mt-6'>
                {selectedSessions?.map((session) => (
                    <WishlistDetailItems key={session?.id} session={session} removeSession={removeSession} buySelectedSession={buySelectedSession} dark={dark} />
                ))}
            </div>
        </section>
    );
};

WishlistDetail.propTypes = {
    dark: PropTypes.bool
}

export default WishlistDetail;