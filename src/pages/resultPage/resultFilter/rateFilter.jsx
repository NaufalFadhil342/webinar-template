import { useCallback } from 'react';
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiStar } from '@mdi/js';

const RateFilter = ({
    onFiltersChange,
    selectedRates,
    dark,
    ratesList
}) => {
    const handleRateChange = (rate) => {
        onFiltersChange('rates', rate.value);
    };

    const isRateSelected = useCallback((ratesValue) => {
        if (ratesValue === '') return !selectedRates || selectedRates === '';

        return selectedRates && selectedRates.toLowerCase() === ratesValue.toLowerCase()
    }, [selectedRates]);

    return (
        <section className='w-full h-auto'>
            <div className='mb-2'>
                <h3 className={`text-[1.7em] font-medium leading-none ${dark ? 'text-white' : 'text-zinc-900'}`}>Rating</h3>
            </div>
            <ul className='w-full h-auto flex flex-col' aria-label='rates options'>
                {ratesList.map((rate, index) => {

                    return (
                        <li key={index} className='w-full h-auto py-2 flex items-center gap-2'>
                            <input
                                type="radio"
                                name='rates'
                                onChange={() => handleRateChange(rate)}
                                checked={isRateSelected(rate.value)}
                                aria-checked={isRateSelected(rate.value)}
                            />
                            <div className={`flex items-center gap-1 ${dark ? 'text-zinc-300' : 'text-zinc-600'}`}>
                                <span>Up to {rate.label}</span>
                                <Icon path={mdiStar} size={0.6} className='text-yellow-500' />
                            </div>
                            <span className='text-sm text-zinc-400'>({rate.amount})</span>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
};

RateFilter.propTypes = {
    dark: PropTypes.bool,
    selectedRates: PropTypes.string.isRequired,
    onFiltersChange: PropTypes.func.isRequired,
    ratesList: PropTypes.array.isRequired
}

export default RateFilter;