import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiInstagram, mdiTwitter, mdiLinkedin } from '@mdi/js';
import { motion } from 'motion/react';

const TeamDetail = ({ image, job, description, name, dark }) => {
    const handleTeamDetail = () => {
        window.scrollTo({ top: 0 });
    }

    return (
        <motion.section
            className='w-full h-full flex flex-col overflow-y-hidden'
            initial={{ opacity: 0, scale: 0, originY: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
        >
            <div className='w-full h-[18em] overflow-hidden rounded-xl'>
                <img className='w-full h-full object-cover' src={image} alt={`Image of ${name}`} />
            </div>
            <div className={`w-full h-auto py-4 flex flex-col gap-3 border-b-2 ${dark ? "border-zinc-300" : "border-zinc-600"}`}>
                <div>
                    <h3 className={`text-xl font-medium ${dark ? "text-white" : "text-zinc-900"}`}>{name}</h3>
                    <span className={dark ? 'text-secondary' : 'text-primary'}>{job}</span>
                </div>
                <p className={`text-sm ${dark ? 'text-zinc-300' : 'text-zinc-600'}`}>{description}</p>
                <div className='flex items-center gap-2'>
                    <span onClick={handleTeamDetail} className={`duration-150 transition-colors ${dark ? "text-zinc-400 hover:text-secondary" : "text-zinc-400 hover:text-primary"}`}>
                        <Icon path={mdiInstagram} size={1.15} />
                    </span>
                    <span onClick={handleTeamDetail} className={`duration-150 transition-colors ${dark ? "text-zinc-400 hover:text-secondary" : "text-zinc-400 hover:text-primary"}`}>
                        <Icon path={mdiTwitter} size={1.15} />
                    </span>
                    <span onClick={handleTeamDetail} className={`duration-150 transition-colors ${dark ? "text-zinc-400 hover:text-secondary" : "text-zinc-400 hover:text-primary"}`}>
                        <Icon path={mdiLinkedin} size={1.15} />
                    </span>
                </div>
            </div>
        </motion.section>
    )
}

TeamDetail.propTypes = {
    dark: PropTypes.bool.isRequired,
    image: PropTypes.string.isRequired,
    job: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
}

export default TeamDetail;
