import PropTypes from 'prop-types';
import { useCallback } from 'react';

const CategoryFilter = ({
    onFiltersChange,
    selectedCategory,
    dark,
    categoryOptions
}) => {
    const handleCategoryChange = useCallback((category) => {
        onFiltersChange('category', category.value);
    }, [onFiltersChange])

    return (
        <section className='w-full h-auto'>
            <h3 className={`text-[1.7em] font-medium leading-none mb-2 ${dark ? 'text-white' : 'text-zinc-900'}`}>Categories</h3>
            <ul className='w-full h-auto' aria-label='category option'>
                {categoryOptions.map((category, index) => {
                    const isSelected = selectedCategory === category.value;

                    return (
                        <li
                            key={index}
                            className={`w-full h-auto p-2 ${isSelected ? `${dark ? 'font-semibold bg-white/15 text-zinc-300' : 'font-semibold bg-primary/15 text-zinc-600'}` : `${dark ? 'text-zinc-300 hover:font-medium hover:bg-white/10' : 'text-zinc-600 hover:font-medium hover:bg-primary/10'}`} hover:cursor-pointer transition-colors duration-150 ease-in`}
                            aria-selected={isSelected}
                            onClick={() => handleCategoryChange(category)}
                        >
                            {category.label}
                        </li>
                    )
                })}
            </ul>
        </section>
    )
};

CategoryFilter.propTypes = {
    onFiltersChange: PropTypes.func.isRequired,
    selectedCategory: PropTypes.string.isRequired,
    dark: PropTypes.bool,
    categoryOptions: PropTypes.array
}

export default CategoryFilter