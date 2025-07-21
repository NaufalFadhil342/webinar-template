// import React from 'react';
import { motion } from "motion/react";
import PropTypes from 'prop-types';
import Icon from "@mdi/react";
import { mdiShare, mdiEye, mdiCalendar, mdiStar } from "@mdi/js";

const AllCardItemsDetail = ({
    selectedCard,
    setShowItemDetail,
    dark,
    levelStyles,
    isSelected,
    handleSelectedItem
}) => {
    const isItemSelected = isSelected(selectedCard?.id)

    return (
        <section className='fixed w-full h-screen flex flex-col gap-6 items-center justify-center left-0 top-0 z-[2] bg-zinc-900/70 px-[8%]'>
            <button
                className={`size-8 text-xl font-medium flex items-center justify-center ${dark ? 'bg-white text-zinc-600 hover:bg-secondary' : 'bg-white text-zinc-600 hover:bg-primary'} hover:text-white rounded-full transition-colors duration-150 ease-in-out`}
                onClick={() => setShowItemDetail(null)}
            >
                x
            </button>

            <div className={`w-full h-auto rounded-xl flex ${dark ? 'bg-zinc-800' : 'bg-white'} shadow-lg overflow-hidden`}>
                <div className='w-full h-auto relative hidden md:block'>
                    <div className='w-full h-full bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${'https://placehold.co/600x400'})` }} />
                    <div className='w-full h-full'>
                        <div className='w-auto h-auto absolute top-5 right-5 z-[2]'>
                            <div className='px-2 py-1 flex items-center gap-2 bg-zinc-900 rounded'>
                                <motion.div
                                    className={`size-[6px] bg-red-600 rounded-full opacity-0 ${selectedCard?.status === 'live' ? 'block' : 'hidden'}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, ease: 'easeIn', repeat: Infinity }}
                                />
                                <span className='text-white text-sm capitalize'>{selectedCard?.status}</span>
                            </div>
                        </div>
                        <div className='w-auto h-auto absolute bottom-5 left-5 z-[2]'>
                            <span className={`w-auto py-1 px-2 rounded ${dark ? 'bg-secondary' : 'bg-primary'} text-white`}>{selectedCard?.duration}</span>
                        </div>
                        <div className="w-auto h-auto absolute bottom-5 right-5 z-[2]">
                            <span className={`py-1 px-3 rounded-md ${levelStyles[selectedCard?.level] || 'text-zinc-600 bg-zinc-500/15'} text-sm font-medium'}`}>
                                {selectedCard?.level}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="w-full h-auto p-6 flex flex-col justify-center gap-4">
                    <div className="w-full h-auto flex flex-col gap-2">
                        <h3 className={`text-xl font-semibold ${dark ? 'text-white' : 'text-zinc-900'}`}>{selectedCard?.title}</h3>
                        <p className={dark ? 'text-zinc-300' : 'text-zinc-600'}>{selectedCard?.summery}</p>
                    </div>
                    <div className="w-full h-auto flex items-center gap-2 justify-between">
                        <span className={dark ? 'text-sm text-zinc-400' : 'text-sm text-zinc-500'}>by {selectedCard?.speaker}</span>
                        <span className={`w-auto h-auto flex items-center gap-1 ${dark ? 'text-zinc-300' : 'text-zinc-600'}`}>
                            <Icon path={mdiStar} size={0.8} className="text-yellow-400" />
                            <>{selectedCard?.rates}</>
                        </span>
                    </div>
                    <ul className="w-full h-auto flex flex-wrap items-center gap-2">
                        {selectedCard?.tags.map((tag, index) => (
                            <li key={index} className={`py-1 px-2 rounded-full text-sm capitalize ${dark ? 'text-white bg-white/15' : 'text-zinc-600 bg-primary/15'} backdrop-blur`}>{tag}</li>
                        ))}
                    </ul>
                    <div className="w-full h-auto flex items-center justify-between gap-3">
                        <div className={`w-auto h-auto flex items-center gap-1 text-sm ${dark ? 'text-zinc-300' : 'text-zinc-600'}`}>
                            <Icon path={mdiCalendar} size={0.75} />
                            <span>{selectedCard?.date}</span>
                        </div>
                        <div className="w-auto h-auto flex items-center gap-1">
                            <span className={`w-auto h-auto text-sm ${dark ? 'text-zinc-400' : 'text-zinc-500'} flex items-center gap-1`}>
                                <Icon path={mdiEye} size={0.75} />
                                <>{selectedCard?.views} views</>
                            </span>
                        </div>
                    </div>
                    <div className="w-full h-auto flex justify-between items-center">
                        <span className={dark ? "text-zinc-400" : "text-zinc-500"}>
                            Costs:
                        </span>
                        <span className={`text-xl font-semibold ${dark ? 'text-secondary' : 'text-primary'}`}>
                            ${selectedCard?.costs}
                        </span>
                    </div>
                    <div className="w-full h-auto flex items-center gap-2">
                        <div className="w-full h-auto flex items-center gap-2">
                            <button
                                type="button"
                                className={`w-full h-auto py-2 px-3 ${dark ? 'text-secondary bg-secondary hover:bg-darkSecondary' : 'bg-primary hover:bg-darkPrimary'} text-white transition-colors duration-150 ease-in`}
                                onClick={() => handleSelectedItem(selectedCard?.id)}
                                aria-label={selectedCard?.costs === 0 ? (isItemSelected ? 'Booked' : 'Book Now') : (isItemSelected ? 'Bought' : 'Buy Now')}
                            >
                                {selectedCard?.costs === 0 ? (isItemSelected ? 'Booked' : 'Book Now') : (isItemSelected ? 'Bought' : 'Buy Now')}
                            </button>
                            <button
                                type="button"
                                className={`w-auto h-auto border rounded p-2 ${dark ? 'border-zinc-400 bg-transparent text-zinc-300 hover:border-secondary hover:bg-secondary' : 'border-zinc-500 bg-transparent text-zinc-600 hover:border-primary hover:bg-primary'} hover:text-white ease-in-out transition-all duration-150`}
                                aria-label="share selectedCard?"
                            >
                                <Icon path={mdiShare} size={1} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

AllCardItemsDetail.propTypes = {
    selectedCard: PropTypes.object,
    setShowItemDetail: PropTypes.func,
    dark: PropTypes.bool,
    levelStyles: PropTypes.object,
    isSelected: PropTypes.func.isRequired,
    handleSelectedItem: PropTypes.func.isRequired
}

export default AllCardItemsDetail;