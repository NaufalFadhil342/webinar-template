import { useCallback } from 'react'
import PropTypes from 'prop-types';

const search_status = [
    { id: 'all', label: 'All', active: true },
    { id: 'live', label: 'Live', active: false },
    { id: 'upcoming', label: 'Upcoming', active: false },
]

const Status = ({
    selectedStatus,
    dark,
    onFiltersChange
}) => {

    const handleStatusChange = useCallback((status) => {
        onFiltersChange('status', status);

    }, [onFiltersChange]);

    return (
        <section className='w-full md:w-auto h-auto'>
            <div className="w-full h-auto flex flex-col sm:flex-row items-center gap-4" role="group" aria-label="status">
                {search_status.map((status) => (
                    <button
                        key={status.id}
                        onClick={() => handleStatusChange(status.id)}
                        type="button"
                        className={`w-full h-auto py-2 px-3 rounded-full border ${selectedStatus === status.id ? `${dark ? 'border-secondary bg-secondary' : 'border-primary bg-primary'} text-white` : `${dark ? 'border-secondary text-white bg-transparent hover:bg-secondary' : 'border-primary text-zinc-600 hover:bg-primary hover:text-white'}`} transition-colors duration-150 ease-in`}
                    >
                        {status.label}
                    </button>
                ))}
            </div>
        </section>
    )
};

Status.propTypes = {
    dark: PropTypes.bool,
    selectedStatus: PropTypes.string.isRequired,
    onFiltersChange: PropTypes.func.isRequired
}

export default Status;