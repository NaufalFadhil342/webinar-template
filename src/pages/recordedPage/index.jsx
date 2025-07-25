import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import Header from '../../components/header';
import { RECORDED_HEADER as header } from '../../config/configData';
import FilterSorting from '../../layout/recorded-layout/filterSorting';
import AllRecordedSessions from '../../layout/recorded-layout/allRecordedSessions';
import { recordedDummyData as recordedData } from '../../data/recordedData';
import Icon from '@mdi/react';
import { mdiMagnify } from '@mdi/js';
import { motion } from 'motion/react';

// Helper function for handle error
import { getErrorMessage } from '../../UI/errors';

// Helper function for filtering the recorded 
import { getRecordsFilter } from '../../utils/helper/getRecordsFilter';

import ToTop from '../../UI/toTop';
import PropTypes from 'prop-types';

const RecordedPage = ({ dark }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchInput, setSearchInput] = useState('');

    const getDefaultFilters = () => ({
        sort: 'Most Recent',
        search: '',
        category: 'all',
        date: { label: 'All Times', value: 'all' },
        duration: { label: 'All Durations', value: 'all' }
    })

    const [currentFilters, setCurrentFilters] = useState(getDefaultFilters);

    // checking filter by search using parameters
    useEffect(() => {
        const filtersFromParams = {
            sort: searchParams.get('sort') || 'Most Recent',
            search: searchParams.get('search') || '',
            category: searchParams.get('category') || 'all',
            date: {
                label: searchParams.get('dateLabel') || 'All Times',
                value: searchParams.get('date') || 'all'
            },
            duration: {
                label: searchParams.get('durationLabel') || 'All Durations',
                value: searchParams.get('duration') || 'all'
            }
        };

        const searchFromUrl = searchParams.get('search') || '';

        setCurrentFilters(filtersFromParams);
        setSearchInput(searchFromUrl);
    }, [searchParams]);

    const updateSearchParams = useCallback((filters) => {
        const params = new URLSearchParams();

        if (filters.sort !== 'Most Recent') params.set('sort', filters.sort);
        if (filters.search) params.set('search', filters.search);
        if (filters.category !== 'all') params.set('category', filters.category);
        if (filters.date.value !== 'all') {
            params.set('date', filters.date.value);
            params.set('dateLabel', filters.date.label);
        }
        if (filters.duration.value !== 'all') {
            params.set('duration', filters.duration.value);
            params.set('durationLabel', filters.duration.label);
        }

        setSearchParams(params);
    }, [setSearchParams]);

    const filteredRecorded = useMemo(() => {
        if (!recordedData || recordedData.length === 0) return [];

        return getRecordsFilter(recordedData, currentFilters);
    }, [currentFilters]);

    const handleFilterChange = useCallback((filterType, value) => {
        const newsFilters = {
            ...currentFilters,
            [filterType]: value
        }

        setCurrentFilters(newsFilters);
        updateSearchParams(newsFilters);
    }, [currentFilters, updateSearchParams]);

    const handleSearchInputChange = useCallback((event) => {
        setSearchInput(event.target.value);
    }, []);

    const handleSearchSubmit = useCallback((searchValue = searchInput) => {
        handleFilterChange('search', searchValue.trim());
    }, [searchInput, handleFilterChange]);

    // Useful function to enter by pressing "Enter" on your keyboard
    const handleSearchKeyDown = useCallback((event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSearchSubmit();
        }
    }, [handleSearchSubmit]);

    const handleSearchButtonClick = useCallback(() => {
        handleSearchSubmit();
    }, [handleSearchSubmit]);

    const handleResetFilters = () => {
        const defaultFilters = {
            sort: 'Most Recent',
            search: '',
            category: 'all',
            date: { label: 'All Times', value: 'all' },
            duration: { label: 'All Durations', value: 'all' }
        };

        setCurrentFilters(defaultFilters);
        setSearchParams(new URLSearchParams());
    };

    const NoResultsFound = () => {
        const errorMessage = getErrorMessage(currentFilters);
        const hasActiveFilters = currentFilters.search.trim() !== '' ||
            currentFilters.category !== 'all' ||
            currentFilters.date.value !== 'all' ||
            currentFilters.duration.value !== 'all';

        return (
            <div className="w-full px-[8%] pt-12 pb-24 flex flex-col items-center justify-center text-center">
                <motion.div
                    className='text-zinc-700 opacity-0'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', times: [0, 0.5, 1] }}
                >
                    <Icon path={mdiMagnify} size={3} />
                </motion.div>
                <h3 className={`text-3xl font-bold mb-4 ${dark ? 'text-white' : 'text-zinc-900'}`}>
                    {errorMessage.title}
                </h3>

                <p className={`text-base mb-6 max-w-2xl leading-relaxed ${dark ? 'text-zinc-300' : 'text-zinc-600'}`}>
                    {errorMessage.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                    {hasActiveFilters && (
                        <button
                            onClick={handleResetFilters}
                            className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 ${dark
                                ? 'bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-600/25'
                                : 'bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-600/25'
                                }`}
                        >
                            <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Clear All Filters
                        </button>
                    )}

                    <button
                        onClick={() => {
                            setCurrentFilters(prev => ({ ...prev, search: '' }));
                        }}
                        className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 border-2 hover:scale-105 ${dark
                            ? 'border-zinc-600 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-500'
                            : 'border-zinc-300 text-zinc-700 hover:bg-zinc-50 hover:border-zinc-400'
                            }`}
                    >
                        <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h4a1 1 0 011 1v2h4a1 1 0 110 2h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4z" />
                        </svg>
                        Browse All Sessions
                    </button>
                </div>
            </div>
        );
    };

    return (
        <main className='w-full h-auto'>
            <Header
                dark={dark}
                tagline='Recorded'
                ariaLabel='Recorded header'
                title={header.title}
                description={header.description}
            />
            <section className='w-full h-auto flex flex-col gap-10' aria-label='Recorded Content'>
                <FilterSorting
                    dark={dark}
                    searchInput={searchInput}
                    handleSearchInputChange={handleSearchInputChange}
                    handleSearchKeyDown={handleSearchKeyDown}
                    handleSearchButtonClick={handleSearchButtonClick}
                    handleFilterChange={handleFilterChange}
                    currentFilters={currentFilters}
                />
                {filteredRecorded.length === 0 ? (
                    <NoResultsFound />
                ) : (
                    <AllRecordedSessions recordedData={filteredRecorded} dark={dark} />
                )}
            </section>
            <ToTop dark={dark} />
        </main>
    )
};

RecordedPage.propTypes = {
    dark: PropTypes.bool
};

export default RecordedPage;