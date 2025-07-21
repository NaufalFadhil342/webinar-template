import { useEffect } from 'react';
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { supportData } from '../../data/supportData';
import Icon from '@mdi/react';
import PropTypes from 'prop-types';

const SupportingBy = ({ dark }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'start',
    }, [AutoScroll()]);

    useEffect(() => {
        if (!emblaApi) return;

        emblaApi.on('select', () => emblaApi.plugins().autoScroll.play());
        emblaApi.on('pointerUp', () => emblaApi.plugins().autoScroll.play());

        return () => {
            if (emblaApi) emblaApi.destroy();
        };
    }, [emblaApi]);

    return (
        <section className='w-full h-auto py-24 px-[8%]' aria-label="Trusted Companies Section">
            <h1 className={`text-center font-bold uppercase text-4xl tracking-wide transition-colors duration-300 ${dark ? 'text-secondary' : 'text-primary'
                }`}>
                Trusted by nearly 5000+ users
            </h1>
            <div className='overflow-x-hidden mt-8' ref={emblaRef}>
                <div className='w-full h-full flex'>
                    {supportData.map((icon, index) => (
                        <div
                            key={index}
                            className='min-w-0 flex-40 sm:flex-30 md:flex-20 flex items-center justify-center p-4'
                            aria-label={icon.name}
                        >
                            <Icon
                                path={icon.icon}
                                size={3}
                                className={`transition-colors duration-300 hover:scale-110 ${dark ? 'text-white hover:text-secondary' : 'text-zinc-600 hover:text-primary'
                                    }`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

SupportingBy.propTypes = {
    dark: PropTypes.bool.isRequired
}

export default SupportingBy;
