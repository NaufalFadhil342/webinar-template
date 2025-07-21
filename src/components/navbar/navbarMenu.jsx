import { AnimatePresence, motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import NavLinkItem from './NavLinkItem';
import Dropdown from './Dropdown';
import PropTypes from 'prop-types';
import { mdiEqualizer } from '@mdi/js';
import Icon from '@mdi/react';

const NavbarMenu = ({ toggleDropdown, navbarState, closeAllDropdowns, navbarMenu, closeNavbarMenu }) => {
    const navigate = useNavigate();


    const handleNavbarMenu = (to) => {
        window.scrollTo({ top: 0 });
        navigate(to)
        closeAllDropdowns();
        closeNavbarMenu();
    }

    const closeNavbarModal = () => {
        closeNavbarMenu();
        closeAllDropdowns();
    }

    const handleContentClick = (event) => {
        event.stopPropagation()
    }

    return (
        <AnimatePresence>
            {navbarMenu && (
                <motion.section
                    key='navbar-menu'
                    className='w-full h-0 block lg:hidden p-[8%] fixed z-10 top-0 left-0 bg-zinc-900/90 overflow-y-hidden'
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: '100vh' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5 }}
                    onClick={closeNavbarModal}
                >
                    <ul
                        className="w-full h-auto flex flex-col items-center gap-4"
                        role="menu"
                        onClick={handleContentClick}
                    >
                        <li role="none">
                            <NavLinkItem to="/" onClick={() => handleNavbarMenu('/')} ariaLabel='home'>
                                Home
                            </NavLinkItem>
                        </li>
                        <Dropdown isOpen={navbarState === 'sessions'} toggle={() => toggleDropdown('sessions')}>
                            <>Sessions</>
                            <NavLinkItem to="/live" onClick={() => handleNavbarMenu('/live')} ariaLabel='live'>
                                <>Webinars Now</>
                                <Icon path={mdiEqualizer} size={1} />
                            </NavLinkItem>
                            <NavLinkItem to="/events" onClick={() => handleNavbarMenu('/events')} ariaLabel='events'>
                                Upcoming Events
                            </NavLinkItem>
                            <NavLinkItem to="/recorded" onClick={() => handleNavbarMenu('/recorded')} ariaLabel='recorded'>
                                Recorded
                            </NavLinkItem>
                            <NavLinkItem to="/speakers" onClick={() => handleNavbarMenu('/speakers')} ariaLabel='speakers'>
                                Speakers
                            </NavLinkItem>
                        </Dropdown>
                        <li role="none">
                            <NavLinkItem to="/aboutus" onClick={() => handleNavbarMenu('/aboutus')} ariaLabel='aboutus'>
                                About Us
                            </NavLinkItem>
                        </li>
                        <Dropdown isOpen={navbarState === 'resources'} toggle={() => toggleDropdown('resources')}>
                            <>Resources</>
                            <NavLinkItem to='/faq' onClick={() => handleNavbarMenu('/faq')} ariaLabel='FAQ'>
                                FAQ
                            </NavLinkItem>
                            <NavLinkItem to="/support" onClick={() => handleNavbarMenu('/support')} ariaLabel='support'>
                                Support
                            </NavLinkItem>
                            <NavLinkItem to="/contactus" onClick={() => handleNavbarMenu('/contactus')} ariaLabel='contactus'>
                                Contact Us
                            </NavLinkItem>
                        </Dropdown>
                    </ul>
                </motion.section>
            )}
        </AnimatePresence>
    );
};

NavbarMenu.propTypes = {
    toggleDropdown: PropTypes.func.isRequired,
    navbarState: PropTypes.any,
    closeAllDropdowns: PropTypes.func.isRequired,
    navbarMenu: PropTypes.bool.isRequired,
    closeNavbarMenu: PropTypes.func.isRequired,
};

export default NavbarMenu;
