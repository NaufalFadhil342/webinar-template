import PropTypes from 'prop-types';

const AboutBlog = ({ dark }) => {
  return (
    <div className={`w-full h-auto ${dark ? 'bg-zinc-800' : 'bg-white'} rounded-md overflow-hidden`}>
      <h3 className={`h-12 px-6 border-l ${dark ? "border-l-secondary text-white" : "border-l-primary text-zinc-900"} flex items-center text-xl leading-none font-semibold`}>About Blog</h3>
      <p className={`w-full h-auto ${dark ? "text-zinc-300 border-t-zinc-400" : "text-zinc-500 border-t-zinc-200/80"} p-6 border-t`}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia fugiat, deserunt possimus repellendus soluta qui cupiditate porro, obcaecati placeat omnis aspernatur sed earum minima.
      </p>
    </div>
  );
};

AboutBlog.propTypes = {
  dark: PropTypes.bool
};

export default AboutBlog;