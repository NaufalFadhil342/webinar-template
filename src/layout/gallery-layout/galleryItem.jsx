import { motion, AnimatePresence } from 'motion/react';
import PropTypes from 'prop-types';

const GalleryItem = ({ gallery, setHoverGallery, hoverGallery, dark }) => {
    return (
        <div className='w-full h-60 flex-80 xm:flex-60 lg:flex-30 overflow-hidden ml-8 rounded-xl' onMouseEnter={() => setHoverGallery(gallery.id)} onMouseLeave={() => setHoverGallery(null)} aria-label={gallery.label}>
            <div className='w-full h-full bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${gallery.image})` }}>
                <AnimatePresence>
                    {hoverGallery === gallery.id && (
                        <motion.div
                            className={`w-full h-full ${dark ? "bg-secondary/80" : "bg-primary/80"} flex items-center justify-center`}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h3 className='text-white text-xl font-medium'>{gallery.label}</h3>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

GalleryItem.propTypes = {
    gallery: PropTypes.object.isRequired,
    setHoverGallery: PropTypes.func.isRequired,
    hoverGallery: PropTypes.any,
    dark: PropTypes.bool.isRequired
}

export default GalleryItem;