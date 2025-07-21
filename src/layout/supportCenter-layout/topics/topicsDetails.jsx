import PropTypes from 'prop-types';
import { motion } from 'motion/react';

const TopicsDetails = ({ dark, topic }) => {
    return (
        <motion.div
            className="w-full xm:w-3/4 lg:w-full h-full mx-auto"
            initial={{ opacity: 0, scale: 0, originX: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
        >
            <div className="w-full h-60 overflow-hidden rounded-xl">
                <img className="w-full h-full object-cover" src={topic.image} alt='topics' />
            </div>
            <div className='py-4 w-full h-auto flex flex-col gap-4'>
                <h3 className={`text-xl font-semibold ${dark ? "text-white" : "text-zinc-900"} text-center`}>{topic.label}</h3>
                <p className={`text-center ${dark ? "text-zinc-300" : "text-zinc-700"}`}>{topic.text}</p>
            </div>
        </motion.div>
    )
};

TopicsDetails.propTypes = {
    dark: PropTypes.bool,
    topic: PropTypes.object
}

export default TopicsDetails;