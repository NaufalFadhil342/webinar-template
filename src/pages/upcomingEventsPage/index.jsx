import { Fragment, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import Header from "../../components/header";
import { EVENTS_HEADER as events } from "../../config/configData";
import PropTypes from 'prop-types';
import FeaturedEvents from "../../layout/upcomingEvents-layout/featuredEvents";
import { dummyEvents as eventsData } from "../../data/eventsData";
import SearchFilters from "../../layout/upcomingEvents-layout/searchFilters";
import ToTop from '../../UI/toTop';
import NewsLetter from "../../layout/upcomingEvents-layout/newsLetter";
import { getEventsErrorMessage } from "../../UI/errors";
import { usePageLoading } from "../../hooks/usePageLoading";
import LoadingOverlay from "../../components/loadingOverlay";
import { failLoadData as message } from "../../config/configData";

const UpcomingEventsPage = ({ dark }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { isLoading, stopLoading } = usePageLoading({
        initialDelay: 0,
        minDuration: 400,
        maxDuration: 1400,
        autoStart: true
    })
    const [, setPageData] = useState();

    const searchTerm = searchParams.get('search') || '';
    const selectedCategory = searchParams.get('category') || '';
    const selectedDate = searchParams.get('date') || '';

    const createSearchFilter = (term) => (event) => {
        if (!term) return true;
        const searchLower = term.toLowerCase();
        return event.title.toLowerCase().includes(searchLower) ||
            event.description.toLowerCase().includes(searchLower) ||
            event.category.toLowerCase().includes(searchLower);
    };

    const createCategoryFilter = (category) => (event) => {
        return category ? event.category === category : true;
    };

    const createDateFilter = (date) => (event) => {
        return date ? event.date === date : true;
    };

    const applyFilters = (events, filters) => {
        return events.filter(event => filters.every(filter => filter(event)));
    };

    const categories = [...new Set(eventsData.map(event => event.category))];
    const dates = [...new Set(eventsData.map(event => event.date))];

    const filteredEvents = useMemo(() => {
        const filters = [
            createSearchFilter(searchTerm),
            createCategoryFilter(selectedCategory),
            createDateFilter(selectedDate)
        ];

        return applyFilters(eventsData, filters);
    }, [searchTerm, selectedCategory, selectedDate]);

    const featuredEvents = filteredEvents.filter(event => event.featured);

    const updateSearchParams = (key, value) => {
        const newParams = new URLSearchParams(searchParams);

        if (value && value.trim() !== '') {
            newParams.set(key, value);
        } else {
            newParams.delete(key);
        }

        setSearchParams(newParams, { replace: true });
    };

    const handleSearchChange = (value) => {
        updateSearchParams('search', value);
    };

    const handleCategoryChange = (value) => {
        updateSearchParams('category', value);
    };

    const handleDateChange = (value) => {
        updateSearchParams('date', value);
    };

    const handleClearFilters = () => {
        setSearchParams({}, { replace: true });
    };

    useEffect(() => {
        const fetchPageData = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 800));
                setPageData({ loaded: true });
            } catch (error) {
                console.error(message.error, error);
            } finally {
                stopLoading();
            }
        }

        fetchPageData();
    }, [stopLoading])

    const shouldShowError = filteredEvents.length === 0;

    const NoResultFound = () => {
        if (!shouldShowError) return null;

        const error = shouldShowError ? getEventsErrorMessage(searchTerm, selectedCategory, selectedDate, eventsData) : null;

        return (
            <div className='w-full max-w-2xl text-center mx-auto mt-5'>
                <h3 className={`text-[2em] font-bold mb-3 ${dark ? 'text-white' : 'text-zinc-900'
                    }`}>
                    {error.title}
                </h3>
                <p className={`text-base mb-4 ${dark ? 'text-zinc-300' : 'text-zinc-600'
                    }`}>
                    {error.message}
                </p>
                <p className={`text-sm mb-6 ${dark ? 'text-zinc-400' : 'text-zinc-500'
                    }`}>
                    {error.suggestion}
                </p>
                {error.type === 'no-results' && (
                    <div className="w-auto h-auto flex items-center gap-4 justify-center">
                        <button
                            onClick={handleClearFilters}
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
        );
    }

    return (
        <Fragment>
            <LoadingOverlay isLoading={isLoading} dark={dark} />
            <main className='w-full h-auto'>
                <Header
                    ariaLabel="Events Header"
                    tagline="events"
                    title={events.title}
                    dark={dark}
                />
                <section aria-labelledby="Events Content">
                    <div className="w-full h-auto flex flex-col gap-10" id="Events Content">
                        <SearchFilters
                            categories={categories}
                            dates={dates}
                            dark={dark}
                            searchTerm={searchTerm}
                            selectedCategory={selectedCategory}
                            selectedDate={selectedDate}
                            onSearchChange={handleSearchChange}
                            onCategoryChange={handleCategoryChange}
                            onDateChange={handleDateChange}
                        />
                        {shouldShowError ? (
                            <NoResultFound />
                        ) : (
                            <FeaturedEvents featuredEvents={featuredEvents} dark={dark} />
                        )}
                        <NewsLetter dark={dark} />
                    </div>
                </section>
                <ToTop dark={dark} />
            </main>
        </Fragment>
    )
};

UpcomingEventsPage.propTypes = {
    dark: PropTypes.bool
}

export default UpcomingEventsPage;