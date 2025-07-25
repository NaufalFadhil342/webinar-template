import { NavLink, useNavigate } from "react-router";
import Icon from '@mdi/react';
import { mdiMenuDown, mdiEqualizer, mdiBellOutline, mdiAccountCircle, mdiMenu, mdiMagnify } from '@mdi/js';
import { motion, AnimatePresence } from 'motion/react';
import Search from "../../UI/search";
import Notification from "../../UI/notification";
import NavbarMenu from "./navbarMenu";
import PropTypes from 'prop-types';
import User from "../user";
import { useSearch } from '../../hooks/useSearch';

const DarkNavbar = ({ isScrolled, navbarRef, toggleDropdown, navbarState, closeAllDropdowns, markAsRead, setMarkAsRead, dark, toggleDark, navbarMenu, setNavbarMenu, homePage }) => {
    const { searchInput, handleSearchChange, handleSearchKeydown, handleSearchSubmit } = useSearch({
        resultPath: '/result',
        preserveOtherParams: true,
        redirectOnSearch: true
    });

    const navigate = useNavigate();

    const handleDefault = (to) => {
        window.scrollTo({ top: 0 })
        navigate(to)
        closeAllDropdowns();
    }

    return (
        <section className={`w-full h-auto py-5 px-[8%] ${isScrolled ? 'fixed -top-1 left-0 z-[5] bg-zinc-800 shadow-bottom` ' : `absolute z-10`}`}>
            <nav className="w-full h-full grid grid-cols-2 lg:grid-cols-[0.75fr,3fr,0.75fr] gap-8" ref={navbarRef}>
                <div className="w-auto h-full">
                    <h1 className='text-3xl font-bold text-white'>MitNar.</h1>
                </div>
                <ul className="w-auto h-full hidden lg:flex items-center justify-center gap-6">
                    <li>
                        <NavLink to='/' id="navlink" onClick={() => handleDefault('/')} className={({ isActive }) => isActive ? 'w-full h-8 flex items-center text-white font-medium ' : '  text-zinc-300 hover:text-white font-semibold duration-150 transition-all'} aria-label="Home">Home</NavLink>
                    </li>
                    <li className="relative">
                        <button onClick={() => toggleDropdown('sessions')} className='bg-transparent w-fit h-fit flex justify-start items-center duration-150 transition-all text-zinc-300 hover:text-white font-semibold focus:text-white' aria-haspopup="true" aria-expanded={navbarState === 'sessions'}>
                            <>Sessions</>
                            <Icon path={mdiMenuDown} size={0.85} />
                        </button>
                        <AnimatePresence>
                            {navbarState === 'sessions' && <motion.ul
                                className="absolute z-[3] top-16 w-max h-0 py-4 px-4 rounded bg-zinc-800 shadow-md shadow-zinc-500/25 overflow-y-hidden"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <li>
                                    <NavLink to='/live' onClick={() => handleDefault('/live')} className={({ isActive }) => isActive ? 'w-full h-8 flex items-center gap-1 text-white font-medium  ' : '  w-full h-8 text-zinc-300 font-medium hover:text-white duration-150 transition-all flex items-center gap-1'} aria-label="Webinars Now">
                                        <>Webinars Now</>
                                        <Icon path={mdiEqualizer} size={0.85} />
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/events' onClick={() => handleDefault('/events')} className={({ isActive }) => isActive ? 'w-full h-8 flex items-center gap-1 text-white font-medium  ' : '  w-full h-8 flex items-center text-zinc-300 font-medium hover:text-white duration-150 transition-all'} aria-label="Events">Upcoming Events</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/recorded' onClick={() => handleDefault('/recorded')} className={({ isActive }) => isActive ? 'w-full h-8 flex items-center gap-1 text-white font-medium  ' : '  w-full h-8 flex items-center text-zinc-300 font-medium hover:text-white duration-150 transition-all'} aria-label="Recorded">Recorded</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/speakers' onClick={() => handleDefault('/speakers')} className={({ isActive }) => isActive ? 'w-full h-8 flex items-center gap-1 text-white font-medium  ' : '  w-full h-8 flex items-center text-zinc-300 font-medium hover:text-white duration-150 transition-all'} aria-label="Speakers">
                                        Speakers
                                    </NavLink>
                                </li>

                            </motion.ul>}
                        </AnimatePresence>
                    </li>
                    <li>
                        <NavLink to='/aboutus' id="navlink" onClick={() => handleDefault('/aboutus')} className={({ isActive }) => isActive ? 'w-full h-8 flex items-center text-white font-medium ' : 'duration-150 transition-all   text-zinc-300 hover:text-white font-semibold'} aria-label="About Us">About Us</NavLink>
                    </li>
                    <li className="relative">
                        <button className='bg-transparent w-fit h-fit flex justify-start items-center duration-150 transition-all   text-zinc-300 hover:text-white font-semibold focus:text-white' onClick={() => toggleDropdown('resources')} aria-haspopup="true" aria-expanded={navbarState === 'resources'}>
                            <>Resources</>
                            <Icon path={mdiMenuDown} size={0.85} />
                        </button>
                        <AnimatePresence>
                            {navbarState === 'resources' && <motion.ul
                                className='absolute z-[3] top-16 w-40 h-0 py-4 px-4 rounded bg-zinc-800 shadow-md shadow-zinc-500/25 overflow-y-hidden'
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <li>
                                    <NavLink to='/faq' onClick={() => handleDefault('/q&a')} className={({ isActive }) => isActive ? `w-full h-8 flex items-center text-white font-medium` : `w-full h-8 items-center flex text-zinc-300 hover:text-white font-medium duration-150 transition-all`} aria-label="FAQ" >FAQ</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/support' onClick={() => handleDefault('/support')} className={({ isActive }) => isActive ? `w-full h-8 flex items-center text-white font-medium` : `w-full h-8 items-center flex text-zinc-300 hover:text-white font-medium duration-150 transition-all`} aria-label="Support">Support</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/contactus' onClick={() => handleDefault('/contactus')} className={({ isActive }) => isActive ? `w-full h-8 flex items-center text-white font-medium  ` : ` w-full h-8 items-center flex text-zinc-300 hover:text-white font-medium duration-150 transition-all`} aria-label="Contact Us">Contact Us</NavLink>
                                </li>
                            </motion.ul>}
                        </AnimatePresence>
                    </li>
                </ul>
                <NavbarMenu
                    dark={dark}
                    closeAllDropdowns={closeAllDropdowns}
                    navbarState={navbarState}
                    toggleDropdown={toggleDropdown}
                    isScrolled={isScrolled}
                    navbarMenu={navbarMenu}
                    closeNavbarMenu={() => setNavbarMenu(false)}
                />
                <div className="w-auto h-full flex items-center justify-end gap-3 relative">
                    <button className='group transition-all duration-150 relative' onClick={() => toggleDropdown('open')}>
                        <Icon path={mdiBellOutline} size={1} className='text-white' />
                        <span className={`absolute top-0 right-0 z-[3] w-1 h-1 rounded-full bg-white ${markAsRead ? 'hidden' : 'block'}`}></span>
                    </button>

                    <div className='text-white hover:cursor-pointer' onClick={() => toggleDropdown('userAccount')}>
                        <Icon path={mdiAccountCircle} size={1.7} />
                    </div>

                    <button className={`size-12 rounded-full hover:cursor-pointer fixed top-1/2 -translate-y-10 right-[5%] ${isScrolled ? 'bg-secondary hover:bg-darkSecondary text-white' : `${homePage ? 'bg-white hover:bg-zinc-300 text-zinc-600' : 'bg-secondary hover:bg-darkSecondary text-white'}`} flex items-center justify-center lg:hidden`} onClick={() => setNavbarMenu(true)}>
                        <Icon path={mdiMenu} size={1} />
                    </button>

                    <button onClick={() => toggleDropdown('search')}>
                        <Icon path={mdiMagnify} size={1.25} className='text-white' />
                    </button>

                    <Notification navbarState={navbarState} markAsRead={markAsRead} setMarkAsRead={setMarkAsRead} dark={dark} />

                    <AnimatePresence>
                        {navbarState === 'search' &&
                            <motion.div
                                className="fixed top-0 left-0 z-10 w-full h-auto"
                                initial={{ opacity: 0, y: -50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -50 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Search
                                    dark={dark}
                                    closeAllDropdowns={closeAllDropdowns}
                                    placeholder='Search...'
                                    className={`w-full h-auto py-6 px-[8%] shadow-bottom ${dark ? 'bg-zinc-800' : 'bg-white'}`}
                                    searchIcon={true}
                                    onChange={handleSearchChange}
                                    onKeyDown={handleSearchKeydown}
                                    onSubmit={handleSearchSubmit}
                                    value={searchInput}
                                />
                            </motion.div>}
                    </AnimatePresence>

                    <User closeAllDropdowns={closeAllDropdowns} toggleDark={toggleDark} dark={dark} navbarState={navbarState} />
                </div>
            </nav>
        </section>
    )
}

DarkNavbar.propTypes = {
    isScrolled: PropTypes.bool.isRequired,
    navbarRef: PropTypes.object.isRequired,
    toggleDropdown: PropTypes.func.isRequired,
    navbarState: PropTypes.any,
    closeAllDropdowns: PropTypes.func.isRequired,
    markAsRead: PropTypes.bool.isRequired,
    setMarkAsRead: PropTypes.func.isRequired,
    dark: PropTypes.bool.isRequired,
    toggleDark: PropTypes.func.isRequired,
    navbarMenu: PropTypes.bool.isRequired,
    setNavbarMenu: PropTypes.func.isRequired,
    homePage: PropTypes.bool.isRequired,
};

export default DarkNavbar;
