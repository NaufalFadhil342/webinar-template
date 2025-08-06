import PropTypes from 'prop-types';
import { motion } from 'motion/react';
import { Link } from 'react-router';

const Header = ({ title, description, dark, ariaLabel, tagline = "", hasButton }) => {

    const HeaderButton = () => {
        return (
            <Link
                to='/'
                onClick={() => window.scrollTo(0, 0)}
                className={`w-auto h-auto p-4 rounded-lg outline-none text-white ${dark ? 'bg-secondary hover:bg-darkSecondary' : 'bg-primary hover:bg-darkPrimary'} transition-colors duration-150 ease-in-out`}
                aria-label='Linked to homepage'
            >
                Back to Homepage
            </Link>
        )
    }

    return (
        <motion.section
            className="w-full h-[50vh] px-[8%] flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            aria-label={ariaLabel}
            role="region"
        >
            <div className='w-full h-auto flex flex-col items-center justify-center gap-3 translate-y-[2rem]'>
                {tagline && (
                    <span
                        className={`italic text-[15px] text-center ${dark ? 'text-secondary' : 'text-primary'}`}
                        aria-hidden={!tagline}
                    >
                        {tagline}
                    </span>
                )}
                <h1 className={`text-[2.5em] tracking-wide leading-none font-bold ${dark ? 'text-white' : 'text-zinc-900'} text-center uppercase`}>{title}</h1>
                <p className={`w-full md:w-2/3 text-center ${dark ? 'text-zinc-300' : 'text-zinc-600'}`}>{description}</p>
                {hasButton && (
                    <div className='w-full h-auto flex justify-center mt-3'>
                        <HeaderButton />
                    </div>
                )}
            </div>
        </motion.section>
    )
};

Header.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    dark: PropTypes.bool.isRequired,
    top: PropTypes.string,
    ariaLabel: PropTypes.string.isRequired,
    tagline: PropTypes.string,
    hasButton: PropTypes.bool
};

export default Header;
