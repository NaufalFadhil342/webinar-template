import Icon from '@mdi/react';
import { mdiMenuDown } from '@mdi/js';
import PropTypes from 'prop-types';

const Sorting = ({
    sortingRef,
    handleDropdownToggle,
    sortBy,
    showMenuDown,
    sorts,
    handleSortChange,
    dark
}) => {
    return (
        <section className="w-full h-auto sm:w-auto relative" ref={sortingRef}>
            <button
                type="button"
                className={`p-3 w-full h-auto rounded-md ${dark ? 'bg-zinc-800 text-white hover:bg-secondary' : 'bg-white text-zinc-600 hover:bg-primary hover:text-white'} shadow-md transition-all duration-150 ease-in flex items-center justify-between gap-2 outline-none`}
                onClick={(e) => {
                    e.stopPropagation();
                    handleDropdownToggle('sorting');
                }}
            >
                <span>{sortBy}</span>
                <Icon path={mdiMenuDown} size={0.85} />
            </button>
            {showMenuDown === 'sorting' && (
                <ul
                    className={`w-40 h-auto ${dark ? 'bg-zinc-800' : 'bg-white'} rounded-md top-14 right-0 absolute z-[5] overflow-x-hidden`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {sorts.map((sort, index) => {
                        const isSelected = sortBy === sort.value;

                        return (
                            <li
                                key={index}
                                className={`w-full h-auto p-3 transition-all duration-150 ease-in hover:cursor-pointer ${isSelected ? `${dark ? 'bg-white/15 font-semibold text-secondary' : 'bg-primary/15 font-semibold text-primary'}` : `${dark ? 'hover:bg-white/10 hover:font-medium text-zinc-300 hover:text-secondary' : 'hover:bg-primary/10 hover:font-medium text-zinc-600 hover:text-primary'}`}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSortChange(sort.value);
                                }}
                            >
                                <span className='text-sm'>{sort.label}</span>
                            </li>
                        )
                    }
                    )}
                </ul>
            )}
        </section>
    )
};

Sorting.propTypes = {
    sortingRef: PropTypes.object.isRequired,
    handleDropdownToggle: PropTypes.func.isRequired,
    sortBy: PropTypes.string.isRequired,
    showMenuDown: PropTypes.string,
    sorts: PropTypes.array.isRequired,
    handleSortChange: PropTypes.func.isRequired,
    dark: PropTypes.bool
};

export default Sorting;