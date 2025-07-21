import { useCallback, useMemo, useState } from "react";
import PropTypes from 'prop-types'

const DurationFilter = ({
    onFiltersChange,
    selectedDuration,
    dark,
    durationOptions
}) => {
    const [showAllDuration, setShowAllDuration] = useState(false);

    const durationToggle = () => setShowAllDuration(prev => !prev);

    const selectDurationArray = useMemo(() => {
        if (!selectedDuration || selectedDuration === '') return [];

        if (Array.isArray(selectedDuration)) return selectedDuration;
        return [selectedDuration]
    }, [selectedDuration])

    const isDurationSelect = useCallback((duration) => {
        return selectDurationArray.includes(duration);
    }, [selectDurationArray]);

    const handleDurationChange = useCallback((duration) => {
        let newSelectDuration;

        if (isDurationSelect(duration.value)) {
            newSelectDuration = selectDurationArray.filter((d) => d !== duration.value);
        } else {
            newSelectDuration = [...selectDurationArray, duration.value];
        }

        onFiltersChange('duration', newSelectDuration);
    }, [isDurationSelect, onFiltersChange, selectDurationArray]);

    return (
        <section className='w-full h-auto'>
            <h3 className={`text-[1.7em] font-medium leading-none mb-2 ${dark ? 'text-white' : 'text-zinc-900'}`}>
                Durations
            </h3>
            <ul className={`w-full ${showAllDuration ? 'h-auto' : 'h-40'} flex flex-col overflow-y-hidden`}>
                {durationOptions.map((duration, index) => {
                    const isSelected = isDurationSelect(duration.value);

                    return (
                        <li
                            key={index}
                            className='w-full h-auto py-2 flex items-center gap-2'
                            role='option'
                            onClick={() => handleDurationChange(duration)}
                        >
                            <input
                                type="checkbox"
                                onChange={() => handleDurationChange(duration)}
                                checked={isSelected}
                                aria-checked={isDurationSelect(duration.value)}
                            />
                            <div className='w-full h-auto flex items-end gap-2'>
                                <p className={dark ? 'text-zinc-300' : 'text-zinc-600'}>{duration.label}</p>
                                <span className='text-zinc-400 text-sm'>({duration.amount})</span>
                            </div>
                        </li>
                    )
                })}
            </ul>
            <button
                type="button"
                className={`w-fit h-fit bg-transparent outline-none text-sm ${dark ? 'text-secondary' : 'text-primary'} hover:font-medium`}
                onClick={durationToggle}
                aria-label={showAllDuration ? 'show all durations' : 'show less'}
            >
                {showAllDuration ? 'Show less' : 'Show all durations'}
            </button>
        </section>
    )
};

DurationFilter.propTypes = {
    onFiltersChange: PropTypes.func.isRequired,
    selectedDuration: PropTypes.array.isRequired,
    dark: PropTypes.bool,
    durationOptions: PropTypes.array,
}

export default DurationFilter;