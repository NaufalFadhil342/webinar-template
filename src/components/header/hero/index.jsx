import { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Fade from 'embla-carousel-fade';
import { dummyBannerData as items } from '../../../data/bannerData';
import HeroDetail from "./heroDetail";
import { mdiChevronRight, mdiChevronLeft } from '@mdi/js';
import Icon from '@mdi/react';
import PropTypes from 'prop-types';

const Hero = ({ dark }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true
    }, [Autoplay({ delay: 6000, }), Fade()]);

    const onPrevItem = useCallback(() => {
        if (emblaApi) return emblaApi.scrollPrev();
    }, [emblaApi]);

    const onNextItem = useCallback(() => {
        if (emblaApi) return emblaApi.scrollNext();
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;

        emblaApi.on('select', () => emblaApi.plugins().autoplay.play());
        emblaApi.on("pointerUp", () => emblaApi.plugins().autoplay.play());

        return () => {
            if (emblaApi) emblaApi.destroy();
        };
    }, [emblaApi]);

    return (
        <section className="w-full h-auto relative group" aria-label="Hero Carousel">
            <div className="overflow-x-hidden" ref={emblaRef}>
                <div className="w-full h-full flex">
                    {items.map((item) => (
                        <HeroDetail
                            key={item.id}
                            id={item.id}
                            image={item.image}
                            title={item.title}
                            description={item.description}
                            narasumber={item.narasumber}
                            aria-label={`Slide ${item.id + 1}: ${item.title}`}
                            dark={dark}
                        />
                    ))}
                </div>
            </div>
            <div className="w-full px-8 h-auto absolute flex justify-between top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                    className={`group w-10 h-10 rounded-[100%] flex items-center justify-center bg-white text-zinc-600 shadow-wide transition-all duration-150 hover:cursor-pointer -ml-8 group-hover:ml-0 ${dark ? 'hover:bg-secondary focus:bg-secondary hover:text-white' : 'hover:bg-primary focus:bg-primary hover:text-white'
                        }`}
                    onClick={onPrevItem}
                    aria-label="Previous Slide"
                >
                    <Icon
                        path={mdiChevronLeft}
                        size={1.5}
                    />
                </button>
                <button
                    className={`group w-10 h-10 rounded-[100%] flex items-center justify-center bg-white text-zinc-600 shadow-wide transition-all duration-150 hover:cursor-pointer -mr-8 group-hover:mr-0 ${dark ? 'hover:bg-secondary focus:bg-secondary hover:text-white' : 'hover:bg-primary focus:bg-primary hover:text-white'
                        }`}
                    onClick={onNextItem}
                    aria-label="Next Slide"
                >
                    <Icon
                        path={mdiChevronRight}
                        size={1.5}
                    />
                </button>
            </div>
        </section>
    );
}

Hero.propTypes = {
    dark: PropTypes.bool.isRequired,
};

export default Hero;
