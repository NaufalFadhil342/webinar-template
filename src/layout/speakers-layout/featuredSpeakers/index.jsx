import { useEffect, useState, useCallback } from 'react';
import Icon from '@mdi/react';
import { mdiTwitter, mdiLinkedin, mdiInstagram } from '@mdi/js';
import { Link } from 'react-router-dom';
import { dummyFeaturedSpeakers as speakers } from '../../../data/speakersData';
import useEmblaCarousel from 'embla-carousel-react';
import PropTypes from 'prop-types';
import ButtonArrow from './buttonArrow';

const FeaturedSpeakers = ({ dark }) => {
    const [emblaFeaturedSpeakerRef, emblaFeaturedSpeakerApi] = useEmblaCarousel({ align: 'start' });
    const [prevBtnDisable, setPrevBtnDisable] = useState(true);
    const [nextBtnDisable, setNextBtnDisable] = useState(true);

    const prevButton = useCallback(() => {
        if (emblaFeaturedSpeakerApi) {
            emblaFeaturedSpeakerApi.scrollPrev();
        };

    }, [emblaFeaturedSpeakerApi]);

    const nextButton = useCallback(() => {
        if (emblaFeaturedSpeakerApi) {
            emblaFeaturedSpeakerApi.scrollNext();
        };

    }, [emblaFeaturedSpeakerApi]);

    const edgeTopLeft = (
        <div className={`${dark ? 'bg-zinc-700' : 'bg-[#f1f1f3]'} w-[2.7rem] h-10 rounded-br-xl absolute top-0 left-0 z-[3]`}>
            <div className={`${dark ? 'bg-zinc-700' : 'bg-[#F1F1F3]'} w-5 h-4 absolute z-[5] top-0 left-10`}>
                <div className={`w-full h-full ${dark ? 'bg-secondary' : 'bg-primary'} rounded-tl-xl absolute left-[3px]`} />
            </div>
            <div className={`${dark ? 'bg-zinc-700' : 'bg-[#F1F1F3]'} w-4 h-5 absolute z-[5] top-10 left-0`}>
                <div className={`w-full h-full ${dark ? 'bg-secondary' : 'bg-primary'} rounded-tl-xl`} />
            </div>
        </div>
    );

    const edgeBottomRight = (
        <div className={`${dark ? 'bg-zinc-700' : 'bg-[#f1f1f3]'} w-[2.7rem] h-10 rounded-tl-xl absolute bottom-0 right-0 z-[3]`}>
            <div className={`${dark ? 'bg-zinc-700' : 'bg-[#F1F1F3]'} w-4 h-5 absolute z-[5] bottom-10 right-0`}>
                <div className={`w-full h-full ${dark ? 'bg-secondary' : 'bg-primary'} rounded-br-xl`} />
            </div>
            <div className={`${dark ? 'bg-zinc-700' : 'bg-[#F1F1F3]'} w-5 h-4 absolute z-[5] bottom-0 right-10`}>
                <div className={`w-full h-full ${dark ? 'bg-secondary' : 'bg-primary'} rounded-br-xl absolute right-[3px]`} />
            </div>
        </div>
    );

    const onSelect = useCallback(() => {
        setPrevBtnDisable(!emblaFeaturedSpeakerApi.canScrollPrev());
        setNextBtnDisable(!emblaFeaturedSpeakerApi.canScrollNext());
    }, [emblaFeaturedSpeakerApi]);

    useEffect(() => {
        if (!emblaFeaturedSpeakerApi) return;

        onSelect(emblaFeaturedSpeakerApi);
        emblaFeaturedSpeakerApi.on('reInit', onSelect).on('select', onSelect);

        return () => {
            emblaFeaturedSpeakerApi.off('reInit', onSelect).off('select', onSelect);
        }
    }, [emblaFeaturedSpeakerApi, onSelect]);

    const handleSpeaker = (speaker) => {
        window.scrollTo(0, 0);
        localStorage.setItem('currentSpeaker', JSON.stringify(speaker))
    };

    return (
        <section className='w-full h-auto px-[8%] flex flex-col gap-10'>
            <div className='w-full h-auto flex items-end gap-10 justify-between'>
                <h1 className={`w-full md:w-3/5 ${dark ? 'text-white' : 'text-zinc-900'} text-4xl text-left leading-tight font-semibold uppercase`}>
                    Explore their <span className={dark ? 'text-secondary' : 'text-primary'}>stories</span>, discover their <span className={dark ? 'text-secondary' : 'text-primary'}>expertise</span>, and find out what they&#39;ll be speaking about at <span className={dark ? 'text-secondary' : 'bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'}>MeetNar</span>.
                </h1>
                <div className='w-auto h-auto md:flex items-center gap-4 hidden'>
                    <ButtonArrow
                        nextButton={nextButton}
                        prevButton={prevButton}
                        nextBtnDisable={nextBtnDisable}
                        prevBtnDisable={prevBtnDisable}
                        dark={dark}
                    />
                </div>
            </div>
            <div className='w-full h-auto overflow-x-hidden' ref={emblaFeaturedSpeakerRef}>
                <div className='flex gap-3'>
                    {speakers.map((speaker) => (
                        <div key={speaker.id} className='flex-100 w-full h-auto flex flex-col lg:flex-row gap-8'>
                            <div className="lg:flex-[30%] w-full">
                                <div className={`w-full h-80 lg:h-full ${dark ? 'bg-secondary' : 'bg-primary'} relative p-4 rounded-xl`}>
                                    <div className='w-full h-full bg-cover bg-no-repeat bg-center rounded-xl' style={{ backgroundImage: `url(${speaker.image})` }}>
                                        <>{edgeTopLeft}</>
                                        <>{edgeBottomRight}</>
                                    </div>
                                    <div className={`size-3 rounded-full ${dark ? 'bg-secondary' : 'bg-primary'} absolute top-4 left-4 z-[5]`} />
                                    <div className={`size-3 rounded-full ${dark ? 'bg-secondary' : 'bg-primary'} absolute bottom-4 right-4 z-[5]`} />
                                </div>
                            </div>
                            <div className="lg:flex-[70%] w-full h-full overflow-hidden">
                                <div className={`w-full h-full p-6 flex flex-col justify-center gap-4 border-b-4 lg:border-b-0 lg:border-r-4 ${dark ? 'bg-zinc-900/50 border-secondary' : 'bg-white border-primary'} rounded-xl`}>
                                    <div>
                                        <h2 className={`text-3xl font-semibold ${dark ? 'text-white' : 'text-zinc-900'}`}>{speaker.speaker}</h2>
                                        <span className={`text-lg font-medium ${dark ? 'text-secondary' : 'text-primary'}`}>{speaker.field}</span>
                                    </div>
                                    <p className={dark ? 'text-zinc-300' : 'text-zinc-600'}>{speaker.bios}</p>
                                    <div className='w-full flex items-center gap-2'>
                                        <span className={`${dark ? 'text-zinc-300 hover:text-secondary' : 'text-zinc-400/70 hover:text-primary'} transition-colors duration-150`}>
                                            <Icon path={mdiTwitter} size={1.25} />
                                        </span>
                                        <span className={`${dark ? 'text-zinc-300 hover:text-secondary' : 'text-zinc-400/70 hover:text-primary'} transition-colors duration-150`}>
                                            <Icon path={mdiLinkedin} size={1.25} />
                                        </span>
                                        <span className={`${dark ? 'text-zinc-300 hover:text-secondary' : 'text-zinc-400/70 hover:text-primary'} transition-colors duration-150`}>
                                            <Icon path={mdiInstagram} size={1.25} />
                                        </span>
                                    </div>
                                    <Link
                                        to={`/speakers/${speaker.id}`}
                                        onClick={() => handleSpeaker(speaker)}
                                        state={{ speaker }}
                                        className={`w-fit h-8 px-4 flex items-center rounded-md bg-primary text-white text-[15px] ${dark ? 'bg-secondary hover:bg-darkSecondary' : 'bg-primary hover:bg-darkPrimary'} duration-150 transition-all`}
                                    >
                                        View Sessions
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='w-full h-auto md:hidden flex justify-center gap-4 mt-8'>
                    <ButtonArrow
                        nextButton={nextButton}
                        prevButton={prevButton}
                        nextBtnDisable={nextBtnDisable}
                        prevBtnDisable={prevBtnDisable}
                        dark={dark}
                    />
                </div>
            </div>
        </section>
    )
};

FeaturedSpeakers.propTypes = {
    dark: PropTypes.bool
}

export default FeaturedSpeakers;