import { DUMMY_CONTRIBUTORS as contributors } from "../../../data/communityData";
import PropTypes from 'prop-types';

const DiscussContributors = ({ dark }) => {
    return (
        <main className={`w-full h-auto ${dark ? 'bg-zinc-800' : 'bg-white'} rounded-xl overflow-hidden`}>
            <header className={`w-full h-auto p-3 border-l ${dark ? 'border-secondary' : 'border-primary'}`}>
                <h1 className={dark ? "text-secondary font-semibold" : "text-primary font-semibold"}>Top Contributors</h1>
            </header>
            <ul className={`w-full h-auto flex flex-col gap-6 p-4 border-t ${dark ? 'border-zinc-400' : 'border-zinc-200'} `}>
                {contributors.map((contributor) => (
                    <li key={contributor.id} className="w-full flex items-center gap-6 justify-between">
                        <div className="w-auto flex items-center gap-4">
                            <div className="size-11 rounded-full overflow-hidden">
                                <img className="w-full h-full object-cover" src={contributor.userPict} alt={contributor.userName} />
                            </div>
                            <span className={dark ? "text-zinc-300" : "text-zinc-600"}>{contributor.userName}</span>
                        </div>
                        <div className="w-auto h-auto">
                            <span className={`w-auto py-1 px-3 flex items-center gap-1 rounded-full ${dark ? 'bg-zinc-400/25 text-secondary' : 'bg-zinc-200/50 text-primary'}`}>
                                {contributor.amounts} Posts
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </main>
    )
};

DiscussContributors.propTypes = {
    dark: PropTypes.bool
}

export default DiscussContributors;