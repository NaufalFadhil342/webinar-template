import propTypes from 'prop-types';

const NewsLetter = ({ dark }) => {
  return (
    <div className={`w-full h-auto ${dark ? 'bg-zinc-800' : 'bg-white'} rounded-md overflow-hidden`}>
      <h3 className={`h-12 flex items-center text-xl font-semibold ${dark ? 'text-white border-l-secondary' : 'text-zinc-900 border-l-primary'} px-6 border-l`}>Newsletter</h3>
      <div className={`w-full h-auto p-6 flex flex-col gap-6 border-t ${dark ? 'border-t-zinc-400' : 'border-t-zinc-200/80'}`}>
        <p className={dark ? "text-zinc-300" : "text-zinc-500"}>Subscribe to our newsletter and never miss our latest posts and updates.</p>
        <div className="w-full h-auto flex items-center gap-6">
          <input
            type="email"
            className={`bg-transparent h-10 w-full px-2 outline-none placeholder:text-sm text-sm border-b ${dark ? 'border-secondary text-zinc-300' : 'border-primary text-zinc-500'}`}
            placeholder="Your email address"
          />
          <button
            type="submit"
            className={`w-fit h-10 flex items-center px-4 text-sm rounded ${dark ? "bg-secondary text-white hover:bg-darkSecondary" : "bg-primary text-white hover:bg-darkPrimary"} transition-colors duration-150`}
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  )
};

NewsLetter.propTypes = {
  dark: propTypes.bool
}

export default NewsLetter; 