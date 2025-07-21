import Icon from "@mdi/react";
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import PropTypes from 'prop-types';

const Pagination = ({ totalPages, currentPage, onPageChange, dark }) => {
    const getPageRange = () => {
        const range = [];
        const maxPagesToShow = 5;

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                range.push(i);
            };
        } else {
            range.push(1);

            let start = Math.max(2, currentPage - 1);
            let end = Math.min(totalPages - 1, currentPage + 1);

            if (currentPage <= 2) {
                end = 4;
            } else if (currentPage >= totalPages - 1) {
                start = totalPages - 3;
            }

            if (start > 2) {
                range.push('...');
            };

            for (let i = start; i <= end; i++) {
                range.push(i)
            };

            if (end < totalPages - 1) {
                range.push('...')
            };

            range.push(totalPages);
        };

        return range;
    };

    const pageRange = getPageRange();

    return (
        <div className='flex items-center mx-auto'>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-1 rounded bg-transparent ${dark ? 'text-zinc-300' : 'text-zinc-600'} 
                ${currentPage === 1 ? `${dark ? 'text-zinc-500' : 'text-zinc-400'} cursor-not-allowed` : `${dark ? 'hover:bg-white/15' : 'hover:bg-primary/15'}`} 
                transition-colors duration-150`}
            >
                <Icon path={mdiChevronLeft} size={1} />
            </button>
            <div className="flex items-center">
                {pageRange.map((page, index) => (
                    <div key={index}>
                        {page === '...' ? (
                            <span className={`px-3 py-1 ${dark ? 'text-zinc-300' : 'text-zinc-500'}`}>...</span>
                        ) : (
                            <button
                                onClick={() => onPageChange(page)}
                                className={`px-3 py-1 rounded transition-colors duration-150
                        ${currentPage === page ?
                                        `${dark ? 'bg-secondary' : 'bg-primary'} font-medium text-white` :
                                        `bg-transparent ${dark ? 'hover:bg-white/15 text-zinc-300' : 'hover:bg-primary/15 text-zinc-600'}`}`}
                            >
                                {page}
                            </button>
                        )}
                    </div>
                ))}
            </div>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-1 rounded bg-transparent ${dark ? 'text-zinc-300' : 'text-zinc-600'} ${currentPage === totalPages ?
                    `${dark ? 'text-zinc-500' : 'text-gray-400'} cursor-not-allowed` : 'hover:bg-primary/15'
                    } transition-colors duration-150`}
            >
                <Icon path={mdiChevronRight} size={1} />
            </button>
        </div>
    )
};

Pagination.propTypes = {
    totalPages: PropTypes.number,
    currentPage: PropTypes.number,
    onPageChange: PropTypes.func,
    dark: PropTypes.bool
};

export default Pagination;