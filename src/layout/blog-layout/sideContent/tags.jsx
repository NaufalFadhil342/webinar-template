import PropTypes from 'prop-types';

const tags = ['AI', 'Technology', 'Wellness', 'Design', 'Travel', 'Finance', 'Productivity', 'Environment', 'Food', 'Books'];

const Tags = ({ dark }) => {
  return (
    <div className={`w-full h-auto ${dark ? "bg-zinc-800" : "bg-white"} rounded-md overflow-hidden`}>
      <h3 className={`h-12 flex items-center text-xl font-semibold px-6 border-l ${dark ? "border-l-secondary text-white" : "border-l-primary text-zinc-900"}`}>Tags</h3>
      <ul className="w-full flex flex-wrap gap-4 p-6 border-t border-t-zinc-200/80">
        {tags.map((tag, index) => (
          <li key={index} className={`px-2 py-1 rounded-full ${dark ? "bg-white/15 text-zinc-300 hover:text-zinc-600 hover:bg-white/100" : "bg-primary/15 text-zinc-600 hover:bg-primary/100"} hover:text-white 
              transition-all duration-150`}>
            <span>{tag}</span>
          </li>
        ))}
      </ul>
    </div>
  )
};

Tags.propTypes = {
  dark: PropTypes.bool
}

export default Tags