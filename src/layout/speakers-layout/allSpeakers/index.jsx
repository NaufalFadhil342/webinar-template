import { useCallback, useState } from "react";
import { dummyAllSpeakers as speakers } from "../../../data/speakersData";
import PropTypes from 'prop-types';
import Speaker from "./speaker";

const AllSpeaker = ({ dark }) => {
    const [speaker, setSpeaker] = useState(null);

    const handleClick = useCallback((speakerId) => {
        setSpeaker(prev => prev === speakerId ? null : speakerId)
    }, []);

    const selectedSpeaker = speakers.find(s => s.id === speaker);

    return (
        <section className={`w-full h-auto ${dark ? 'bg-zinc-900/50' : 'bg-white'} flex flex-col gap-10 mt-24 py-24 px-[8%] relative`}>
            <h1 className={`text-center ${dark ? 'text-white' : 'text-zinc-900'} font-semibold text-4xl uppercase leading-none`}>Our Collaborate Speakers</h1>
            <ul className="w-full h-auto grid  xm:grid-cols-2 md:grid-cols-3 gap-6 justify-center md:justify-between ">
                {speakers.map((speaker) => (
                    <li key={speaker.id} className={`w-full h-auto flex bg-transparent ${dark ? 'shadow-wide-white hover:shadow-xl hover:shadow-white/25' : 'shadow-wide hover:shadow-xl hover:shadow-zinc-900/15'} flex-col justify-center gap-2 items-center rounded-xl p-6 duration-150 transition-all ease-out`}>
                        <div className={`size-28 rounded-full border-4 ${dark ? 'border-secondary' : 'border-primary'} bg-cover bg-center`} style={{ backgroundImage: `url(${speaker.image})` }} />
                        <h3 className={`text-xl font-semibold text-center ${dark ? 'text-white' : 'text-zinc-900'}`}>{speaker.speaker}</h3>
                        <p className={`text-center ${dark ? "text-zinc-300" : "text-zinc-600"}`}>{speaker.field}</p>
                        <button
                            className={`${dark ? 'text-secondary hover:text-zinc-300' : 'text-primary hover:text-zinc-600'} underline font-medium duration-150 transition-all`}
                            type="button"
                            onClick={() => handleClick(speaker.id)}
                        >View</button>
                    </li>
                ))}
            </ul>
            {selectedSpeaker && (
                <Speaker selectedSpeaker={selectedSpeaker} setSpeaker={setSpeaker} dark={dark} />
            )}
        </section>
    )
};

AllSpeaker.propTypes = {
    dark: PropTypes.bool
}

export default AllSpeaker;