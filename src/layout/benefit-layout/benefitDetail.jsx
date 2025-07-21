import { motion } from "motion/react";
import PropTypes from 'prop-types';

const BenefitDetail = ({ item, dark }) => {
    return (
        <motion.article
            key={item.id}
            className={`w-auto sm:w-2/3 lg:w-auto h-full flex flex-col gap-4 border-b-2 ${dark ? 'border-secondary' : 'border-primary'}`}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
        >
            <div className="w-full h-[13rem] overflow-hidden rounded-xl">
                <img className="w-full h-full object-cover" src={item.image} alt="benefit" />
            </div>
            <div className='w-full h-auto flex flex-col gap-1 text-center mb-4'>
                <h3 className={`text-xl font-semibold ${dark ? 'text-white' : 'text-zinc-900'}`}>{item.title}</h3>
                <p className={`text-[15px] md:h-11 overflow-y-hidden ${dark ? 'text-zinc-300' : 'text-zinc-600'}`}>{item.description}</p>
            </div>
        </motion.article>
    )
}

BenefitDetail.propTypes = {
    item: PropTypes.object.isRequired,
    dark: PropTypes.bool.isRequired
}

export default BenefitDetail