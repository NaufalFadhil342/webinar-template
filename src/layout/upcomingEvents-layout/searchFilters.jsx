import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiFilter } from '@mdi/js';
import FilterDropdown from './filterDropdown';

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
            <div className={`w-full p-6 rounded-xl ${dark ? 'bg-zinc-800' : 'bg-white'} shadow-wide flex flex-col lg:flex-row gap-4`}>
                <div className="w-full flex items-center gap-2 px-4 py-2 rounded-md bg-transparent border border-gray-300 dark:border-zinc-700">
                    <input
                        type="text"
                        placeholder="Search events..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className={`w-full h-auto bg-transparent outline-none ${dark ? 'text-white' : 'text-zinc-900'}`}
                    />
                </div>
                <div className="w-full flex flex-col gap-4 xm:flex-row sm:justify-between lg:justify-start">
                    <div className="flex items-center gap-2">
                        <Icon path={mdiFilter} size={0.85} className={dark ? 'text-zinc-400' : 'text-zinc-500'} />
                        <span className={dark ? 'text-zinc-300' : 'text-zinc-700'}>Filter:</span>
                    </div>
                    <div className='w-full h-auto flex items-center justify-end gap-2'>
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