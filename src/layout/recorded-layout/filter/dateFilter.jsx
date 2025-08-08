import { useState, useRef, useEffect } from 'react';
import Icon from '@mdi/react';
import { mdiMenuDown } from '@mdi/js';
import PropTypes from 'prop-types';

const DateFilter = ({
    handleFiltersMenuToggle,
    handleDropdownToggle,
    showFiltersMenu,
    setShowFiltersMenu,
    handleDateChange,
    selectedDate,
    dateOptions,
    dark
}) => {
    const [customRange, setCustomRange] = useState({
        from: '',
        to: ''
    });
    const [showTimes, setShowTimes] = useState(false);

    const dateRangeRef = useRef();

    const handleDateSelect = (option) => {
        if (option.value === 'custom') return;

        handleDateChange(option);
        setShowFiltersMenu(null);
        handleDropdownToggle(null);
        setShowTimes(false);
    };

    const formatMonthYear = (monthYear) => {
        if (!monthYear) return '';

        const [year, month] = monthYear.split('-');
        const monthNames = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];

        return `${monthNames[parseInt(month) - 1]} ${year}`;
    };

    const formatDateRange = (from, to) => {
        const fromFormatted = formatMonthYear(from);
        const toFormatted = formatMonthYear(to);

        const [fromYear] = from.split('-');
        const [toYear] = to.split('-');

        if (fromYear === toYear) {
            const fromMonth = formatMonthYear(from).split(' ')[0];
            const toMonth = formatMonthYear(to).split(' ')[0];
            return `${fromMonth} - ${toMonth} ${fromYear}`;
        }

        return `${fromFormatted} - ${toFormatted}`;
    };

    const handleCustomRange = () => {
        if (!customRange.from || !customRange.to) {
            alert('Please select both "From" and "To" dates');
            return;
        }

        const fromDate = new Date(customRange.from + '-01');
        const toDate = new Date(customRange.to + '-01');

        if (fromDate > toDate) {
            alert('"From" date cannot be later than "To" date');
            return;
        }

        const formattedLabel = formatDateRange(customRange.from, customRange.to);

        handleDateChange({
            label: formattedLabel,
            value: 'custom',
            range: customRange
        });

        setShowFiltersMenu(null);
        handleDropdownToggle(null);
        setShowTimes(false);
        setCustomRange({ from: '', to: '' });
    };

    useEffect(() => {
        if (selectedDate?.value !== 'custom') {
            setCustomRange({ from: '', to: '' });
        }
    }, [selectedDate]);

    const getCurrentDateLimits = () => {
        const now = new Date();
        const currentMonth = now.toISOString().slice(0, 7);
        const minDate = '2020-01';

        return { min: minDate, max: currentMonth };
    };

    const { min: minDate, max: maxDate } = getCurrentDateLimits();

    return (
        <section className='w-full h-auto relative' ref={dateRangeRef}>
            <button
                type='button'
                className={`w-full h-auto p-2 rounded-md border hover:border-[1.5px] flex items-center justify-between ${dark ? 'border-zinc-400/75 text-zinc-400 hover:border-zinc-300 hover:text-zinc-300' : 'text-zinc-600 border-zinc-500/50 hover:border-primary hover:text-primary'} hover:font-medium duration-150 transition-all ease-in outline-none`}
                onClick={(e) => {
                    handleFiltersMenuToggle('date')
                    e.stopPropagation()
                }}
                aria-expanded={showFiltersMenu === 'date'}
                aria-haspopup="true"
            >
                <span className='truncate'>{selectedDate?.label || 'All Times'}</span>
                <Icon path={mdiMenuDown} size={0.85} />
            </button>
            {showFiltersMenu === 'date' && (
                <div className={`w-full h-auto absolute z-[4] ${dark ? 'bg-zinc-800' : 'bg-white'} rounded-md top-12 left-0 shadow-wide overflow-x-hidden`}>
                    <div className='w-full h-auto'>
                        <button
                            className={`w-full h-auto text-sm font-semibold p-3 border-b ${dark ? 'border-zinc-400/75 text-zinc-300 hover:border-zinc-300' : 'border-zinc-500/50 text-zinc-600'} flex items-center justify-between hover:cursor-pointer`}
                            onClick={() => setShowTimes(!showTimes)}
                            aria-expanded={showTimes}
                        >
                            <>Quick Select</>
                            <Icon path={mdiMenuDown} size={1} />
                        </button>
                        {showTimes && (
                            <div className='w-full h-auto'>
                                {dateOptions.slice(0, -1).map((option, index) => {
                                    const isSelected = selectedDate?.value === option.value;

                                    return (
                                        <div
                                            key={index}
                                            className={`w-full p-3 text-sm ${dark ? 'text-zinc-300' : 'text-zinc-600'} transition-all duration-150 ease-in cursor-pointer ${isSelected
                                                ? `${dark ? 'bg-white/15' : 'bg-primary/15'} font-semibold`
                                                : `${dark ? 'hover:bg-white/10' : 'hover:bg-primary/10'} hover:font-medium`
                                                }`}
                                            onClick={() => handleDateSelect(option)}
                                        >
                                            <span>{option.label}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                    <div className='w-full h-auto'>
                        <h4 className={`text-sm font- p-3 mb-2 border-b ${dark ? 'text-zinc-300 border-zinc-400/75' : 'text-zinc-600 border-zinc-500/50'}`}>Custom Range</h4>
                        <div className='w-full h-auto p-3'>
                            <label className={`text-xs ${dark ? 'text-zinc-400' : 'text-zinc-500'} block mb-2`}>From</label>
                            <input
                                type="month"
                                value={customRange.from}
                                min={minDate}
                                max={maxDate}
                                onChange={(e) => setCustomRange(prev => ({
                                    ...prev,
                                    from: e.target.value
                                }))}
                                className={`w-full p-2 text-xs bg-transparent ${dark ? 'text-zinc-300' : 'text-zinc-600'} border border-zinc-300 rounded focus:outline-none`}
                            />
                        </div>
                        <div className='w-full h-auto p-3'>
                            <label className={`text-xs ${dark ? 'text-zinc-400' : 'text-zinc-500'} block mb-2`}>To</label>
                            <input
                                type="month"
                                value={customRange.to}
                                min={customRange.from || minDate}
                                max={maxDate}
                                onChange={(e) => setCustomRange(prev => ({
                                    ...prev,
                                    to: e.target.value
                                }))}
                                className={`w-full p-2 text-xs bg-transparent ${dark ? 'text-zinc-300' : 'text-zinc-600'} border border-zinc-300 rounded focus:outline-none`}
                            />
                        </div>

                        <button
                            onClick={handleCustomRange}
                            disabled={!customRange.from || !customRange.to}
                            className={`w-full p-3 text-sm font-medium rounded transition-all duration-150 ${!customRange.from || !customRange.to
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : `${dark ? 'bg-secondary hover:bg-secondary/80' : 'bg-primary hover:bg-primary/90'} text-white hover:shadow-md`
                                }`}
                        >
                            Apply Range
                        </button>
                    </div>
                </div>
            )}
        </section>
    )
};

DateFilter.propTypes = {
    handleFiltersMenuToggle: PropTypes.func.isRequired,
    handleDropdownToggle: PropTypes.func,
    showFiltersMenu: PropTypes.node,
    setShowFiltersMenu: PropTypes.func.isRequired,
    handleDateChange: PropTypes.func,
    selectedDate: PropTypes.object.isRequired,
    dateOptions: PropTypes.array,
    dark: PropTypes.bool
}

export default DateFilter;