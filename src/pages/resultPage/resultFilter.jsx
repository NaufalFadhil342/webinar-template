import { motion, AnimatePresence } from 'motion/react';
import PropTypes from 'prop-types';
import RateFilter from './resultFilter/rateFilter';
import LangsFilter from './resultFilter/langsFilter';
import { languageDummyData as languagesList } from '../../data/languagesData';
import DurationFilter from './resultFilter/durationFilter';
import CategoryFilter from './resultFilter/categoryFilter';
import LevelFilter from './resultFilter/levelFilter';
import DateFilter from './resultFilter/dateFilter';
import PriceFilter from './resultFilter/priceFilter';

const durationOptions = [
    { label: '<1 hour', value: '<1 hour', amount: 1000 },
    { label: '1-2 hours', value: '1-2 hours', amount: 2000 },
    { label: '2-4 hours', value: '2-4 hours', amount: 1000 },
    { label: '4-8 hours', value: '4-8 hours', amount: 800 },
    { label: '8-16 hours', value: '8-16 hours', amount: 600 },
    { label: '>16 hours', value: '>16 hours', amount: 300 }
];

const levelOptions = [
    { label: 'All Level', value: 'all level' },
    { label: 'Beginner', value: 'beginner' },
    { label: 'Intermediate', value: 'intermediate' },
    { label: 'Expert', value: 'expert' },
];

const priceOptions = [
    { label: 'Paid', value: 'paid', amount: '1000' },
    { label: 'Free', value: 'free', amount: '400' }
];

const ResultFilter = ({
    setShowFilter,
    showFilter,
    onFiltersChange,
    currentResult,
    dark,
    ratesOptions,
    isFilterReset,
    resetFilters,
    categoryOptions
}) => {
    const closeFilter = () => setShowFilter(false);

    return (
        <AnimatePresence>
            {showFilter && (
                <aside className="w-full h-screen fixed z-10 left-0 top-0" aria-label='filter content'>
                    <motion.div
                        className={`w-full h-full ${dark ? 'bg-zinc-900/25' : 'bg-zinc-200/25'} backdrop-blur opacity-0`}
                        onClick={closeFilter}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeIn' }}
                    >
                        <button
                            type='button'
                            className='text-zinc-600 hidden xm:block font-semibold text-3xl size-10 rounded-full outline-none shadow-[0_0_5px_rgba(25,25,25,0.2)] bg-white hover:bg-[#f0f0f0] transition-colors duration-150 ease-in absolute z-[15] top-10 left-[23rem]'
                            onClick={closeFilter}
                        >
                            <span className='w-full h-full flex items-center justify-center -translate-y-[2px]'>x</span>
                        </button>
                    </motion.div>
                    <motion.div
                        className={`w-full xm:w-[22rem] h-full overflow-y-auto ${dark ? 'bg-zinc-600' : 'bg-white'} absolute z-[1] left-0 top-0 p-8 flex flex-col gap-10`}
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.25, ease: 'easeIn' }}
                    >
                        <div className='w-full h-auto'>
                            <div className='w-full h-auto flex items-center justify-between gap-2'>
                                <h2 className={`text-[2em] font-semibold ${dark ? 'text-white' : 'text-zinc-900'}`}>Filters</h2>
                                <button
                                    type='button'
                                    className={`size-8 rounded-full ${dark ? 'bg-zinc-300 text-zinc-600 hover:bg-[#ccc]' : 'bg-zinc-500 text-white hover:bg-[#9c9c9c]'} font-medium flex items-center justify-center xm:hidden text-xl transition-colors duration-150 ease-in`}
                                    onClick={closeFilter}
                                >
                                    x
                                </button>
                            </div>
                            {isFilterReset() && (
                                <button
                                    type='button'
                                    aria-label='reset filter'
                                    onClick={resetFilters}
                                    className='flex items-center gap-2 text-sm'
                                >
                                    <span className={dark ? 'text-xs text-zinc-300' : 'text-xs text-zinc-500'}>x</span>
                                    <span className={dark ? 'text-secondary' : 'text-primary font-medium'}>Delete all filters</span>
                                </button>
                            )}
                        </div>
                        <div className='w-full h-auto flex flex-col gap-6'>
                            <RateFilter
                                onFiltersChange={onFiltersChange}
                                selectedRates={currentResult.rates}
                                dark={dark}
                                ratesList={ratesOptions}
                            />
                            <LangsFilter
                                onFiltersChange={onFiltersChange}
                                selectedLangs={currentResult.languages}
                                dark={dark}
                                languagesList={languagesList}
                            />
                            <DurationFilter
                                onFiltersChange={onFiltersChange}
                                selectedDuration={currentResult.duration}
                                dark={dark}
                                durationOptions={durationOptions}
                            />
                            <CategoryFilter
                                onFiltersChange={onFiltersChange}
                                selectedCategory={currentResult.category}
                                dark={dark}
                                categoryOptions={categoryOptions}
                            />
                            <LevelFilter
                                onFiltersChange={onFiltersChange}
                                selectedLevel={currentResult.level}
                                dark={dark}
                                levelOptions={levelOptions}
                            />
                            <DateFilter
                                onFiltersChange={onFiltersChange}
                                selectedDate={currentResult.date}
                                dark={dark}
                            />
                            <PriceFilter
                                onFiltersChange={onFiltersChange}
                                selectedPrice={currentResult.costs}
                                dark={dark}
                                priceOptions={priceOptions}
                            />
                        </div>
                    </motion.div>
                </aside>
            )}
        </AnimatePresence>
    )
}

ResultFilter.propTypes = {
    showFilter: PropTypes.bool,
    setShowFilter: PropTypes.func.isRequired,
    onFiltersChange: PropTypes.func,
    currentResult: PropTypes.shape({
        rates: PropTypes.string.isRequired,
        languages: PropTypes.array.isRequired,
        duration: PropTypes.array.isRequired,
        category: PropTypes.string.isRequired,
        level: PropTypes.array.isRequired,
        date: PropTypes.shape({
            from: PropTypes.string.isRequired,
            to: PropTypes.string.isRequired
        }),
        costs: PropTypes.string.isRequired
    }),
    dark: PropTypes.bool,
    ratesOptions: PropTypes.array,
    categoryOptions: PropTypes.array,
    isFilterReset: PropTypes.func.isRequired,
    resetFilters: PropTypes.func.isRequired
}

export default ResultFilter