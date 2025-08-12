import { useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Icon from '@mdi/react';
import { mdiClock, mdiAccountGroup } from '@mdi/js';
import { motion } from 'motion/react';
import PropTypes from 'prop-types';

const PopularWebinars = ({ dark, webinars }) => {
    const autoplayOptions = {
        delay: 4000,
        stopOnInteraction: false,
        stopOnLastSnap: false,
    };

    const [emblaLivesRef, emblaLivesApi] = useEmblaCarousel({ align: 'start', loop: true }, [Autoplay(autoplayOptions)]);

    const splitWebinars = webinars.slice(0, 3);

    useEffect(() => {
        if (!emblaLivesApi) return;

        const autoplay = emblaLivesApi.plugins().autoplay;
        if (!autoplay) return;

        const handleSelect = () => {
            autoplay.reset();
        };

        const handlePointerUp = () => {
            setTimeout(() => {
                if (autoplay) {
                    autoplay.play();
                }
            }, 2000);
        };

        emblaLivesApi.on('select', handleSelect);
        emblaLivesApi.on('pointerUp', handlePointerUp);

        return () => {
            if (emblaLivesApi) {
                emblaLivesApi.off('select', handleSelect);
                emblaLivesApi.off('pointerUp', handlePointerUp);
            }
        };
    }, [emblaLivesApi, emblaLivesRef])

    return (
        <div className='w-full h-auto flex flex-col gap-6'>
            <h1 className={`text-4xl font-semibold ${dark ? 'text-white' : 'text-zinc-900'} uppercase`}>Populars Events</h1>
            <div
                className='w-full h-auto overflow-x-hidden'
                ref={emblaLivesRef}
            >
                <ul className='flex gap-3'>
                    {splitWebinars.map((webinar) => (
                        <li key={webinar.id} className={`flex-100 p-6 h-fit ${dark ? 'bg-secondary' : 'bg-primary'} rounded-2xl flex flex-col gap-4`}>
                            <button className='w-fit h-auto py-[5px] px-2 rounded-full bg-white/30 backdrop-blur flex items-center gap-2'>
                                <motion.div
                                    className='size-2 bg-white rounded-full'
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1.25, repeat: Infinity, ease: 'easeInOut' }}
                                />
                                <p className='text-white font-semibold text-sm'>Live Now</p>
                            </button>
                            <div className='w-full h-auto'>
                                <h2 className='text-3xl font-semibold text-white leading-none'>{webinar.title}</h2>
                                <p className={dark ? 'text-zinc-200 mt-4' : 'text-zinc-300 mt-4'}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti veniam, quas, nulla vero ex assumenda sint possimus nam, impedit sequi eos. Doloribus ratione dolorum numquam pariatur repellendus facere, numquam nemo.</p>
                            </div>
                            <div className='w-full h-auto flex flex-col xm:flex-row xm:justify-between gap-4'>
                                <span className={`flex xm:flex-col md:flex-row md:items-center gap-2 ${dark ? 'text-zinc-200' : 'text-zinc-300'}`}>
                                    <>Speaker:</>
                                    <p className='text-white font-semibold'>{webinar.speaker}</p>
                                </span>
                                <div className='flex flex-col md:flex-row md:items-center gap-2 md:gap-4'>
                                    <span className={`flex items-start gap-2 ${dark ? 'text-zinc-200' : 'text-zinc-300'}`}>
                                        <Icon path={mdiClock} size={1} className='text-white' />
                                        <>Started 15 min ago</>
                                    </span>
                                    <span className={`flex items-center gap-2 ${dark ? 'text-zinc-200' : 'text-zinc-300'}`}>
                                        <Icon path={mdiAccountGroup} size={1} className='text-white' />
                                        <>1.247 watching</>
                                    </span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
};

PopularWebinars.propTypes = {
    dark: PropTypes.bool.isRequired,
    webinars: PropTypes.array.isRequired
};

export default PopularWebinars;