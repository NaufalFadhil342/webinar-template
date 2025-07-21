import liveRecording from '../../assets/images/live-recording.jpg';
import darkLiveRecording from '../../assets/images/dark-live-recording.jpg';
import { motion } from 'motion/react';
import PropTypes from 'prop-types';

const Highlight = ({ dark }) => {

    return (
        <section
            className={`w-full h-auto py-24 px-[8%] transition-colors duration-300 ${dark ? 'bg-zinc-800' : 'bg-white'
                }`}
            aria-label="Webinar Highlight Section"
        >
            <div className="w-full h-auto flex flex-col lg:flex-row gap-8 lg:justify-between items-center">
                <motion.h1
                    className={`flex-50 w-full font-bold text-4xl tracking-wide leading-tight uppercase transition-colors duration-300 ${dark ? 'text-white' : 'text-zinc-900'
                        }`}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                    aria-label="Discover the Ultimate Webinar Experience"
                >
                    Discover the Ultimate Webinar Experience: Engage, Analyze, and Succeed Effortlessly
                </motion.h1>
                <motion.p
                    className={`flex-50 w-full transition-colors duration-300 ${dark ? 'text-zinc-300' : 'text-zinc-600'
                        }`}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                    aria-label="Webinar Platform Description"
                >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, corporis architecto Neque consequuntur ipsa dolore ab dolorem mollitia facere, porro rem distinctio qui sit eveniet ea, ullam iure harum ipsam, minima sed voluptatum placeat quia cumque corporis error.
                </motion.p>
            </div>
            <motion.div
                className="max-w-5xl h-full mt-8 mx-auto overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, scale: 0, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                aria-label="Webinar Demonstration Image"
            >
                {dark ? (
                    <img
                        className="w-full h-full object-cover"
                        src={darkLiveRecording}
                        alt="Dark theme webinar demonstration"
                    />
                ) : (
                    <img
                        className="w-full h-full object-cover"
                        src={liveRecording}
                        alt="Light theme webinar demonstration"
                    />
                )}
            </motion.div>
        </section>
    )
}

Highlight.propTypes = {
    dark: PropTypes.bool.isRequired,
}

export default Highlight;
