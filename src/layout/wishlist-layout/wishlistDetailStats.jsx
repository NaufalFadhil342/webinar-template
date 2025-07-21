import PropTypes from 'prop-types';

const WishlistDetailStats = ({ selectedSessions = [], dark }) => {
  const calculateStats = () => {
    // handle empty or invalid sessions array
    if (!selectedSessions || !Array.isArray(selectedSessions) || selectedSessions?.length === 0) {
      return {
        totalSessions: 0,
        totalLearningHours: 0,
        totalValue: 0
      }
    };

    const totalSessions = selectedSessions?.length;

    const totalLearningHours = selectedSessions?.reduce((total, session) => {
      // Handle different possible duration property names
      const duration = session?.duration || session?.learningHours || session?.hours || 0;
      return total + (typeof duration === 'number' ? duration : 0);
    }, 0);

    const totalValue = selectedSessions.reduce((total, session) => {
      // Handle different possible price property names and formats
      let price = session?.price || session?.cost || session?.value || 0;

      // If price is a string (like "$30.30"), extract the numeric value
      if (typeof price === 'string') {
        // Remove currency symbols and convert to number
        price = parseFloat(price.replace(/[$,]/g, '')) || 0;
      }

      return total + (typeof price === 'number' ? price : 0);
    }, 0);

    return {
      totalSessions,
      totalLearningHours,
      totalValue
    };
  };

  // Get the calculated statistics
  const stats = calculateStats();

  // Format the total value as currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <ul className='w-full h-auto flex flex-col sm:flex-row items-center justify-center gap-8'>
      <li className={`w-full xm:w-auto h-auto py-6 px-6 ${dark ? 'bg-zinc-500/50' : 'bg-zinc-300/50'} backdrop-blur rounded-2xl flex flex-col gap-2`}>
        <div className={`text-4xl text-center font-semibold leading-none ${dark ? 'text-secondary' : 'text-primary'}`}>{stats.totalSessions}</div>
        <p className={`text-center text-lg ${dark ? 'text-zinc-300' : 'text-zinc-700'}`}>Total Sessions</p>
      </li>
      <li className={`w-full xm:w-auto h-auto py-6 px-6 ${dark ? 'bg-zinc-500/50' : 'bg-zinc-300/50'} backdrop-blur rounded-2xl flex flex-col gap-2`}>
        <div className={`text-4xl text-center font-semibold leading-none ${dark ? 'text-secondary' : 'text-primary'}`}>{stats.totalLearningHours}</div>
        <p className={`text-center text-lg ${dark ? 'text-zinc-300' : 'text-zinc-700'}`}>Learning Hours</p>
      </li>
      <li className={`w-full xm:w-auto h-auto py-6 px-6 ${dark ? 'bg-zinc-500/50' : 'bg-zinc-300/50'} backdrop-blur rounded-2xl flex flex-col gap-2`}>
        <div className={`text-4xl text-center font-semibold leading-none ${dark ? 'text-secondary' : 'text-primary'}`}>{formatCurrency(stats.totalValue)}</div>
        <p className={`text-center text-lg ${dark ? 'text-zinc-300' : 'text-zinc-700'}`}>Total Value</p>
      </li>
    </ul>
  )
};

WishlistDetailStats.propTypes = {
  selectedSessions: PropTypes.array.isRequired,
  dark: PropTypes.bool
}

export default WishlistDetailStats;