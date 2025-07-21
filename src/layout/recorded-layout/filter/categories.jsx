import { useCallback, useMemo, useRef } from 'react';
import Icon from '@mdi/react';
import { mdiMenuDown } from '@mdi/js';
import PropTypes from 'prop-types';

const Categories = ({
    handleFiltersMenuToggle,
    showFiltersMenu,
    categories,
    handleCategoryChange,
    handleDropdownToggle,
    selectedCategory,
    dark
}) => {
    const categoryRef = useRef();

    const isCategorySelected = useCallback((categoryValue) => {
        if (categoryValue === 'all') {
            return !selectedCategory ||
                selectedCategory === 'All Categories' ||
                selectedCategory === 'all';
        }

        return selectedCategory &&
            selectedCategory.toLowerCase() === categoryValue.toLowerCase();
    }, [selectedCategory]);

    const handleCategoryToggle = useCallback((category) => {
        if (!handleCategoryChange) return;

        handleCategoryChange(category);
        handleDropdownToggle(null);
    }, [handleCategoryChange, handleDropdownToggle]);

    const processedCategories = useMemo(() => {
        if (!Array.isArray(categories)) {
            console.warn('Categories prop should be an array, received:', typeof categories, categories);
            return [];
        }

        return categories.filter(category =>
            category &&
            typeof category === 'object' &&
            category.value !== 'all'
        );
    }, [categories]);

    const displayText = () => {
        if (!selectedCategory ||
            selectedCategory === 'All Categories' ||
            selectedCategory === 'all') {
            return 'All Categories';
        }

        const selectedCategoryObj = categories.find(cat =>
            cat.value.toLowerCase() === selectedCategory.toLowerCase()
        );

        return selectedCategoryObj ? selectedCategoryObj.label : 'All Categories';
    };

    const allCategoriesOption = categories.find(cat => cat.value === 'all');

    return (
        <section className="w-full h-auto relative" ref={categoryRef}>
            <button
                type="button"
                className={`w-full h-auto p-2 rounded-md border hover:border-[1.5px] ${dark ?
                    'text-zinc-400 border-zinc-400/75 hover:border-white hover:text-white' : 'text-zinc-600 border-zinc-500/50 hover:border-primary hover:text-primary'} hover:font-medium transition-all duration-150 ease-in flex items-center justify-between gap-2 outline-none`}
                onClick={() => handleFiltersMenuToggle('category')}
            >
                <span className='truncate'>{displayText()}</span>
                <Icon path={mdiMenuDown} size={0.85} />
            </button>
            {showFiltersMenu === 'category' && (
                <div className={`w-full h-auto ${dark ? 'bg-zinc-800' : 'bg-white'} rounded-md absolute z-[4] left-0 top-12 shadow-wide overflow-hidden`}>
                    <ul
                        className="w-full h-auto"
                        role='listbox'
                        aria-label='Category selection options'
                    >
                        {allCategoriesOption && (
                            <li
                                className={`w-full flex items-center gap-2 p-3 cursor-pointer ${dark ? 'text-zinc-300' : 'text-zinc-600'} ${isCategorySelected(allCategoriesOption.value)
                                    ? `${dark ? 'bg-white/15' : 'bg-primary/15'} font-semibold`
                                    : `${dark ? 'hover:bg-white/10' : 'hover:bg-primary/10'} hover:font-medium`
                                    }`}
                                role='option'
                                onClick={() => handleCategoryToggle(allCategoriesOption)}
                                tabIndex={0}
                                aria-selected={isCategorySelected(allCategoriesOption.value)}
                            >
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 pointer-events-none"
                                    checked={isCategorySelected(allCategoriesOption.value)}
                                    onChange={() => { }}
                                    tabIndex={-1}
                                />
                                <div className='flex-1 flex items-center justify-between'>
                                    <span className={`text-sm`}>
                                        {allCategoriesOption.label}
                                    </span>
                                </div>
                            </li>
                        )}

                        {processedCategories.map((category, index) => (
                            <li
                                key={index}
                                className={`w-full flex items-center gap-2 p-3 cursor-pointer ${dark ? 'text-zinc-300' : 'text-zinc-600'} ${isCategorySelected(category.value)
                                    ? `${dark ? 'bg-white/15' : 'bg-primary/15'} font-semibold`
                                    : `${dark ? 'hover:bg-white/10' : 'hover:bg-primary/10'} hover:font-medium`
                                    }`}
                                role="option"
                                onClick={() => handleCategoryToggle(category)}
                                tabIndex={0}
                                aria-selected={isCategorySelected(category.value)}
                            >
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 pointer-events-none"
                                    checked={isCategorySelected(category.value)}
                                    onChange={() => { }}
                                    tabIndex={-1}
                                />
                                <span className={`text-sm truncate`}>{category.label}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </section>
    )
};

Categories.propTypes = {
    categories: PropTypes.array.isRequired,
    selectedCategory: PropTypes.string.isRequired,
    showFiltersMenu: PropTypes.string,
    handleCategoryChange: PropTypes.func.isRequired,
    handleFiltersMenuToggle: PropTypes.func.isRequired,
    handleDropdownToggle: PropTypes.func,
    dark: PropTypes.bool
};

export default Categories;