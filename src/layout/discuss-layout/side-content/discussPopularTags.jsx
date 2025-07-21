import PropTypes from 'prop-types';

const popularTags = ['webinar', 'community', 'meetings', 'tips', 'discussion', 'questions']

const DiscussPopularTags = ({ dark }) => {
    return (
        <main className={`w-full h-auto ${dark ? 'bg-zinc-800' : 'bg-white'} overflow-hidden rounded-xl shadow-md hover:cursor-default`}>
            <header className={`w-full h-auto p-3 border-l ${dark ? 'border-secondary' : 'border-primary'}`}>
                <h1 className={dark ? "text-secondary font-semibold" : "text-primary font-semibold"}>Popular Tags</h1>
            </header>
            <ul className={`p-4 border-t ${dark ? 'border-zinc-400' : 'border-zinc-200'} flex items-center flex-wrap gap-4`}>
                {popularTags.map((tag, index) => (
                    <li key={index} className={`w-fit h-auto py-1 px-3 rounded-full ${dark ? 'bg-zinc-400/20 text-white hover:bg-secondary' : 'bg-zinc-200/50 text-zinc-600 hover:bg-primary hover:text-white'} transition-all duration-150`}>#{tag}</li>
                ))}
            </ul>
        </main>
    )
};

DiscussPopularTags.propTypes = {
    dark: PropTypes.bool
}

export default DiscussPopularTags;