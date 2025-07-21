import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiTwitter, mdiLinkedin, mdiInstagram } from '@mdi/js';

const SpeakerProfile = ({ speaker, dark }) => {
    if (!speaker) {
        return (
            <div className={`w-1/3 h-auto flex flex-col items-center justify-center ${dark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                Speaker profile not available
            </div>
        );
    };

    return (
        <section className='lg:flex-[35%] py-6 md:pr-6 pr-0 h-auto flex flex-col items-center gap-6' aria-label='speaker profile'>
            <div className={`size-32 rounded-full overflow-hidden border-4 ${dark ? 'border-secondary' : 'border-primary'}`}>
                <img className='w-full h-full object-cover object-center' src={speaker?.image} alt={speaker?.speaker} />
            </div>
            <div className='flex items-center gap-2'>
                <span className={`${dark ? 'text-zinc-300 hover:text-secondary' : 'text-zinc-400/70 hover:text-primary'} duration-150 transition-all`}>
                    <Icon path={mdiTwitter} size={1.25} />
                </span>
                <span className={`${dark ? 'text-zinc-300 hover:text-secondary' : 'text-zinc-400/70 hover:text-primary'} duration-150 transition-all`}>
                    <Icon path={mdiLinkedin} size={1.25} />
                </span>
                <span className={`${dark ? 'text-zinc-300 hover:text-secondary' : 'text-zinc-400/70 hover:text-primary'} duration-150 transition-all`}>
                    <Icon path={mdiInstagram} size={1.25} />
                </span>
            </div>
        </section>
    )
};

SpeakerProfile.propTypes = {
    speaker: PropTypes.any,
    dark: PropTypes.bool
}

export default SpeakerProfile;