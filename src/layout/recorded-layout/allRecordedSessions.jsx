import { useState } from 'react';
import Icon from '@mdi/react';
import { mdiBookmarkPlusOutline, mdiBookmarkPlus, mdiClock, mdiStar, mdiCalendar, mdiDownload, mdiShare, mdiPlay } from '@mdi/js';
import PropTypes from 'prop-types';
import { motion } from 'motion/react';

const AllRecordedSessions = ({ recordedData, dark }) => {
    const [bookItems, setBookItems] = useState({});
    const [showPlayBtn, setShowPlayBtn] = useState(null);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const handleBookmark = (recordedId) => {
        setBookItems(prev => ({
            ...prev,
            [recordedId]: !prev[recordedId]
        }))
    };

    const isBookmark = (recordedId) => {
        return bookItems[recordedId] || false;
    };

    const handleShowPlayBtn = (recordedId) => setShowPlayBtn(recordedId);
    const handleHidePlayBtn = () => setShowPlayBtn(null);

    return (
        <section className='w-full h-auto pt-10 pb-24 px-[8%]'>
            <ul className='w-full h-auto grid lg:grid-cols-2 gap-8'>
                {recordedData.map((recorded) => {
                    const itemIsBooked = isBookmark(recorded.id);

                    return (
                        <li key={recorded.id} className='w-full h-auto shadow-lg flex flex-col rounded-lg overflow-hidden'>
                            <div className='w-full h-60 p-4 relative bg-gradient-to-br from-primary to-secondary' onMouseEnter={() => handleShowPlayBtn(recorded.id)} onMouseLeave={handleHidePlayBtn}>
                                <button
                                    className={`group size-9 absolute z-[3] top-4 right-4 flex items-center justify-center ${itemIsBooked ? 'bg-zinc-100' : 'bg-zinc-100/65'} backdrop-blur rounded-full outline-none hover:bg-zinc-100 transition-all duration-150 ease-in`}
                                    onClick={() => handleBookmark(recorded.id)}
                                >
                                    <Icon
                                        path={itemIsBooked ? mdiBookmarkPlus : mdiBookmarkPlusOutline}
                                        size={0.75}
                                        className={itemIsBooked ? 'text-primary' : 'text-zinc-600'} />
                                </button>
                                <div className='absolute bottom-4 left-4 z-[3] bg-zinc-500 rounded text-white py-1 px-2 flex items-center gap-1 text-sm'>
                                    <Icon path={mdiClock} size={0.6} className='text-white' />
                                    <span>{recorded.duration}</span>
                                </div>
                                <motion.div
                                    className='w-full h-full bg-zinc-900/65 absolute z-[1] top-0 left-0 flex justify-center items-center opacity-0 scale-0'
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{
                                        opacity: showPlayBtn === recorded.id ? 1 : 0,
                                        scale: showPlayBtn === recorded.id ? 1 : 0
                                    }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                >
                                    <motion.button
                                        className='size-12 bg-white rounded-full flex items-center justify-center'
                                        initial={{ scale: 1 }}
                                        whileHover={{ scale: 1.25 }}
                                        transition={{ duration: 0.3, ease: 'circInOut' }}
                                        type='button'
                                    >
                                        <Icon path={mdiPlay} size={1.5} className='text-zinc-700' />
                                    </motion.button>
                                </motion.div>
                            </div>
                            <div className={`w-full h-auto px-5 py-4 ${dark ? 'bg-zinc-800' : 'bg-white'} flex flex-col gap-4 overflow-x-hidden`}>
                                <div className='w-full h-auto flex items-center justify-between'>
                                    <div className='w-full h-auto flex items-center gap-2'>
                                        <span className='size-11 rounded-full overflow-hidden'>
                                            <img className='w-full h-full object-cover object-center' src={recorded.speakerImage} alt={recorded.speaker} />
                                        </span>
                                        <span className={`text-sm ${dark ? 'text-zinc-300' : 'text-zinc-500'}`}>{recorded.speaker}</span>
                                    </div>
                                    <div className='w-auto h-auto flex items-center gap-1'>
                                        <Icon path={mdiStar} size={0.75} className='text-yellow-400' />
                                        <span className={`${dark ? 'text-zinc-300' : 'text-zinc-600'} font-medium`}>{recorded.rating}</span>
                                    </div>
                                </div>
                                <div className='w-full h-auto'>
                                    <h3 className={`text-xl ${dark ? 'text-white' : 'text-zinc-900'} font-medium`}>{recorded.title}</h3>
                                    <p className={`text-sm ${dark ? 'text-zinc-400' : 'text-zinc-500'} mt-2`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla fugiat tenetur doloremque at nemo optio.</p>
                                </div>
                                <ul className='w-full h-auto flex items-center gap-2'>
                                    {recorded.tags.map((tag, index) => (
                                        <li key={index} className={`py-1 px-2 text-xs ${dark ? 'bg-white/10 text-white' : 'bg-primary/10 text-zinc-600'} rounded`}>{tag}</li>
                                    ))}
                                </ul>
                                <div className='w-full h-auto flex items-center gap-4 justify-between'>
                                    <span className={`flex items-center gap-1 ${dark ? 'text-white' : 'text-zinc-600'} text-sm`}>
                                        <Icon path={mdiCalendar} size={0.75} />
                                        <>{formatDate(recorded.date)}</>
                                    </span>
                                    <span className={`flex items-center gap-1 ${dark ? 'text-white' : 'text-zinc-600'} text-sm`}>
                                        {recorded.views.toLocaleString()} views
                                    </span>
                                </div>
                                <div className='w-full h-auto flex gap-2'>
                                    <button
                                        className={`w-full h-10 flex items-center justify-center rounded ${dark ? 'bg-secondary hover:bg-darkSecondary' : ' bg-primary hover:bg-darkPrimary'} text-white transition-colors duration-150 ease-in-out`}
                                        type='button'
                                    >
                                        Watch Now
                                    </button>
                                    <button
                                        type='button'
                                        className={`w-12 h-10 rounded border flex items-center justify-center ${dark ? 'border-zinc-400/75 hover:border-secondary text-zinc-300 hover:text-secondary' : 'border-zinc-500/50 text-zinc-600 hover:border-primary hover:text-primary'} transition-colors ease-in`}
                                    >
                                        <Icon path={mdiDownload} size={0.8} />
                                    </button>
                                    <button
                                        type='button'
                                        className={`w-12 h-10 rounded border flex items-center justify-center ${dark ? 'border-zinc-400/75 hover:border-secondary text-zinc-300 hover:text-secondary' : 'border-zinc-500/50 text-zinc-600 hover:border-primary hover:text-primary'} transition-colors ease-in`}
                                    >
                                        <Icon path={mdiShare} size={0.8} />
                                    </button>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
};

AllRecordedSessions.propTypes = {
    recordedData: PropTypes.array.isRequired,
    dark: PropTypes.bool
}

export default AllRecordedSessions