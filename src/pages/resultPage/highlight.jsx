import { useCallback, useEffect, useRef, useState } from "react";
import { mdiChevronDown, mdiFilterVariant } from '@mdi/js';
import Icon from "@mdi/react";
import { AnimatePresence, motion } from "motion/react";
import Categories from "../../layout/resultEvents-layout/categories";
import Rates from "../../layout/resultEvents-layout/rates";
import Status from "../../layout/resultEvents-layout/status";
import ResultFilter from "./resultFilter";

import PropTypes from 'prop-types';

const sortOptions = [
    { label: 'Most Relevant', value: 'Most Relevant' },
    { label: 'Most Popular', value: 'Most Popular' },
    { label: 'Highest Rating', value: 'Highest Rating' },
    { label: 'Newest', value: 'Newest' },
    { label: 'Price: Low - High', value: 'Low - High' },
    { label: 'Price: High - Low', value: 'High - Low' },
];

const ratesOptions = [
    { label: '4.5', value: '4.5', amount: '8000' },
    { label: '4.0', value: '4.0', amount: '5000' },
    { label: '3.5', value: '3.5', amount: '3500' },
    { label: '3.0', value: '3.0', amount: '2000' },
];

const categoryOptions = [
    { label: 'Technology', value: 'technology' },
    { label: 'Marketing', value: 'marketing' },
    { label: 'Finance', value: 'finance' },
    { label: 'Design', value: 'design' },
    { label: 'Business', value: 'business' },
];

const Highlight = ({
    onFiltersChange,
    currentResult,
    dark,
    resetFilters,
    isFilterReset
}) => {
    const [showSorts, setShowSorts] = useState(false);
    const [showFilter, setShowFilter] = useState(false);

    const sortsRef = useRef();

    const handleSortChange = useCallback((sortValue) => {
        onFiltersChange('sort', sortValue);
        setShowSorts(false);
    }, [onFiltersChange]);

    const handleSortToggle = () => setShowSorts(prev => !prev);

    useEffect(() => {
        const handleOutsideClick = () => {
            if (sortsRef.current && !sortsRef.current.contains(event.target)) {
                setShowSorts(false);
            }
        }

        window.addEventListener('mousedown', handleOutsideClick);

        return () => window.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    return (
        <section className="w-full h-auto flex flex-col items-center md:flex-row md:justify-between gap-4">
            <div className="w-full flex flex-col sm:flex-row items-center gap-4 relative">
                <button
                    type="button"
                    className={`w-full md:w-auto h-auto py-2 px-3 flex items-center justify-center gap-2 rounded-full border ${dark ? 'border-secondary bg-transparent hover:bg-secondary text-white' : 'border-primary bg-transparent hover:bg-primary text-zinc-600 hover:text-white'} transition-colors duration-150 ease-in`}
                    onClick={() => setShowFilter(true)}
                    aria-label='filter button'
                >
                    <Icon path={mdiFilterVariant} size={0.8} />
                    <span>Filters</span>
                </button>
                <Status
                    onFiltersChange={onFiltersChange}
                    selectedStatus={currentResult.status}
                    dark={dark}
                />
                <Categories
                    onFiltersChange={onFiltersChange}
                    selectedCategory={currentResult.category}
                    dark={dark}
                    categoryOptions={categoryOptions}
                />
                <Rates
                    onFiltersChange={onFiltersChange}
                    selectedRates={currentResult.rates}
                    dark={dark}
                    ratesList={ratesOptions}
                />
                {isFilterReset() && (
                    <button
                        type='button'
                        className={`${dark ? 'text-white hover:text-secondary' : 'text-primary hover:text-zinc-600'} font-medium ease-in transition-colors duration-150`}
                        onClick={resetFilters}
                        aria-label="reset"
                    >
                        Reset
                    </button>
                )}
                <ResultFilter
                    setShowFilter={setShowFilter}
                    showFilter={showFilter}
                    onFiltersChange={onFiltersChange}
                    currentResult={currentResult}
                    dark={dark}
                    ratesOptions={ratesOptions}
                    categoryOptions={categoryOptions}
                    isFilterReset={isFilterReset}
                    resetFilters={resetFilters}
                />
            </div>
            <div className="w-full relative flex justify-end" ref={sortsRef}>
                <button
                    className={`w-full h-auto md:w-auto py-2 pl-3 flex items-center justify-between gap-2 border-b ${dark ? 'border-zinc-300/60 text-white hover:text-secondary hover:border-secondary' : 'border-zinc-500/30 text-zinc-600 hover:text-primary hover:border-primary'} transition-colors duration-150 ease-in"
                    type="button`}
                    onClick={handleSortToggle}
                >
                    <span>{currentResult.sort}</span>
                    <Icon path={mdiChevronDown} size={0.85} />
                </button>
                <AnimatePresence>
                    {showSorts && <motion.ul
                        className={`w-full md:w-40 h-auto rounded-md ${dark ? 'bg-zinc-800 shadow-zinc-100/15' : 'bg-white shadow-zinc-500/15'} shadow-md absolute mt-2 top-full right-0 z-[3]`}
                        aria-haspopup='menu'
                        aria-label="sort options"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeIn' }}
                    >
                        {sortOptions.map((sort, index) => {
                            const isSelected = currentResult.sort === sort.value

                            return (
                                <li
                                    key={index}
                                    className={`w-full py-3 px-3 hover:cursor-pointer outline-none ${isSelected ? `${dark ? ' bg-white/15 text-white' : 'bg-primary/15 text-zinc-600'} font-semibold` : `${dark ? 'text-white bg-transparent hover:bg-white/10' : 'text-zinc-600 bg-transparent hover:bg-primary/10'} hover:font-medium`}`}
                                    onClick={() => handleSortChange(sort.value)}
                                >
                                    {sort.label}

                                </li>
                            )
                        })}
                    </motion.ul>}
                </AnimatePresence>
            </div>
        </section>
    )
};

Highlight.propTypes = {
    dark: PropTypes.bool,
    onFiltersChange: PropTypes.func.isRequired,
    currentResult: PropTypes.shape({
        sort: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        rates: PropTypes.string.isRequired
    }),
    resetFilters: PropTypes.func,
    isFilterReset: PropTypes.func.isRequired
};

export default Highlight;