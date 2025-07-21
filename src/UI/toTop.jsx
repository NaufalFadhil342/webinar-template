import { useEffect, useState } from 'react';
import { Link, animateScroll as scroll } from 'react-scroll';
import Icon from '@mdi/react';
import { mdiMenuUp } from '@mdi/js';
import PropTypes from 'prop-types';

const ToTop = ({ dark }) => {
    const [showThreshold, setShowThreshold] = useState(false);

    const handleScroll = () => {
        const threshold = window.innerHeight * 0.50;
        const isToTopPosition = window.scrollY > threshold;

        setShowThreshold(isToTopPosition);
    };

    const scrollToTop = () => {
        scroll.scrollToTop();
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, []);

    return (
        <>
            {showThreshold && <Link to='' className={`w-10 h-10 flex items-center justify-center rounded-[100%] shadow-wide text-white ${dark ? 'bg-secondary hover:bg-white hover:text-secondary' : 'bg-primary hover:bg-white hover:text-primary'} transition-all duration-150 fixed bottom-10 right-10`} onClick={scrollToTop} smooth>
                <Icon path={mdiMenuUp} size={1.5} />
            </Link>}
        </>
    )
};

ToTop.propTypes = {
    dark: PropTypes.bool.isRequired,
    top: PropTypes.string,
};

export default ToTop;