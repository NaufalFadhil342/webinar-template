import { motion } from "motion/react";
import PropTypes from 'prop-types';

const Loading = () => {
    return (
        <section>
            <div className="size-16 relative">
                <motion.div
                    className={`size-6 rounded-[100%] bg-gradient-to-br from-secondary to-primary absolute -top-3 left-5`}
                    initial={{ scale: 1, x: 0, y: 0 }}
                    whileInView={{ scale: 1.3, x: 33, y: 33 }}
                    transition={{ duration: 1, repeat: Infinity }}
                />
                <motion.div
                    className={`size-6 rounded-[100%] bg-gradient-to-br from-secondary to-primary absolute top-5 -right-3 -translate-y-[1px]`}
                    initial={{ scale: 1, x: 0, y: 0 }}
                    whileInView={{ scale: 1.3, x: -33, y: 33 }}
                    transition={{ duration: 1, repeat: Infinity }}
                />
                <motion.div
                    className={`size-6 rounded-[100%] bg-gradient-to-br from-secondary to-primary absolute -bottom-3 right-5 translate-x-[2px]`}
                    initial={{ scale: 1, x: 0, y: 0 }}
                    whileInView={{ scale: 1.3, x: -33, y: -33 }}
                    transition={{ duration: 1, repeat: Infinity }}
                />
                <motion.div
                    className={`size-6 rounded-[100%] bg-gradient-to-br from-secondary to-primary absolute bottom-5 translate-y-[1px] -left-3 translate-x-[2px]`}
                    initial={{ scale: 1, x: 0, y: 0 }}
                    whileInView={{ scale: 1.3, x: 33, y: -33 }}
                    transition={{ duration: 1, repeat: Infinity }}
                />
            </div>
        </section>
    )
};

Loading.propTypes = {
    dark: PropTypes.bool
}

export default Loading;