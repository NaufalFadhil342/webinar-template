import PropTypes from 'prop-types';

const SpeakerBios = ({ speaker, dark }) => {
    return (
        <div className={`lg:flex-[65%] h-auto flex flex-col justify-center border-t-2 md:border-t-0 md:border-l-2 ${dark ? 'border-secondary' : 'border-primary'} py-6 md:px-6`} aria-label='speaker bios'>
            <div className={`font-medium ${dark ? 'text-white' : 'text-zinc-900'} mb-2`}>{speaker?.speaker}</div>
            <h2 className={`text-[2em] font-semibold ${dark ? 'text-secondary' : 'text-primary'} leading-none`}>{speaker?.field}</h2>
            <p className={`${dark ? 'text-zinc-300' : 'text-zinc-600'} mt-6`}>{speaker?.bios}</p>
        </div>
    )
};

SpeakerBios.propTypes = {
    speaker: PropTypes.any,
    dark: PropTypes.bool
}

export default SpeakerBios;