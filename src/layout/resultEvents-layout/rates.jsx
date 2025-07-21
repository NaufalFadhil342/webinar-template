import { useCallback, useEffect, useRef, useState } from "react";
import { mdiChevronDown, mdiStar } from "@mdi/js";
import Icon from "@mdi/react";
import { AnimatePresence, motion } from "motion/react";

import PropTypes from 'prop-types';

const Rates = ({
    dark,
    selectedRates,
    onFiltersChange,
    ratesList
}) => {
    const [showRates, setShowRates] = useState(false);
    const ratesRef = useRef();

    const isRateSelected = useCallback((ratesValue) => {
        if (ratesValue === '') return !selectedRates || selectedRates === '';

        return selectedRates && selectedRates.toLowerCase() === ratesValue.toLowerCase()
    }, [selectedRates]);

    const toggleRate = () => setShowRates(prev => !prev)

    const handleRateChange = useCallback((rate) => {
        onFiltersChange('rates', rate.value);

        setShowRates(false)
    }, [onFiltersChange]);

    useEffect(() => {
        const outsideClick = (event) => {
            if (ratesRef.current && !ratesRef.current.contains(event.target)) {
                setShowRates(false);
            }
        };

        window.addEventListener('mousedown', outsideClick);
        return () => window.removeEventListener('mousedown', outsideClick);
    }, []);

    const displayText = () => {
        if (!selectedRates || selectedRates === '') {
            return 'Rates'
        }

        const selectRatesObj = ratesList.find((rate) =>
            rate.value === selectedRates
        );

        return selectRatesObj ? ('Up to' + ' ' + selectRatesObj.label) : 'Rates'
    };

    return (
        <section className="w-auto h-auto relative hidden lg:block" ref={ratesRef}>
            <button
                type="button"
                className={`px-3 py-2 rounded-full border flex items-center gap-2 outline-none bg-transparent ${dark ? 'text-white border-secondary hover:bg-secondary' : 'text-zinc-600 border-primary hover:bg-primary hover:text-white'} ease-in transition-all duration-150`}
                aria-label="rates option"
                onClick={toggleRate}
            >
                <span className="truncate">{displayText()}</span>
                <Icon path={mdiChevronDown} size={0.8} />
            </button>
            <AnimatePresence>
                {showRates && (
                    <motion.div
                        className={`w-auto h-auto rounded-md shadow-md overflow-x-hidden absolute z-[3] top-full left-0 mt-2 ${dark ? 'bg-zinc-800 shadow-white/15' : 'bg-white shadow-zinc-500/15'}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeIn' }}
                    >
                        <ul
                            className="w-full h-auto"
                            onClick={(e) => e.stopPropagation()}
                            aria-haspopup='listbox'
                            aria-label="rates list"
                        >
                            {ratesList.map((rate, index) => {
                                const isSelected = isRateSelected(rate.value);

                                return (
                                    <li
                                        key={index}
                                        className={`p-3 flex items-center gap-2 w-full h-auto cursor-pointer ${isSelected ? `${dark ? 'bg-zinc-100/15' : 'bg-primary/15'}` : `${dark ? 'hover:bg-zinc-100/10' : 'hover:bg-primary/10'}`
                                            }`}
                                        role='option'
                                    >
                                        <input
                                            type="radio"
                                            name="rates"
                                            className="size-4"
                                            checked={isRateSelected(rate.value)}
                                            onChange={() => handleRateChange(rate)}
                                        />
                                        <span className={`w-max h-auto ${dark ? 'text-zinc-300' : 'text-zinc-600'} text-sm flex items-center gap-1`}>
                                            <span>Up to {rate.label}</span>
                                            <Icon path={mdiStar} size={0.5} className="text-yellow-500" />
                                        </span>
                                        <span className="text-sm text-zinc-400">({rate.amount})</span>
                                    </li>
                                )
                            })}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
};

Rates.propTypes = {
    dark: PropTypes.bool,
    selectedRates: PropTypes.string.isRequired,
    onFiltersChange: PropTypes.func.isRequired,
    ratesList: PropTypes.array.isRequired
}

export default Rates;