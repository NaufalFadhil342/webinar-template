import Icon from '@mdi/react';
import { mdiCalendar, mdiClock, mdiCash } from '@mdi/js';
import PropTypes from 'prop-types';

const WishlistDetailItems = ({ session, removeSession, buySelectedSession, dark }) => {

    return (
        <div className={`w-full h-auto ${dark ? 'bg-zinc-900/50' : 'bg-white'} rounded-3xl shadow-md overflow-hidden hover:shadow-lg hover:-translate-y-2 duration-150 transition-all ease-in`}>
            <div className={`w-full h-auto p-6 flex flex-col gap-4 ${dark ? 'bg-secondary' : 'bg-primary'}`}>
                <div className='w-full h-auto flex items-start gap-4'>
                    <div className='w-full h-auto grid grid-cols-1 xm:grid-cols-[80px_1fr] sm:grid-cols-1 md:grid-cols-[80px_1fr] lg:grid-cols-1 xl:grid-cols-[80px_1fr] gap-4 items-center'>
                        <div className='size-20 overflow-hidden rounded-full'>
                            <img className='w-full h-full object-cover object-center' src={session.image} alt={session.speaker} />
                        </div>
                        <div className='w-auto h-auto'>
                            <h4 className='text-lg font-medium text-white'>{session.speaker}</h4>
                            <div className='text-sm text-zinc-200'>{session.field}</div>
                        </div>
                    </div>
                    <button onClick={() => removeSession(session.id)} className='group w-10 h-8 flex items-center justify-center bg-white/30 backdrop-blur rounded-full hover:bg-white/100 transition-all duration-150 ease-in-out'>
                        <span className='text-sm font-semibold text-white group-hover:text-zinc-600 transition-all duration-150 ease-in-out'>x</span>
                    </button>
                </div>
                <div className='w-full h-auto'>
                    <h2 className='font-medium text-white text-xl'>{session.title}</h2>
                </div>
            </div>
            <div className='w-full h-auto flex flex-col gap-4 bg-transparent p-6'>
                <div className='w-full h-auto flex flex-wrap gap-4'>
                    <span className={`flex items-end gap-2 ${dark ? 'text-zinc-300' : 'text-zinc-500'} text-sm`}>
                        <Icon path={mdiCalendar} size={0.8} />
                        <>{session.date}</>
                    </span>
                    <span className={`flex items-end gap-2 ${dark ? 'text-zinc-300' : 'text-zinc-500'} text-sm`}>
                        <Icon path={mdiClock} size={0.8} />
                        <>{session.times} - {session.hours} minutes</>
                    </span>
                    <span className={`flex items-end gap-2 ${dark ? 'text-zinc-300' : 'text-zinc-500'} text-sm`}>
                        <Icon path={mdiCash} size={0.8} />
                        <>${session.price}</>
                    </span>
                </div>
                <ul className='flex items-center flex-wrap gap-2'>
                    {(session.tags || []).map((tag, index) => (
                        <li key={index} className={`py-2 px-4 rounded-full ${dark ? 'bg-zinc-600/80 text-secondary' : 'bg-zinc-300/50 text-primary'} text-sm`}>{tag}</li>
                    ))}
                </ul>
                <div className='w-full h-auto flex flex-col xm:flex-row sm:flex-col md:flex-row lg:flex-col xl:flex-row gap-4 mt-2'>
                    <button
                        onClick={() => buySelectedSession(session)}
                        className={`w-full h-auto py-2 px-4 rounded-full text-white ${dark ? 'bg-secondary hover:bg-darkSecondary' : 'bg-primary hover:bg-darkPrimary'} duration-150 transition-all ease-in-out`}
                    >
                        Buy Lecture
                    </button>
                    <button className={`w-full h-auto py-2 px-4 rounded-full bg-transparent border ${dark ? 'border-white text-white hover:bg-white hover:text-secondary' : 'border-primary text-primary hover:bg-primary hover:text-white'} duration-150 transition-all ease-in-out`}>Share</button>
                </div>
            </div>
        </div>
    )
};

WishlistDetailItems.propTypes = {
    session: PropTypes.object.isRequired,
    removeSession: PropTypes.func.isRequired,
    buySelectedSession: PropTypes.func.isRequired,
    dark: PropTypes.bool
};

export default WishlistDetailItems;