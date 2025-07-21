// import React from 'react';
import { mdiStar, mdiArrowExpand, mdiShare, mdiCalendar, mdiEye } from "@mdi/js";
import Icon from "@mdi/react";
import { motion } from "motion/react";
import PropTypes from 'prop-types';
import { useCallback, useState } from "react";
import Pagination from "../../UI/pagination";
import AllCardItemsDetail from "./allCardItemsDetail";

const levelStyles = {
    'Beginner': 'text-green-600 bg-green-400/15',
    'Intermediate': 'text-orange-600 bg-orange-400/15',
    'Expert': 'text-red-600 bg-red-400/15'
}

const AllCardItems = ({ webinarsData, dark }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isItemSelected, setIsItemSelected] = useState({});
    const [showItemDetail, setShowItemDetail] = useState(null);

    const itemsPerPage = 6;

    const totalItems = webinarsData.length
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const indexOfLastArticle = currentPage * itemsPerPage;
    const indexOfFirstArticle = indexOfLastArticle - itemsPerPage;
    const currentPages = webinarsData.slice(indexOfFirstArticle, indexOfLastArticle);

    const handlePageChange = (page) => {
        setCurrentPage(page);

        window.scrollTo(0, 0);
    };

    const handleSelectedItem = useCallback((itemId) => {
        setIsItemSelected(prev => ({
            ...prev,
            [itemId]: !prev[itemId]
        }))
    }, [])

    const isSelected = (itemId) => {
        return isItemSelected[itemId] || false
    }

    const handleShowItem = useCallback((itemId) => {
        setShowItemDetail(prev => prev === itemId ? null : itemId)
    }, [])

    const selectedCard = webinarsData.find(card => card.id === showItemDetail);

    return (
        <section className='w-full h-auto flex flex-col items-center gap-6 relative'>
            <ul className="w-full h-auto grid sm:grid-cols-2 lg:grid-cols-3 items-start gap-6">
                {currentPages.map((webinar) => {
                    const itemSelected = isSelected(webinar.id)

                    return (
                        <li
                            key={webinar.id}
                            className={`w-full h-auto rounded-2xl ${dark ? 'bg-zinc-800' : 'bg-white'} shadow-lg overflow-hidden`}
                            aria-label='webinar item'
                        >
                            <div className='w-full h-60 relative'>
                                <div className='w-full h-full bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${'https://placehold.co/600x400'})` }} />
                                <div className='w-full h-full'>
                                    <div className='w-auto h-auto absolute top-5 right-5 z-[2]'>
                                        <div className='px-2 py-1 flex items-center gap-2 bg-zinc-900 rounded'>
                                            <motion.div
                                                className={`size-[6px] bg-red-600 rounded-full opacity-0 ${webinar.status === 'live' ? 'block' : 'hidden'}`}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.5, ease: 'easeIn', repeat: Infinity }}
                                            />
                                            <span className='text-white text-sm capitalize'>{webinar.status}</span>
                                        </div>
                                    </div>
                                    <div className='w-auto h-auto absolute bottom-5 left-5 z-[2]'>
                                        <span className={`w-auto py-1 px-2 rounded ${dark ? 'bg-secondary' : 'bg-primary'} text-white`}>{webinar.duration}</span>
                                    </div>
                                    <div className="w-auto h-auto absolute bottom-5 right-5 z-[2]">
                                        <span className={`py-1 px-3 rounded-md ${levelStyles[webinar.level] || 'text-zinc-600 bg-zinc-500/15'} text-sm font-medium'}`}>
                                            {webinar.level}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full h-auto p-6 flex flex-col justify-center gap-4">
                                <h3 className={`w-full h-14 overflow-y-hidden text-xl font-semibold ${dark ? 'text-white' : 'text-zinc-900'}`}>{webinar.title}</h3>
                                <div className="w-full h-auto flex items-center gap-2 justify-between">
                                    <span className={dark ? 'text-sm text-zinc-400' : 'text-sm text-zinc-500'}>by {webinar.speaker}</span>
                                    <span className={`w-auto h-auto flex items-center gap-1 ${dark ? 'text-zinc-300' : 'text-zinc-600'}`}>
                                        <Icon path={mdiStar} size={0.8} className="text-yellow-400" />
                                        <>{webinar.rates}</>
                                    </span>
                                </div>
                                <ul className="w-full h-auto flex flex-wrap items-center gap-2">
                                    {webinar.tags.map((tag, index) => (
                                        <li key={index} className={`py-1 px-2 rounded-full text-sm capitalize ${dark ? 'text-white bg-white/15' : 'text-zinc-600 bg-primary/15'} backdrop-blur`}>{tag}</li>
                                    ))}
                                </ul>
                                <div className="w-full h-auto flex items-center justify-between gap-3">
                                    <div className={`w-auto h-auto flex items-center gap-1 text-sm ${dark ? 'text-zinc-300' : 'text-zinc-600'}`}>
                                        <Icon path={mdiCalendar} size={0.75} />
                                        <span>{webinar.date}</span>
                                    </div>
                                    <div className="w-auto h-auto flex items-center gap-1">
                                        <span className={`w-auto h-auto text-sm ${dark ? 'text-zinc-400' : 'text-zinc-500'} flex items-center gap-1`}>
                                            <Icon path={mdiEye} size={0.75} />
                                            <>{webinar.views} views</>
                                        </span>
                                    </div>
                                </div>
                                <div className="w-full h-auto flex justify-between items-center">
                                    <span className={dark ? "text-zinc-400" : "text-zinc-500"}>
                                        Costs:
                                    </span>
                                    <span className={`text-xl font-semibold ${dark ? 'text-secondary' : 'text-primary'}`}>
                                        ${webinar.costs}
                                    </span>
                                </div>
                                <div className="w-full h-auto flex items-center gap-2">
                                    <div className="w-full h-auto flex items-center gap-2">
                                        <button
                                            type="button"
                                            className={`w-full h-auto py-2 px-3 ${dark ? 'text-secondary bg-secondary hover:bg-darkSecondary' : 'bg-primary hover:bg-darkPrimary'} text-white transition-colors duration-150 ease-in`}
                                            onClick={() => handleSelectedItem(webinar.id)}
                                            aria-label={webinar.costs === 0 ? (itemSelected ? 'Booked' : 'Book Now') : (itemSelected ? 'Bought' : 'Buy Now')}
                                        >
                                            {webinar.costs === 0 ? (itemSelected ? 'Booked' : 'Book Now') : (itemSelected ? 'Bought' : 'Buy Now')}
                                        </button>
                                    </div>
                                    <div className="w-auto h-auto flex gap-2">
                                        <button
                                            type="button"
                                            className={`w-auto h-auto border rounded p-2 bg-transparent ${dark ? 'border-zinc-400 bg-transparent text-zinc-300 hover:border-secondary hover:bg-secondary' : 'border-zinc-500 text-zinc-600 bg-transparent hover:border-primary hover:bg-primary'} hover:text-white ease-in-out transition-all duration-150`}
                                            onClick={() => handleShowItem(webinar.id)}
                                            aria-label="webinar detail"
                                        >
                                            <Icon path={mdiArrowExpand} size={1} />
                                        </button>
                                        <button
                                            type="button"
                                            className={`w-auto h-auto border rounded p-2 ${dark ? 'border-zinc-400 bg-transparent text-zinc-300 hover:border-secondary hover:bg-secondary' : 'border-zinc-500 bg-transparent text-zinc-600 hover:border-primary hover:bg-primary'} hover:text-white ease-in-out transition-all duration-150`}
                                            aria-label="share webinar"
                                        >
                                            <Icon path={mdiShare} size={1} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
            {selectedCard && (
                <AllCardItemsDetail
                    selectedCard={selectedCard}
                    setShowItemDetail={setShowItemDetail}
                    dark={dark}
                    levelStyles={levelStyles}
                    isSelected={isSelected}
                    handleSelectedItem={handleSelectedItem}
                />
            )}
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                dark={dark}
            />
        </section>
    )
};

AllCardItems.propTypes = {
    webinarsData: PropTypes.array.isRequired,
    dark: PropTypes.bool
}

export default AllCardItems;