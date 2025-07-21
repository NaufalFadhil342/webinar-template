import { teamData as teams } from "../../data/teamData";
import PropTypes from 'prop-types';
import TeamDetail from "./teamDetail";
import { useNavigate } from "react-router-dom";

const TeamMates = ({ dark }) => {
    const navigate = useNavigate();

    const openPosition = (to) => {
        window.scrollTo({ top: 0 });
        navigate(to);
    }

    return (
        <div
            className={`w-full h-auto py-24 px-[8%] transition-colors duration-300 ${dark ? "bg-zinc-800" : "bg-white"
                } flex flex-col gap-12`}
            aria-label="Our Team Section"
        >
            <div className="w-full h-auto flex flex-col gap-3">
                <span className={`italic text-[15px] transition-colors duration-300 ${dark ? 'text-secondary' : 'text-primary'
                    }`}>
                    Meet
                </span>
                <h1 className={`${dark ? 'text-white' : 'text-zinc-900'} font-bold text-4xl tracking-wide uppercase transition-colors duration-300`}>
                    Our Team
                </h1>
                <p className={`transition-colors duration-300 ${dark ? "text-zinc-300" : "text-zinc-600"
                    }`}>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit dolorem nobis.
                </p>
            </div>

            <div className="w-full h-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-10 py-4 overflow-y-hidden">
                {teams.map((team) => (
                    <TeamDetail
                        dark={dark}
                        key={team.id}
                        name={team.name}
                        job={team.job}
                        image={team.image}
                        description={team.description}
                    />
                ))}
            </div>

            <div className="w-full h-auto flex flex-col gap-3">
                <h1 className={`text-4xl font-bold transition-colors duration-300 ${dark ? "text-white" : "text-zinc-900"
                    }`}>
                    We&apos;re Hiring!
                </h1>
                <p className={`transition-colors duration-300 ${dark ? "text-zinc-300" : "text-zinc-600"
                    }`}>
                    Join our dynamic team and make an impact
                </p>
                <button
                    className={`w-fit h-9 mt-2 flex items-center px-4 rounded text-white hover:cursor-pointer transition-colors duration-300 ${dark ? "bg-secondary hover:bg-darkSecondary" : "bg-primary hover:bg-darkPrimary"
                        }`}
                    onClick={() => openPosition('/careers')}
                    aria-label="View open positions"
                >
                    Open Positions
                </button>
            </div>
        </div>
    )
}

TeamMates.propTypes = {
    dark: PropTypes.bool.isRequired
}

export default TeamMates;
