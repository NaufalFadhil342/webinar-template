import { useCallback, useMemo, useState } from 'react';
import HighLight from './highlight';
import PropTypes from 'prop-types';
import { allWebinarsData } from '../../data/allwebinarsData';
import AllCardItems from './allCardItems';
import ToTop from '../../UI/toTop';
import { getSearchsFilter } from '../../utils/helper/getSearchsFilter';
import { getSearchErrorMessage } from '../../UI/errors';
import Icon from '@mdi/react';
import { mdiFilter } from '@mdi/js';

const defaultResultFilter = {
    sort: 'Most Relevant',
    status: 'all',
    category: '',
    rates: '',
    languages: [],
    duration: [],
    level: ['all level'],
    date: {
        from: '',
        to: ''
    },
    costs: ''
};

const ResultPage = ({ dark }) => {
    const [currentResult, setCurrentResult] = useState(defaultResultFilter);

    const handleFiltersChange = useCallback((filterType, value) => {
        const newFilters = {
            ...currentResult,
            [filterType]: value
        };

        setCurrentResult(newFilters);
    }, [currentResult]);

    const handleResetFilters = () => {
        setCurrentResult(defaultResultFilter);
    };

    const filterSearched = useMemo(() => {
        const webinarsData = allWebinarsData;

        if (!webinarsData || webinarsData.length === 0) return [];
        return getSearchsFilter(webinarsData, currentResult);
    }, [currentResult]);

    const isFilterReset = () => {
        const defaultFilter = defaultResultFilter;

        return (
            currentResult.status !== defaultFilter.status ||
            currentResult.sort !== defaultFilter.sort ||
            currentResult.category !== defaultFilter.category ||
            currentResult.rates !== defaultFilter.rates ||
            currentResult.languages.length > 0 ||
            currentResult.duration.length > 0 ||
            !(currentResult.level.length === 1 && currentResult.level[0] === 'all level') ||
            currentResult.costs !== defaultFilter.costs ||
            currentResult.date.from !== '' && currentResult.date.to !== ''
        )
    }

    const NoResultFound = () => {
        const showErrorMessage = filterSearched.length === 0

        if (!showErrorMessage) return null;

        const errorMessage = showErrorMessage ? getSearchErrorMessage(currentResult) : null;

        return (
            <div className='w-auto h-auto flex flex-col gap-4 items-center'>
                <div className='size-20 rounded-full flex items-center justify-center bg-primary text-white'>
                    <Icon path={mdiFilter} size={2} />
                </div>
                <h3 className={`text-[2em] font-bold leading-none ${dark ? 'text-white' : 'text-zinc-900'
                    }`}>
                    {errorMessage.title}
                </h3>
                <p className={`text-base ${dark ? 'text-zinc-300' : 'text-zinc-600'
                    }`}>
                    {errorMessage.message}
                </p>
                <p className={`text-sm ${dark ? 'text-zinc-400' : 'text-zinc-500'
                    }`}>
                    {errorMessage.suggestion}
                </p>
                {errorMessage.type === 'no-result' && (
                    <div className="w-auto h-auto flex items-center gap-4 justify-center">
                        <button
                            onClick={handleResetFilters}
                            className={`px-6 py-2 rounded-lg font-medium transition-colors duration-150 ease-in-out text-white ${dark
                                ? 'bg-secondary hover:bg-darkSecondary'
                                : 'bg-primary hover:bg-darkPrimary'
                                }`}
                            aria-label="Clear all active filters"
                        >
                            Remove All Filters
                        </button>
                    </div>
                )}
            </div>
        )
    }

    return (
        <main className='w-full h-auto flex flex-col gap-10 py-20' aria-label='Result page'>
            <section className='w-full h-auto' aria-label='Result content'>
                <div className='w-full h-auto px-[5%] py-6'>
                    <HighLight
                        onFiltersChange={handleFiltersChange}
                        currentResult={currentResult}
                        dark={dark}
                        resetFilters={handleResetFilters}
                        isFilterReset={isFilterReset}
                    />
                </div>
                <div className='w-full h-auto px-[5%] py-6'>
                    {filterSearched.length === 0 ?
                        <NoResultFound /> :
                        <AllCardItems webinarsData={filterSearched} dark={dark} />
                    }
                </div>
            </section>
            <ToTop dark={dark} />
        </main>
    )
};

ResultPage.propTypes = {
    dark: PropTypes.bool
}

export default ResultPage;