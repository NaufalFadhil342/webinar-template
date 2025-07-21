import PropTypes from 'prop-types';

const SessionDate = ({ dates, selectedDate, setSelectedDate, dark }) => {
    return (
        <section className="w-full flex items-center gap-6">
            {dates.map((date, index) => (
                <button
                    key={index}
                    className={`w-auto h-auto py-4 px-6 cursor-pointer rounded-lg ${selectedDate === index ? `${dark ? 'bg-secondary hover:bg-darkSecondary' : 'bg-primary hover:bg-darkPrimary'} text-white` : `${dark ? 'bg-zinc-800 text-zinc-300 hover:bg-secondary' : 'bg-white text-zinc-600 hover:bg-primary hover:text-white'}`} duration-150 transition-all`}
                    onClick={() => setSelectedDate(index)}
                >
                    {date}
                </button>
            ))}
        </section>
    )
};

SessionDate.propTypes = {
    dates: PropTypes.array,
    selectedDate: PropTypes.number.isRequired,
    setSelectedDate: PropTypes.func.isRequired,
    dark: PropTypes.bool
}

export default SessionDate;