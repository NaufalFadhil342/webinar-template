// import { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const DateFilter = ({
    onFiltersChange,
    selectedDate,
    dark
}) => {
    const handleFromDate = (e) => {
        const newFromDate = e.target.value;
        onFiltersChange('date', {
            from: newFromDate,
            to: selectedDate.to
        })
    };

    const handleToDate = (e) => {
        const newToDate = e.target.value;
        onFiltersChange('date', {
            from: selectedDate.from,
            to: newToDate
        })
    };

    const clearDate = () => {
        onFiltersChange('date', {
            from: '',
            to: ''
        })
    };

    const getCurrentDateLimits = () => {
        const now = new Date();
        const currentMonth = now.toISOString().slice(0, 7);
        const minDate = '2025-01';

        return { min: minDate, max: currentMonth };
    };

    const { min: minDate, max: maxDate } = getCurrentDateLimits();

    return (
        <section className='w-full h-auto'>
            <h3 className={`text-[1.7em] font-medium ${dark ? 'text-white' : 'text-zinc-900'} mb-2 leading-none`}>Dates</h3>
            <div className='w-full h-auto flex flex-col gap-4 mt-4'>
                <div className='w-full h-auto'>
                    <label className={dark ? 'text-sm text-zinc-300' : 'text-sm text-zinc-600'}>From</label>
                    <input
                        type="month"
                        value={selectedDate.from}
                        min={minDate}
                        max={maxDate}
                        onChange={handleFromDate}
                        className={`w-full h-auto border-b text-sm ${dark ? 'border-zinc-400 text-zinc-300' : 'border-zinc-500/50 text-zinc-600'}`}
                    />
                </div>
                <div className='w-full h-auto'>
                    <label className={dark ? 'text-sm text-zinc-300' : 'text-sm text-zinc-600'}>To</label>
                    <input
                        type="month"
                        value={selectedDate.to}
                        min={selectedDate.from || minDate}
                        max={maxDate}
                        onChange={handleToDate}
                        className={`w-full h-auto border-b text-sm ${dark ? 'border-zinc-400 text-zinc-300' : 'border-zinc-500/50 text-zinc-600'}`}
                    />
                </div>
            </div>
            <div className='w-full h-auto flex items-center gap-2 mt-8'>
                <button
                    type='button'
                    className={`py-2 px-3 rounded-md text-sm ${!selectedDate.from || !selectedDate.to ? 'bg-gray-300 text-gray-500 cursor-not-allowed' :
                        `${dark ? 'bg-zinc-300 hover:bg-secondary text-zinc-600 hover:text-white' : 'bg-zinc-500 hover:bg-primary text-white'}`
                        } transition-colors duration-150 ease-in`}
                    onClick={clearDate}
                    disabled={!selectedDate.from || !selectedDate.to}
                >
                    Clear
                </button>
            </div>
        </section>
    )
};

DateFilter.propTypes = {
    onFiltersChange: PropTypes.func.isRequired,
    selectedDate: PropTypes.shape({
        from: PropTypes.string,
        to: PropTypes.string
    }),
    dark: PropTypes.bool,
}

export default DateFilter