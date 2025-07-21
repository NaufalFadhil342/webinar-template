import { useCallback, useEffect, useRef, useState } from 'react';
import Icon from '@mdi/react';
import { mdiChevronDown } from '@mdi/js';
import PropTypes from 'prop-types';
import { AnimatePresence, motion } from 'motion/react';

const Categories = ({
    onFiltersChange,
    selectedCategory,
    dark,
    categoryOptions
}) => {
    const [showCategory, setShowCategory] = useState(false);
    const categoryRef = useRef();

    const toggleCategory = () => {
        setShowCategory(prev => !prev)
    }

    const isCategoryChange = useCallback((category) => {
        onFiltersChange('category', category.value);
        setShowCategory(false);
    }, [onFiltersChange])

    useEffect(() => {
        const handleOutside = (event) => {
            if (categoryRef.current && !categoryRef.current.contains(event.target)) {
                setShowCategory(false);
            };
        };

        window.addEventListener('mousedown', handleOutside);
        return () => window.removeEventListener('mousedown', handleOutside);
    }, []);

    const displayText = () => {
        if (!selectedCategory || selectedCategory === ''
        ) return 'Categories';

        const selectCategoryObj = categoryOptions.find((cat) =>
            cat.value === selectedCategory
        );

        return selectCategoryObj ? selectCategoryObj.label : 'Categories'
    }

    return (
        <section className='w-auto h-auto relative hidden lg:block' ref={categoryRef}>
            <button
                type='button'
                onClick={toggleCategory}
                className={`py-2 px-3 border rounded-primary bg-transparent outline-none rounded-full ${dark ? 'text-white hover:bg-secondary border-secondary' : 'text-zinc-600 hover:bg-primary hover:text-white border-primary'} flex items-center gap-2 transition-colors duration-150 ease-in`}
            >
                <span className='truncate'>{displayText()}</span>
                <Icon path={mdiChevronDown} size={0.75} />
            </button>
            <AnimatePresence>
                {showCategory && <motion.ul
                    className={`w-40 h-auto absolute rounded-md mt-2 top-full left-0 z-[3] ${dark ? 'bg-zinc-800' : 'bg-white'} shadow-md overflow-x-hidden`}
                    aria-haspopup='menu'
                    aria-label='categories options'
                    onClick={(e) => e.stopPropagation()}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeIn' }}
                >
                    {categoryOptions.map((category, index) => {
                        const isSelected = selectedCategory === category.value;

                        return (
                            <li
                                key={index}
                                className={`w-full h-auto p-3 hover:cursor-pointer ${isSelected ? `${dark ? 'text-white bg-white/15 font-semibold' : 'text-zinc-600 bg-primary/15 font-semibold'}` : `${dark ? 'text-zinc-300 hover:bg-white/10 hover:font-medium' : 'text-zinc-600 hover:bg-primary/10 hover:font-medium'}`}`}
                                onClick={() => isCategoryChange(category)}
                                aria-selected={isSelected}
                            >
                                {category.label}
                            </li>
                        )
                    })}
                </motion.ul>}
            </AnimatePresence>
        </section>
    )
};

Categories.propTypes = {
    dark: PropTypes.bool,
    onFiltersChange: PropTypes.func.isRequired,
    selectedCategory: PropTypes.string.isRequired,
    categoryOptions: PropTypes.array
}

export default Categories;