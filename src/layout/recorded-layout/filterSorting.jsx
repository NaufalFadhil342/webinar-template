import { useCallback, useEffect, useRef, useState } from "react";
import Sorting from "./sorting";
import Filters from "./filters";
import Icon from "@mdi/react";
import { mdiMagnify } from '@mdi/js';
import PropTypes from 'prop-types';

const sortOptions = [
    { value: 'Most Recent', label: 'Most Recent', },
    { value: 'Most Popular', label: 'Most Popular' },
    { value: 'Highest Rated', label: 'Highest Rated' },
    { value: 'Z-A', label: 'Z-A' },
];

const FilterSorting = ({
    dark,
    currentFilters,
    searchInput,
    handleSearchInputChange,
    handleFilterChange,
    handleSearchKeyDown,
    handleSearchButtonClick,
}) => {
    const [showMenuDown, setShowMenuDown] = useState(null);

    const filtersRef = useRef();
    const sortingRef = useRef();
    const containerRef = useRef();

    const handleDropdownToggle = useCallback((menuDownId) => {
        setShowMenuDown(prev => prev === menuDownId ? null : menuDownId);
    }, []);

    const handleSortChange = (sortValue) => {
        handleFilterChange('sort', sortValue);
        setShowMenuDown(null);
    };

    const handleOutsideClick = useCallback((event) => {
        if (!filtersRef.current || !sortingRef.current) return;

        const clickedElement = event.target;

        const isInsideFilters = filtersRef.current.contains(clickedElement);
        const isInsideSorting = sortingRef.current.contains(clickedElement);

        if (!isInsideFilters && !isInsideSorting) {
            setShowMenuDown(null);
        }
    }, []);

    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.key === 'Escape' && showMenuDown) {
                setShowMenuDown(null);
            }
        };

        if (showMenuDown) {
            document.addEventListener('keydown', handleEscKey);
            return () => document.removeEventListener('keydown', handleEscKey);
        }

        if (showMenuDown) {
            const timeoutId = setTimeout(() => {
                document.addEventListener('mousedown', handleOutsideClick, true);
                document.addEventListener('touchstart', handleOutsideClick, true);
            }, 100);

            return () => {
                clearTimeout(timeoutId);
                document.removeEventListener('mousedown', handleOutsideClick, true);
                document.removeEventListener('touchstart', handleOutsideClick, true);
            };
        }
    }, [handleOutsideClick, showMenuDown]);

    return (
        <section className="w-full h-auto relative" ref={containerRef}>
            <div className="w-full h-auto flex flex-wrap items-center lg:flex-nowrap lg:justify-between gap-8 px-[8%]">
                <div className={`md:flex-[60%] w-full h-auto flex items-center gap-2 ${dark ? 'bg-zinc-800' : 'bg-white'} rounded-xl shadow-md overflow-x-hidden`}>
                    <input
                        type="text"
                        aria-label='search'
                        name="search"
                        placeholder='What are you looking for today?'
                        className='w-full h-auto p-3 text-zinc-600 outline-none bg-transparent'
                        value={searchInput}
                        onChange={handleSearchInputChange}
                        onKeyDown={handleSearchKeyDown}
                    />
                    <button
                        onClick={handleSearchButtonClick}
                        className="w-auto h-full px-3 cursor-pointer"
                        aria-label="Search button"
                    >
                        <Icon
                            path={mdiMagnify}
                            size={1.25}
                            className={`${dark ? 'text-zinc-300' : 'text-zinc-500/50'} rotate-90`}
                        />
                    </button>
                </div>
                <div className="lg:flex-[40%] w-full h-auto flex lg:justify-end gap-4">
                    <Filters
                        handleDropdownToggle={handleDropdownToggle}
                        showMenuDown={showMenuDown}
                        filtersRef={filtersRef}
                        dark={dark}
                        handleFilterChange={handleFilterChange}
                        currentFilters={currentFilters}
                    />
                    <Sorting
                        handleDropdownToggle={handleDropdownToggle}
                        handleSortChange={handleSortChange}
                        showMenuDown={showMenuDown}
                        sortBy={currentFilters.sort}
                        sortingRef={sortingRef}
                        sorts={sortOptions}
                        dark={dark}
                    />
                </div>
            </div>
        </section>
    )
};

FilterSorting.propTypes = {
    dark: PropTypes.bool,
    searchInput: PropTypes.string.isRequired,
    currentFilters: PropTypes.shape({
        sort: PropTypes.string.isRequired,
        search: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        date: PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired
        }).isRequired,
        duration: PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired
        }).isRequired
    }).isRequired,
    handleSearchInputChange: PropTypes.func.isRequired,
    handleFilterChange: PropTypes.func.isRequired,
    handleSearchKeyDown: PropTypes.func.isRequired,
    handleSearchButtonClick: PropTypes.func.isRequired,
}

export default FilterSorting;