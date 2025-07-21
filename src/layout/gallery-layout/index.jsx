import { useEffect, useState } from 'react';
import { galleryData } from '../../data/galleryData';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import GalleryItem from './galleryItem';
import PropTypes from 'prop-types';

const Gallery = ({ dark }) => {
    const autoScrollOptions = {
        stopOnInteraction: false,
        stopOnMouseEnter: false,
        stopOnFocusIn: false
    }

    const [hoverGallery, setHoverGallery] = useState(null);

    const [firstGalleryRef, firstGalleryApi] = useEmblaCarousel({
        loop: true,
        align: 'center'
    }, [AutoScroll(autoScrollOptions)]);

    const [secondGalleryRef, secondGalleryApi] = useEmblaCarousel({
        loop: true,
        align: 'center',
        direction: 'rtl'
    }, [AutoScroll(autoScrollOptions)]);

    useEffect(() => {
        if (!firstGalleryApi || !secondGalleryApi) return;

        const handleFirstGallery = () => {
            const autoScroll = firstGalleryApi.plugins().autoScroll;
            if (autoScroll) {
                autoScroll.stop();
                setTimeout(() => {
                    if (autoScroll) autoScroll.play();
                }, 1000)
            }
        };

        const handleSecondGallery = () => {
            const autoScroll = secondGalleryApi.plugins().autoScroll;
            if (autoScroll) {
                autoScroll.stop();
                setTimeout(() => {
                    if (autoScroll) autoScroll.play();
                }, 1000)
            }
        };

        firstGalleryApi.on('pointerDown', handleFirstGallery)
        secondGalleryApi.on('pointerDown', handleSecondGallery)
        firstGalleryApi.on('pointerUp', handleFirstGallery)
        secondGalleryApi.on('pointerUp', handleSecondGallery)

        return () => {
            if (firstGalleryApi) {
                firstGalleryApi.off('pointerDown', handleFirstGallery);
                firstGalleryApi.off('pointerUp', handleFirstGallery);
                firstGalleryApi.destroy();
            }
            if (secondGalleryApi) {
                secondGalleryApi.off('pointerDown', handleSecondGallery);
                secondGalleryApi.off('pointerUp', handleSecondGallery);
                secondGalleryApi.destroy();
            }
        };
    }, [firstGalleryApi, secondGalleryApi]);

    const firstGallery = galleryData.slice(0, 5);
    const secondGallery = galleryData.slice(5, 10);

    return (
        <div
            className={`w-full h-auto py-24 px-[8%] transition-colors duration-300 ${dark ? "bg-zinc-800" : "bg-white"
                } flex flex-col gap-20`}
            aria-label="Event Gallery Section"
        >
            <div className='w-full h-auto flex flex-col gap-3 items-center'>
                <h1 className={`text-4xl tracking-wide font-bold text-center uppercase transition-colors duration-300 ${dark ? "text-white" : "text-zinc-900"
                    }`}>
                    Event Highlights
                </h1>
                <p className={`transition-colors duration-300 ${dark ? "text-zinc-300" : "text-zinc-600"
                    }`}>
                    Explore captivating moments from our past webinars.
                </p>
            </div>
            <div className='w-full h-auto flex flex-col gap-8'>
                <div className='w-full overflow-x-hidden' ref={firstGalleryRef}>
                    <div className='flex'>
                        {firstGallery.map((gallery) => (
                            <GalleryItem
                                key={gallery.id}
                                gallery={gallery}
                                hoverGallery={hoverGallery}
                                setHoverGallery={setHoverGallery}
                                dark={dark}
                                aria-label={`Gallery Item: ${gallery.title}`}
                            />
                        ))}
                    </div>
                </div>
                <div dir='rtl'>
                    <div className='w-full overflow-x-hidden' ref={secondGalleryRef}>
                        <div className='flex'>
                            {secondGallery.map((gallery) => (
                                <GalleryItem
                                    key={gallery.id}
                                    gallery={gallery}
                                    hoverGallery={hoverGallery}
                                    setHoverGallery={setHoverGallery}
                                    dark={dark}
                                    aria-label={`Gallery Item: ${gallery.title}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Gallery.propTypes = {
    dark: PropTypes.bool.isRequired
}

export default Gallery;
