import { useState } from 'react';
import PropTypes from 'prop-types';
import FilterDropdown from './filterDropdown';
import Icon from '@mdi/react';
import { mdiFilterVariant, mdiMagnify } from '@mdi/js';

const SearchFilters = ({
    dark,
    categories,
    dates,
    selectedDate,
    selectedCategory,
    searchTerm,
    onSearchChange,
    onCategoryChange,
    onDateChange
}) => {
    const [openDropdown, setOpenDropdown] = useState(null);

    const handleDropdownToggle = (dropdownName) => {
        setOpenDropdown(prev => prev === dropdownName ? null : dropdownName);
    };

    const handleDropdownClose = () => {
        setOpenDropdown(null);
    };

    const handleSearchChange = (e) => {
        onSearchChange(e.target.value);
    };

    const handleCategoryChange = (category) => {
        onCategoryChange(category);
        handleDropdownClose();
    };

    const handleDateChange = (date) => {
        onDateChange(date);
        handleDropdownClose();
    };

    return (
        <section className='w-full h-auto px-[8%]'>
            <div className={`w-full rounded-xl flex flex-col items-center lg:flex-row gap-4`}>
                <div className="w-full flex items-center gap-2 py-4 px-3 rounded-xl shadow-[0_3px_6px_rgba(28,28,28,0.1)] bg-transparent bg-white">
                    <input
                        type="text"
                        placeholder="Search events..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className={`w-full h-auto bg-transparent outline-none ${dark ? 'text-white ' : 'text-zinc-900'}`}
                    />
                    <Icon path={mdiMagnify} size={1.3} className='text-gray-400' />
                </div>
                <div className='w-full h-auto flex items-center justify-between'>
                    <span className='text-lg text-zinc-600 hidden sm:flex items-center gap-1'>
                        <Icon path={mdiFilterVariant} size={0.8} className='-translate-y-[2px]' />
                        <>Filter</>
                    </span>
                    <div className='w-full h-auto flex flex-col xm:flex-row items-center justify-start sm:justify-end gap-2'>
                        <FilterDropdown
                            options={categories}
                            selected={selectedCategory}
                            onChange={handleCategoryChange}
                            label="Category"
                            dark={dark}
                            isOpen={openDropdown === 'category'}
                            placeholder='All Catogories'
                            onToggle={() => handleDropdownToggle('category')}
                            onClose={handleDropdownClose}
                            className='absolute top-full left-0 mt-1 w-full h-auto rounded-md shadow-lg z-10 border'
                        />
                        <FilterDropdown
                            options={dates}
                            selected={selectedDate}
                            onChange={handleDateChange}
                            label="Date"
                            dark={dark}
                            isOpen={openDropdown === 'date'}
                            placeholder='All Date'
                            onToggle={() => handleDropdownToggle('date')}
                            onClose={handleDropdownClose}
                            className='absolute top-full right-0 mt-1 w-40 h-60 overflow-y-auto rounded-md shadow-lg z-10 border'
                        />
                    </div>
                </div>
            </div>
        </section>
    )
};

SearchFilters.propTypes = {
    dark: PropTypes.bool,
    categories: PropTypes.array,
    dates: PropTypes.array,
    selectedDate: PropTypes.string,
    selectedCategory: PropTypes.string,
    searchTerm: PropTypes.string,
    setSearchTerm: PropTypes.func,
    setSelectedCategory: PropTypes.func,
    setSelectedDate: PropTypes.func,
    onSearchChange: PropTypes.func.isRequired,
    onDateChange: PropTypes.func.isRequired,
    onCategoryChange: PropTypes.func.isRequired
};

export default SearchFilters;