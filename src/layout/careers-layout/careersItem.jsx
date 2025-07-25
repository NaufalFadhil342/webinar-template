import Icon from '@mdi/react';
import { mdiMapMarkerOutline, mdiClockOutline } from '@mdi/js';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const CareersItem = ({ dark, career }) => {
    return (
        <li
            className={`w-full h-auto p-5 flex flex-col gap-3 border-t-2 transition-all duration-300 ${dark ? "border-zinc-300 hover:bg-zinc-800/50" : "border-zinc-700 hover:bg-zinc-100"
                }`}
        >
            <div className='flex items-center gap-3'>
                <h3 className={`text-xl font-semibold ${dark ? "text-white" : "text-zinc-900"}`}>
                    {career.position}
                </h3>
                <span className={`text-sm py-1 px-2 rounded ${dark ? "text-secondary bg-zinc-300/20" : "text-zinc-600 bg-primary/20"
                    }`}>
                    {career.job}
                </span>
            </div>
            <div className='w-full h-auto'>
                <p className={dark ? "text-zinc-300" : "text-zinc-600"}>
                    {career.description}
                </p>
            </div>
            <div className='flex flex-col sm:flex-row items-start sm:items-center gap-3'>
                <span
                    className={`flex items-center gap-1 text-sm ${dark ? "text-zinc-300" : "text-zinc-600"
                        }`}
                    aria-label={`Location: ${career.location}`}
                >
                    <Icon path={mdiMapMarkerOutline} size={1} aria-hidden="true" />
                    <p>{career.location}</p>
                </span>
                <span
                    className={`flex items-center gap-1 text-sm ${dark ? "text-zinc-300" : "text-zinc-600"
                        }`}
                    aria-label={`Assignment: ${career.assignment}`}
                >
                    <Icon path={mdiClockOutline} size={1} aria-hidden="true" />
                    <p>{career.assignment}</p>
                </span>
            </div>
            <div className='mt-2'>
                <Link
                    to={`/careers/${career.id}`}
                    state={{ career }}
                    onClick={() => window.scrollTo({ top: 0 })}
                    className={`w-fit h-9 flex items-center px-4 rounded text-white transition-all duration-300 ${dark ? "bg-secondary hover:bg-darkSecondary" : "bg-primary hover:bg-darkPrimary"
                        }`}
                    aria-label={`Apply for ${career.position} position`}
                >
                    Apply Now
                </Link>
            </div>
        </li>
    )
};

CareersItem.propTypes = {
    dark: PropTypes.bool.isRequired,
    career: PropTypes.object.isRequired
}

export default CareersItem;
