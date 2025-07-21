import { useCallback, useState } from "react";
import Icon from "@mdi/react";
import { mdiFilter } from '@mdi/js';
import PropTypes from 'prop-types';
import Categories from './filter/categories';
import DateFilter from "./filter/dateFilter";
import DurationFilter from "./filter/durationFilter";

const categories = [
    { label: 'All Categories', value: 'all' },
    { label: 'Technology', value: 'technology' },
    { label: 'Marketing', value: 'marketing' },
    { label: 'Finance', value: 'finance' },
    { label: 'Design', value: 'design' },
    { label: 'Business', value: 'business' }
];

const durationOptions = [
    { label: 'All Durations', value: 'all' },
    { label: 'Quick (< 30 min)', value: 'quick', min: 0, max: 29 },
    { label: 'Short (30-60 min)', value: 'short', min: 30, max: 60 },
    { label: 'Standard (1-2 hours)', value: 'standard', min: 61, max: 120 },
    { label: 'Extended (2-4 hours)', value: 'extended', min: 121, max: 240 },
    { label: 'Full Day (4+ hours)', value: 'fullday', min: 241, max: 999 }
];

const dateOptions = [
    { label: 'All Times', value: 'all' },
    { label: 'Last Week', value: 'last-week' },
    { label: 'Last Month', value: 'last-month' },
    { label: 'This Year', value: 'this-year' },
    { label: 'Last Year', value: 'last-year' },
    { label: 'Custom Range', value: 'custom' }
];

const Filters = ({
    filtersRef,
    handleDropdownToggle,
    showMenuDown,
    dark,
    handleFilterChange,
    currentFilters
}) => {
    const [showFiltersMenu, setShowFiltersMenu] = useState(null);

    const handleFiltersMenuToggle = (filterMenu) => {
        setShowFiltersMenu(prev => prev === filterMenu ? null : filterMenu)
    };

    const handleCategoryChange = useCallback((selectedCategory) => {
        handleFilterChange('category', selectedCategory.value);
        setShowFiltersMenu(null);
    }, [handleFilterChange]);

    const handleDateChange = useCallback((selectedDate) => {
        handleFilterChange('date', selectedDate);
        setShowFiltersMenu(null);
    }, [handleFilterChange]);

    const handleDurationChange = useCallback((selectedDuration) => {
        handleFilterChange('duration', selectedDuration);
        setShowFiltersMenu(null);
    }, [handleFilterChange]);

    const handleFilterButtonClick = useCallback((e) => {
        e.stopPropagation();
        handleDropdownToggle('filters');
    }, [handleDropdownToggle]);

    const handleFilterMenuClick = useCallback((e) => {
        e.stopPropagation();
    }, []);

    return (
        <section className='w-full h-auto sm:w-auto' ref={filtersRef}>
            <button
                type='button'
                className={`p-3 w-full h-auto rounded-md ${dark ? 'bg-zinc-800 text-white hover:bg-secondary' : 'bg-white text-zinc-600 hover:bg-primary hover:text-white'} shadow-md transition-all duration-150 ease-in flex items-center justify-center gap-2 outline-none`}
                onClick={handleFilterButtonClick}
                aria-expanded={showMenuDown === 'filters'}
                aria-haspopup="true"
                aria-label="Open filters menu"
            >
                <Icon path={mdiFilter} size={0.85} />
                <>Filters</>
            </button>
            {showMenuDown === 'filters' && (
                <div
                    className={`${dark ? 'bg-zinc-800' : 'bg-white'} shadow-wide w-full h-auto absolute top-36 lg:top-14 left-0 z-[5] py-10 px-[5%] grid md:grid-cols-3 gap-6`}
                    onClick={handleFilterMenuClick}
                    role="menu"
                    aria-label="Filter options"
                >
                    <Categories
                        handleFiltersMenuToggle={handleFiltersMenuToggle}
                        handleDropdownToggle={handleDropdownToggle}
                        showFiltersMenu={showFiltersMenu}
                        categories={categories}
                        handleCategoryChange={handleCategoryChange}
                        selectedCategory={currentFilters.category}
                        dark={dark}
                    />
                    <DateFilter
                        handleFiltersMenuToggle={handleFiltersMenuToggle}
                        showFiltersMenu={showFiltersMenu}
                        handleDropdownToggle={handleDropdownToggle}
                        setShowFiltersMenu={setShowFiltersMenu}
                        handleDateChange={handleDateChange}
                        selectedDate={currentFilters.date}
                        dateOptions={dateOptions}
                        dark={dark}
                    />
                    <DurationFilter
                        showFiltersMenu={showFiltersMenu}
                        setShowFiltersMenu={setShowFiltersMenu}
                        handleDropdownToggle={handleDropdownToggle}
                        handleFiltersMenuToggle={handleFiltersMenuToggle}
                        handleDurationChange={handleDurationChange}
                        durationOptions={durationOptions}
                        selectedDuration={currentFilters.duration}
                        dark={dark}
                    />
                </div>
            )}
        </section>
    )
};

Filters.propTypes = {
    filtersRef: PropTypes.object.isRequired,
    handleDropdownToggle: PropTypes.func.isRequired,
    showMenuDown: PropTypes.string,
    dark: PropTypes.bool,
    handleFilterChange: PropTypes.func.isRequired,
    currentFilters: PropTypes.object.isRequired
}

export default Filters;