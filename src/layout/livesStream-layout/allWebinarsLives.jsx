import { useState } from "react";
import { motion } from "motion/react";
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiPlay, mdiClock, mdiAccountGroup, mdiBookAlphabet } from '@mdi/js';
import WebinarEmptyState from "./webinarEmptyState";

const AllWebinarsLives = ({ webinars, currentFilters, onResetFilters, onViewAll, dark }) => {
    const [showPlay, setShowPlay] = useState(null);

    const handleShowPlay = (webinarId) => {
        setShowPlay(prev => prev === webinarId ? null : webinarId)
    };

    // Function to determine empty state variant
    const getEmptyStateVariant = () => {
        if (!currentFilters) {
            return 'no-data';
        }

        const { status, languages, levels } = currentFilters;

        // Check if any specific filters are applied
        const hasStatusFilter = status !== 'all';
        const hasLanguageFilter = !languages?.isAllSelected;
        const hasLevelFilter = !levels?.isAllSelected;

        if (hasStatusFilter || hasLanguageFilter || hasLevelFilter) {
            return 'filter';
        }

        // If status is 'live' or 'starting', show live variant
        if (status === 'live' || status === 'starting') {
            return 'live';
        }

        return 'no-data';
    };

    // If no webinars, show empty state
    if (!webinars || webinars.length === 0) {
        return (
            <WebinarEmptyState
                onResetFilters={onResetFilters}
                onViewAll={onViewAll}
                variant={getEmptyStateVariant()}
                dark={dark}
            />
        );
    }

    // Render webinars grid
    return (
        <ul className='w-full h-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8'>
            {webinars.map((webinar) => (
                <li key={webinar.id} className="w-full h-auto">
                    <div
                        className="w-full h-60 bg-gradient-to-tr from-primary to-secondary p-4 relative overflow-hidden rounded-t-xl"
                        onMouseEnter={() => handleShowPlay(webinar.id)}
                        onMouseLeave={() => handleShowPlay(null)}
                    >
                        <div className="w-full h-full flex items-end justify-between">
                            <div className="text-sm py-1 px-2 bg-zinc-800 text-white rounded">500 Watching</div>
                            {webinar.isLive && (
                                <button className="py-1 px-2 flex items-center gap-1 rounded text-white font-medium bg-white/30 backdrop-blur text-sm">
                                    <motion.div
                                        className="size-2 bg-white rounded-full"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ ease: "circInOut", duration: 1.25, repeat: Infinity }}
                                    />
                                    <>Live</>
                                </button>)}
                            {webinar.isStarting && (
                                <button className="py-1 px-2 flex items-center gap-1 rounded text-white font-medium bg-amber-500/80 backdrop-blur text-sm">
                                    <Icon path={mdiClock} size={0.65} />
                                    <>Get Ready</>
                                </button>
                            )}
                        </div>
                        {showPlay === webinar.id && (
                            <motion.div
                                className="w-full h-full flex items-center justify-center absolute z-[3] left-0 top-0 bg-zinc-900/50 opacity-0"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                            >
                                <motion.button
                                    type="button"
                                    className="size-14 rounded-full bg-white flex items-center justify-center"
                                    initial={{ scale: 1 }}
                                    whileHover={{ scale: 1.25 }}
                                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                                >
                                    <Icon path={mdiPlay} size={1.5} />
                                </motion.button>
                            </motion.div>
                        )}
                    </div>
                    <div className={`w-full h-auto p-4 flex flex-col gap-4 ${dark ? 'bg-zinc-800' : 'bg-white'} overflow-hidden rounded-b-xl`}>
                        <h4 className={`text-xl font-medium ${dark ? 'text-white' : 'text-zinc-900'}`}>{webinar.title}</h4>
                        <div className='w-auto h-auto flex items-center gap-2'>
                            <div className="size-10 rounded-full overflow-hidden">
                                <img className="w-full h-full object-cover object-center" src={webinar.image} alt={webinar.speaker} />
                            </div>
                            <div className={dark ? 'text-zinc-300' : 'text-zinc-600'}>{webinar.speaker}</div>
                        </div>
                        <div className='w-full h-auto flex flex-row items-center flex-wrap gap-2'>
                            <span className={`flex items-center gap-2 ${dark ? 'text-zinc-300' : 'text-zinc-500'} text-sm`}>
                                <Icon path={mdiClock} size={0.65} className={dark ? 'text-white' : 'text-zinc-800'} />
                                <>500 Viewers</>
                            </span>
                            <span className={`flex items-center gap-2 ${dark ? 'text-zinc-300' : 'text-zinc-500'} text-sm`}>
                                <Icon path={mdiAccountGroup} size={0.65} className={dark ? 'text-white' : 'text-zinc-800'} />
                                <>15 min ago</>
                            </span>
                            <span className={`flex items-center gap-2 ${dark ? 'text-zinc-300' : 'text-zinc-500'} text-sm`}>
                                <Icon path={mdiBookAlphabet} size={0.65} className={dark ? 'text-white' : 'text-zinc-800'} />
                                <>{webinar.language}</>
                            </span>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
};

AllWebinarsLives.propTypes = {
    webinars: PropTypes.array.isRequired,
    currentFilters: PropTypes.object,
    onResetFilters: PropTypes.func,
    onViewAll: PropTypes.func,
    dark: PropTypes.bool
};

export default AllWebinarsLives;