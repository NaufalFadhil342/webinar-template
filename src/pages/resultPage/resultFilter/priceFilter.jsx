import { useCallback } from 'react';
import PropTypes from 'prop-types';

const PriceFilter = ({
    onFiltersChange,
    selectedPrice,
    dark,
    priceOptions
}) => {
    const handlePriceChange = useCallback((costs) => {
        onFiltersChange('costs', costs.value)
    }, [onFiltersChange]);

    const isPriceSelected = useCallback((costs) => {
        return selectedPrice === costs.value
    }, [selectedPrice])

    return (
        <section className='w-full h-auto'>
            <h3 className={`text-[1.7em] font-medium mb-2 leading-none ${dark ? 'text-white' : 'text-zinc-900'}`}>Price</h3>
            <ul className='w-full h-auto' aria-label='prices option'>
                {priceOptions.map((costs, index) => (
                    <li
                        key={index}
                        className='w-full h-auto flex items-center gap-2 py-2'
                        role='option'
                        onClick={() => handlePriceChange(costs)}
                    >
                        <input
                            type="radio"
                            name='costs'
                            onChange={() => handlePriceChange(costs)}
                            checked={isPriceSelected(costs)}
                            aria-checked={isPriceSelected(costs)}
                            className='cursor-pointer'
                        />
                        <div className='w-full h-auto flex items-center gap-2'>
                            <h5 className={dark ? 'text-zinc-300 font-medium' : 'text-zinc-600 font-medium'}>{costs.label}</h5>
                            <span className='text-sm text-zinc-400'>({costs.amount})</span>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
};

PriceFilter.propTypes = {
    onFiltersChange: PropTypes.func.isRequired,
    selectedPrice: PropTypes.string.isRequired,
    priceOptions: PropTypes.array,
    dark: PropTypes.bool
}

export default PriceFilter