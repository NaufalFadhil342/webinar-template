import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const PopularPost = ({ dark, posts }) => {
  const popularPost = posts?.slice(3, 6) || [];

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`w-full h-auto ${dark ? 'bg-zinc-800' : 'bg-white'} rounded-md overflow-hidden`}>
      <h3 className={`h-12 flex items-center px-6 border-l ${dark ? 'border-l-secondary text-white' : 'border-l-primary text-zinc-900'} font-semibold text-xl`}>Popular Posts</h3>
      <ul className={`w-full h-auto flex flex-col gap-6 p-6 border-t ${dark ? 'border-t-zinc-300' : 'border-t-zinc-200/80'}`}>
        {popularPost.map((popular) => (
          <li key={popular.id} className="w-full h-auto flex items-center gap-4">
            <div className="w-36 h-24 overflow-hidden">
              <img className="w-full h-full object-cover" src={popular.image} alt={popular.category} />
            </div>
            <div className="w-full h-full flex flex-col">
              <Link onClick={backToTop} to={`/blog/${popular.id}`} state={{ popular }} className={`${dark ? "text-secondary" : "text-primary"} underline font-semibold`}>{popular.title}</Link>
              <div className={`text-sm ${dark ? 'text-zinc-400' : 'text-zinc-500'}`}>{popular.published}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
};

PopularPost.propTypes = {
  dark: PropTypes.bool,
  posts: PropTypes.array
}

export default PopularPost;