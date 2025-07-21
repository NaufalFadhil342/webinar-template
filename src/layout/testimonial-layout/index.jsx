import { useCallback, useEffect, useState } from 'react';
import { dummyTestimonialData } from '../../data/testimonialData';
import useEmblaCarousel from 'embla-carousel-react';
import Icon from '@mdi/react';
import { mdiAccountCircle, mdiChevronRight, mdiChevronLeft } from '@mdi/js';
import Rating from '../../UI/rating';
import PropTypes from 'prop-types';

const Testimonials = ({ dark, homePage }) => {
    const [emblaTestiRef, emblaTestiApi] = useEmblaCarousel({ align: 'start' });
    const [prevBtnDisable, setPrevBtnDisable] = useState(true);
    const [nextBtnDisable, setNextBtnDisable] = useState(true);
    const [selectedTesti, setSelectTesti] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState([]);

    const onDotBtnClick = useCallback((index) => {
        if (!emblaTestiApi) return;
        emblaTestiApi.scrollTo(index);
    }, [emblaTestiApi]);

    const nextClick = useCallback(() => {
        if (emblaTestiApi) {
            emblaTestiApi.scrollNext();
        }
    }, [emblaTestiApi]);

    const prevClick = useCallback(() => {
        if (emblaTestiApi) {
            emblaTestiApi.scrollPrev();
        }
    }, [emblaTestiApi]);

    const onInit = useCallback(() => {
        setScrollSnaps(emblaTestiApi.scrollSnapList());
    }, [emblaTestiApi]);

    const onSelect = useCallback(() => {
        setPrevBtnDisable(!emblaTestiApi.canScrollPrev());
        setNextBtnDisable(!emblaTestiApi.canScrollNext());
        setSelectTesti(emblaTestiApi.selectedScrollSnap());
    }, [emblaTestiApi]);

    useEffect(() => {
        if (!emblaTestiApi) return;

        onInit(emblaTestiApi);
        onSelect(emblaTestiApi);
        emblaTestiApi.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect);
        emblaTestiApi.on('reInit', onSelect).on('select', onSelect);

        return () => {
            emblaTestiApi.off('reInit', onInit).off('reInit', onSelect).off('select', onSelect);
            emblaTestiApi.off('reInit', onSelect).off('select', onSelect);
        }
    }, [emblaTestiApi, onSelect, onInit]);

    return (
        <section
            className={`w-full h-auto px-[8%] py-24 transition-colors duration-300 ${dark ? `${homePage ? "bg-transparent" : 'bg-zinc-800'}` : `${homePage ? 'bg-transparent' : 'bg-white'}`
                }`}
            aria-label="Testimonials Section"
        >
            <div className='w-full md:w-3/5 h-auto flex flex-col gap-3'>
                <h1 className={`text-4xl tracking-wide leading-tight uppercase font-bold transition-colors duration-300 ${dark ? 'text-white' : 'text-zinc-900'
                    }`}>
                    What Our Attendees Say
                </h1>
                <p className={`transition-colors duration-300 ${dark ? 'text-zinc-300' : 'text-zinc-600'
                    }`}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, quisquam commodi dolorem saepe cupiditate soluta odit reprehenderit maxime.
                </p>
            </div>

            <div className='overflow-x-hidden mt-16 flex flex-col gap-8' ref={emblaTestiRef}>
                <div className='flex'>
                    {dummyTestimonialData.map((data) => (
                        <div
                            key={data.id}
                            className={`flex-100 lg:flex-50 w-full h-auto flex flex-col gap-6 px-4`}
                            aria-label={`Testimonial from ${data.name}`}
                        >
                            <Rating rate={data.rate} />
                            <h3 className={`font-medium text-xl transition-colors duration-300 ${dark ? 'text-white' : 'text-zinc-900'
                                }`}>
                                &apos;{data.testimonial}&apos;
                            </h3>
                            <div className='w-full h-auto flex flex-col sm:flex-row gap-3'>
                                <Icon
                                    path={mdiAccountCircle}
                                    size={2.5}
                                    className='text-zinc-300'
                                    aria-hidden="true"
                                />
                                <div className='w-full h-auto flex flex-col sm:flex-row items-start sm:items-center gap-4'>
                                    <div className={`transition-colors duration-300 ${dark ? 'text-zinc-300' : 'text-zinc-600'
                                        }`}>
                                        <label className='font-medium'>{data.name}</label>
                                        <p className={`italic transition-colors duration-300 ${dark ? "text-secondary" : 'text-primary'
                                            }`}>
                                            {data.job}
                                        </p>
                                    </div>
                                    <div className='w-[1px] h-full bg-zinc-700 hidden sm:block' />
                                    <h3 className={`text-xl font-medium transition-colors duration-300 ${dark ? 'text-white' : 'bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'
                                        }`}>
                                        MeetNar.
                                    </h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='w-full h-auto flex gap-4 items-center justify-between'>
                    <div className='flex items-center gap-1'>
                        {scrollSnaps.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => onDotBtnClick(index)}
                                className={`w-2 h-2 rounded-full transition-colors duration-300 ${selectedTesti === index ? `${dark ? 'bg-secondary' : 'bg-primary'}` : 'bg-zinc-300'
                                    }`}
                                aria-label={`Go to testimonial ${index + 1}`}
                            ></button>
                        ))}
                    </div>
                    <div className='flex gap-3'>
                        <button
                            className={`w-10 h-10 flex items-center justify-center rounded-[100%] shadow-wide bg-white text-zinc-600 transition-all duration-150 ${dark ? 'hover:bg-secondary' : 'hover:bg-primary'
                                } hover:text-white disabled:text-zinc-700/25 hover:disabled:bg-white`}
                            onClick={prevClick}
                            disabled={prevBtnDisable}
                            aria-label="Previous testimonial"
                        >
                            <Icon path={mdiChevronLeft} size={1.2} />
                        </button>
                        <button
                            className={`w-10 h-10 mb-1 mr-1 flex items-center justify-center rounded-[100%] shadow-wide bg-white text-zinc-600 transition-all duration-150 ${dark ? 'hover:text-white bg hover:bg-secondary' : 'hover:bg-primary hover:text-white'
                                } disabled:text-zinc-700/25 hover:disabled:bg-white`}
                            onClick={nextClick}
                            disabled={nextBtnDisable}
                            aria-label="Next testimonial"
                        >
                            <Icon path={mdiChevronRight} size={1.2} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

Testimonials.propTypes = {
    dark: PropTypes.bool.isRequired,
    homePage: PropTypes.bool
}

export default Testimonials;
