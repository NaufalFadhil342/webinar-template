import { useState, useRef, useEffect } from 'react'
import { mdiMenuDown, mdiClock } from "@mdi/js";
import Icon from "@mdi/react";
import PropTypes from 'prop-types';

const DurationFilter = ({
    showFiltersMenu,
    setShowFiltersMenu,
    handleFiltersMenuToggle,
    handleDurationChange,
    handleDropdownToggle,
    durationOptions,
    selectedDuration,
    dark
}) => {
    const [customDuration, setCustomDuration] = useState({
        min: '',
        max: ''
    });
    const [showDurations, setShowDurations] = useState(false);

    const durationRef = useRef();

    useEffect(() => {
        if (showFiltersMenu !== 'duration') {
            setShowDurations(false);
        }
    }, [showFiltersMenu]);

    const handleOptionSelect = (option) => {
        handleDurationChange(option);
        setShowFiltersMenu(null);
        setShowDurations(false);
        handleDropdownToggle(null);
    };

    const handleCustomDurationApply = () => {
        const minValue = customDuration.min.trim();
        const maxValue = customDuration.max.trim();

        if (!minValue || !maxValue) {
            alert('Please fill in both minimum and maximum duration values');
            return;
        }

        const minDuration = parseInt(minValue);
        const maxDuration = parseInt(maxValue);

        if (isNaN(minDuration) || isNaN(maxDuration)) {
            alert('Please enter valid numbers');
            return;
        }

        if (minDuration < 1 || maxDuration < 1) {
            alert('Duration values must be at least 1 minute');
            return;
        }

        if (minDuration > maxDuration) {
            alert('Minimum duration cannot be greater than maximum duration');
            return;
        }

        if (maxDuration > 999) {
            alert('Maximum duration cannot exceed 999 minutes');
            return;
        }

        const customOption = {
            label: `Custom (${minDuration}-${maxDuration} min)`,
            value: 'custom',
            min: minDuration,
            max: maxDuration
        };

        handleDurationChange(customOption);
        setShowFiltersMenu(null);
        setShowDurations(false);
        setCustomDuration({ min: '', max: '' });
        handleDropdownToggle(null);
    };

    const handleCustomInputChange = (field, value) => {
        if (value === '' || /^\d+$/.test(value)) {
            setCustomDuration(prev => ({
                ...prev,
                [field]: value
            }));
        }
    };

    return (
        <section className="w-full h-auto relative" ref={durationRef}>
            <button
                type="button"
                className={`w-full h-auto flex items-center justify-between p-2 rounded-md border hover:border-[1.5px] ${dark ? 'text-zinc-400 border-zinc-400/75 hover:text-zinc-300 hover:border-zinc-300' : 'text-zinc-600 border-zinc-500/50 hover:border-primary hover:text-primary'} hover:font-medium transition-all duration-150 ease-in outline-none`}
                onClick={(e) => {
                    handleFiltersMenuToggle('duration')
                    e.stopPropagation()
                }}
            >
                <span className='truncate'>{selectedDuration?.label || 'All Durations'}</span>
                <Icon path={mdiMenuDown} size={0.85} />
            </button>
            {showFiltersMenu === 'duration' && (
                <div className={`w-full h-auto absolute z-[4] ${dark ? 'bg-zinc-800' : 'bg-white'} rounded-md top-12 left-0 shadow-wide overflow-x-hidden`}>
                    <button
                        className='w-full h-auto flex items-center justify-between border-b border-zinc-500/50'
                        type='button'
                        onClick={() => setShowDurations(!showDurations)}
                    >
                        <h4 className={`text-sm p-3 font-semibold ${dark ? 'text-zinc-300' : 'text-zinc-600'} flex items-center gap-1`}>
                            <Icon path={mdiClock} size={0.65} />
                            Duration Ranges
                        </h4>
                        <Icon path={mdiMenuDown} size={1} className={`${dark ? 'text-zinc-300' : 'text-zinc-700'} mr-2`} />
                    </button>
                    {showDurations && (
                        <div className="pb-2">
                            {durationOptions.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => handleOptionSelect(option)}
                                    className={`w-full text-left p-3 text-sm transition-colors ${dark ? 'text-zinc-300' : 'text-zinc-600'} ${selectedDuration?.value === option.value
                                        ? `${dark ? 'bg-white/15' : 'bg-primary/15'} font-semibold`
                                        : `${dark ? 'hover:bg-white/10' : 'hover:bg-primary/10'} hover:font-medium`
                                        }`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    )}
                    <div className="w-full h-auto">
                        <h4 className={`text-sm font-semibold p-3 mb-3 border-b ${dark ? 'text-zinc-300 border-zinc-400/75' : 'text-zinc-600 border-zinc-500/50'}`}>
                            Custom Duration (minutes)
                        </h4>
                        <div className="flex gap-2 mb-3 p-3">
                            <div className="flex-1">
                                <label className={`text-sm ${dark ? 'text-zinc-400' : 'text-zinc-500'} block mb-1`}>Min</label>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    value={customDuration.min}
                                    onChange={(e) => handleCustomInputChange('min', e.target.value)}
                                    className={`w-full px-2 py-1 text-sm bg-transparent border border-zinc-300 ${dark ? 'text-zinc-300' : 'text-zinc-600'} rounded-md focus:outline-none`}
                                    placeholder="15"
                                    maxLength="3"
                                />
                            </div>
                            <div className="flex-1">
                                <label className={`text-sm ${dark ? 'text-zinc-400' : 'text-zinc-500'} block mb-1`}>Max</label>
                                <input
                                    type="text"
                                    inputMode='numeric'
                                    value={customDuration.max}
                                    onChange={(e) => handleCustomInputChange('max', e.target.value)}
                                    className={`w-full px-2 py-1 text-sm bg-transparent border border-zinc-300 ${dark ? 'text-zinc-300' : 'text-zinc-600'} rounded focus:outline-none`}
                                    placeholder="60"
                                    maxLength="3"
                                />
                            </div>
                        </div>
                        <button
                            onClick={handleCustomDurationApply}
                            disabled={!customDuration.min || !customDuration.max}
                            className={`w-full p-2 text-sm rounded text-white transition-colors ${dark
                                ? 'bg-secondary hover:bg-darkSecondary disabled:bg-zinc-600'
                                : 'bg-primary hover:bg-darkPrimary disabled:bg-gray-400'
                                } disabled:cursor-not-allowed`}
                        >
                            Apply Custom Duration
                        </button>
                    </div>
                </div>

            )}
        </section>
    )
};

DurationFilter.propTypes = {
    showFiltersMenu: PropTypes.node,
    setShowFiltersMenu: PropTypes.func.isRequired,
    handleFiltersMenuToggle: PropTypes.func.isRequired,
    handleDurationChange: PropTypes.func.isRequired,
    handleDropdownToggle: PropTypes.func,
    durationOptions: PropTypes.array,
    selectedDuration: PropTypes.object,
    dark: PropTypes.bool
}

export default DurationFilter;