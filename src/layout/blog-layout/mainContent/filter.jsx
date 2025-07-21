import Icon from "@mdi/react";
import { mdiSortAscending, mdiSortDescending, mdiSort } from '@mdi/js';
import Search from '../../../UI/search';
import PropTypes from 'prop-types';

const Filter = ({ handleSorting, sortBy, setSearchQuery, searchQuery, performSearch, dark }) => {

    const getSortIcon = () => {
        if (sortBy === 'asc') return mdiSortDescending;
        if (sortBy === 'desc') return mdiSortAscending;
        return mdiSort;
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();

        performSearch();
    };

    return (
        <div className="w-full h-auto flex items-center gap-4">
            <div className="flex items-center gap-3">
                <span
                    onClick={handleSorting}
                    className={`size-10 bg-transparent rounded flex items-center justify-center ${dark ? 'text-zinc-300 hover:bg-white hover:text-zinc-600' : 'text-zinc-600 hover:bg-primary hover:text-white'} transition-all duration-150`}>
                    <Icon path={getSortIcon()} size={1} />
                </span>
            </div>
            <div className="w-full h-auto">
                <Search
                    className='w-full h-auto'
                    placeholder='Search for articles...'
                    searchIcon={true}
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onSubmit={handleSearch}
                    dark={dark}
                />
            </div>
        </div>
    )
};

Filter.propTypes = {
    handleSorting: PropTypes.func,
    sortBy: PropTypes.string,
    setSearchQuery: PropTypes.func,
    searchQuery: PropTypes.string,
    performSearch: PropTypes.func,
    dark: PropTypes.bool
};

export default Filter;