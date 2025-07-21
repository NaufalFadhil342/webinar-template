import PropTypes from 'prop-types';
import { DUMMY_DISCUSSSTATS } from '../../../data/communityData';
import Icon from '@mdi/react';

const DiscussStatistics = ({ dark }) => {
  return (
    <main className={`w-full h-auto rounded-md overflow-hidden shadow-md shadow-zinc-500/15 ${dark ? 'bg-zinc-800' : 'bg-white '}`}>
      <header className={`w-full h-auto p-3 border-l-2 ${dark ? "border-secondary" : "border-primary"}`} aria-label="discuss statistics">
        <h1 className={`font-semibold ${dark ? "text-secondary" : "text-primary"}`}>Discuss Statistics</h1>
      </header>
      <section className={`w-full h-auto flex flex-col gap-6 p-6 border-t ${dark ? 'border-zinc-400' : 'border-zinc-200'}`}>
        {DUMMY_DISCUSSSTATS.map((stat, index) => (
          <div key={index} className={`${dark ? 'bg-zinc-700' : 'bg-zinc-200/50'} p-4 w-full h-auto flex items-center gap-4`}>
            <span className={`size-16 flex items-center justify-center ${dark ? 'bg-zinc-900/50' : 'bg-white'}`}>
              <Icon path={stat.icon} size={1.25} className={dark ? 'text-secondary' : 'text-primary'} />
            </span>
            <section className='flex flex-col'>
              <h3 className={`text-2xl font-bold ${dark ? 'text-white' : 'text-zinc-900'}`}>{stat.amounts}</h3>
              <p className='text-sm text-zinc-400'>{stat.text}</p>
            </section>
          </div>
        ))}
      </section>
    </main>
  );
};

DiscussStatistics.propTypes = {
  dark: PropTypes.bool
};

export default DiscussStatistics;