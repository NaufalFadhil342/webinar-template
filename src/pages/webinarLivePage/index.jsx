import { useState, useCallback, useMemo, useEffect, Fragment } from 'react';
import Header from '../../components/header';
import { WEBINARLIVE_HEADER as header } from '../../config/configData';
import PropTypes from 'prop-types';
import PopularWebinars from '../../layout/livesStream-layout/popularWebinars';
import LiveFilter from '../../layout/livesStream-layout/liveFilter';
import { dummyEvents as webinars } from '../../data/eventsData';
import { languageDummyData as languages } from '../../data/languagesData';
import AllWebinarsLives from '../../layout/livesStream-layout/allWebinarsLives';
import { getFilteredWebinars, validateLanguageSelection } from '../../utils/helper/getFilteredWebinars';
import ToTop from '../../UI/toTop';
import { usePageLoading } from '../../hooks/usePageLoading';
import LoadingOverlay from '../../components/loadingOverlay';
import { failLoadData as message } from '../../config/configData';

const WebinarLivePage = ({ dark }) => {
    const [currentFilters, setCurrentFilters] = useState({
        sort: 'Most Relevant',
        status: 'all',
        languages: {
            selected: ['all'],
            isAllSelected: true,
            selectedCount: 1
        },
        levels: {
            selected: ['all'],
            isAllSelected: true,
            selectedCount: 1
        }
    });
    const [, setPageData] = useState(null);

    const { isLoading, stopLoading } = usePageLoading({
        initialDelay: 0,
        minDuration: 400,
        maxDuration: 1400,
        autoStart: true
    });

    // This callback function will be passed to LiveFilter
    // It gets called whenever any filter changes in the LiveFilter component
    const handleFiltersChange = useCallback((filterData) => {
        const validatedFilterData = {
            ...filterData,
            languages: validateLanguageSelection(filterData.languages)
        };

        console.log('Filters changed:', validatedFilterData); // For debugging
        setCurrentFilters(validatedFilterData);
    }, []);

    // Function to view all webinars (remove all filters)
    const handleViewAllWebinars = useCallback(() => {
        const defaultFilters = {
            sort: 'Most Relevant',
            status: 'all',
            languages: {
                selected: ['all'],
                isAllSelected: true,
                selectedCount: 1
            },
            levels: {
                selected: ['all'],
                isAllSelected: true,
                selectedCount: 1
            }
        };
        setCurrentFilters(defaultFilters);
    }, []);

    // We process the webinars based on the current filters
    const filteredAndSortedWebinars = useMemo(() => {
        console.log('=== FILTER DEBUG ===');
        console.log('Raw webinars:', webinars);
        console.log('Current filters:', currentFilters);

        const result = getFilteredWebinars(webinars, currentFilters, languages);

        if (!webinars || webinars.length === 0) {
            console.log('No webinars available');
            return [];
        }

        return result;
    }, [currentFilters]);

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
    }, [stopLoading]);

    return (
        <Fragment>
            <LoadingOverlay isLoading={isLoading} dark={dark} />

            <main className='w-full h-auto'>
                <Header
                    ariaLabel='Webinars live header'
                    dark={dark}
                    title={header.title}
                    description={header.description}
                />
                <section aria-labelledby='Webinars live content'>
                    <div className='w-full h-auto px-[8%] pb-24 flex flex-col gap-10' id='Webinars live content'>
                        <PopularWebinars dark={dark} webinars={webinars} />
                        <LiveFilter
                            onFiltersChange={handleFiltersChange}
                            initialSort="Most Relevant"
                            languages={languages}
                            dark={dark}
                        />
                        <AllWebinarsLives
                            webinars={filteredAndSortedWebinars}
                            currentFilters={currentFilters}
                            totalCount={webinars?.length || 0}
                            filteredCount={filteredAndSortedWebinars.length}
                            onViewAll={handleViewAllWebinars}
                            dark={dark}
                        />
                    </div>
                </section>
                <ToTop dark={dark} />
            </main>
        </Fragment>
    );
};

WebinarLivePage.propTypes = {
    dark: PropTypes.bool.isRequired
};

export default WebinarLivePage;