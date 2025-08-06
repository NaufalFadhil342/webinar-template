import Loading from '../../UI/loading';
import PropTypes from 'prop-types';
import { AnimatePresence, motion } from 'motion/react';

const LoadingOverlay = ({ dark, isLoading }) => {

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.section
                    className={`fixed inset-0 z-50 flex flex-col items-center justify-center ${dark ? 'bg-zinc-900/90' : 'bg-white/90'
                        } backdrop-blur-sm`}
                    aria-label='Loading overlay'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'circInOut' }}
                >
                    <Loading dark={dark} />
                </motion.section>
            )}
        </AnimatePresence>
    )
}

LoadingOverlay.propTypes = {
    dark: PropTypes.bool,
    isLoading: PropTypes.bool.isRequired
}

export default LoadingOverlay;