import Icon from "@mdi/react";
import { mdiTwitter, mdiLinkedin, mdiInstagram } from '@mdi/js';
import PropTypes from 'prop-types';
import { Link } from "react-router";

const Speaker = ({ selectedSpeaker, setSpeaker, dark }) => {
    const handleSpeaker = () => {
        window.scrollTo(0, 0);
    };

    return (
        <div className="fixed w-full h-screen flex items-center justify-center top-0 left-0 bg-zinc-900/60 px-[8%] z-10" onClick={() => setSpeaker(null)}>
            <div className={`w-full sm:w-3/4 lg:w-1/2 h-auto p-6 rounded-xl ${dark ? 'bg-zinc-900 shadow-wide-white' : 'bg-white'} flex flex-col`} onClick={(e) => e.stopPropagation()}>
                <div className={`w-1/2 h-auto mx-auto flex flex-col items-center pb-4 border-b ${dark ? 'border-zinc-600' : 'border-zinc-300'}`}>
                    <div className={`size-40 rounded-full overflow-hidden border-4 ${dark ? 'border-secondary' : 'border-primary'}`}>
                        <img className="w-full h-full object-cover object-center" src={selectedSpeaker?.image} alt={selectedSpeaker?.speaker} />
                    </div>
                    <div className="w-full flex justify-center gap-2 mt-4">
                        <span className={`${dark ? 'text-zinc-300 hover:text-secondary' : 'text-zinc-400/70 hover:text-primary'} transition-all duration-150`}>
                            <Icon path={mdiTwitter} size={1.25} />
                        </span>
                        <span className={`${dark ? 'text-zinc-300 hover:text-secondary' : 'text-zinc-400/70 hover:text-primary'} transition-all duration-150`}>
                            <Icon path={mdiLinkedin} size={1.25} />
                        </span>
                        <span className={`${dark ? 'text-zinc-300 hover:text-secondary' : 'text-zinc-400/70 hover:text-primary'} transition-all duration-150`}>
                            <Icon path={mdiInstagram} size={1.25} />
                        </span>
                    </div>
                </div>
                <div className="w-full h-auto mt-4 flex flex-col">
                    <h2 className={`font-medium ${dark ? 'text-white' : 'text-zinc-900'} mb-2`}>{selectedSpeaker?.speaker}</h2>
                    <div className={`text-[2em] font-semibold ${dark ? 'text-secondary' : 'text-primary'} leading-none`}>{selectedSpeaker?.field}</div>
                    <p className={`h-24 overflow-x-auto lg:h-full md:overflow-x-visible ${dark ? 'text-zinc-300' : 'text-zinc-600'} mt-6`}>{selectedSpeaker?.bios}</p>
                    <Link
                        to={`/speakers/${selectedSpeaker?.id}`}
                        onClick={() => handleSpeaker(selectedSpeaker)}
                        state={{ speaker: selectedSpeaker }}
                        className={`w-fit h-8 text-[15px] mx-auto mt-6 flex items-center px-4 rounded-md text-white ${dark ? 'bg-secondary hover:bg-darkSecondary' : 'bg-primary hover:bg-darkPrimary'} transition-all duration-150`}
                    >
                        View Sessions
                    </Link>
                </div>
            </div>
        </div>
    )
};

Speaker.propTypes = {
    selectedSpeaker: PropTypes.any,
    setSpeaker: PropTypes.func,
    dark: PropTypes.bool
};

export default Speaker;