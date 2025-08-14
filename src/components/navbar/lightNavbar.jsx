import { NavLink, useNavigate } from "react-router";
import Icon from '@mdi/react';
import { AnimatePresence, motion } from 'motion/react';
import { mdiBellOutline, mdiMenu, mdiMenuDown, mdiEqualizer, mdiAccountCircle, mdiMagnify } from '@mdi/js';
import Notification from "../../UI/notification";
import Search from "../../UI/search";
import NavbarMenu from "./navbarMenu";
import PropTypes from 'prop-types';
import User from "../user";
import { useSearch } from "../../hooks/useSearch";

const LightNavbar = ({ isScrolled, navbarRef, toggleDropdown, navbarState, closeAllDropdowns, markAsRead, setMarkAsRead, dark, toggleDark, navbarMenu, setNavbarMenu, homePage }) => {
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
        <section className={`w-full h-auto py-5 px-[8%] ${isScrolled ? 'fixed -top-1 left-0 z-[5] bg-white shadow-bottom' : `absolute z-10`}`}>
            <nav className="w-full h-auto grid grid-cols-2 lg:grid-cols-[0.75fr,3fr,0.75fr] items-center gap-8" ref={navbarRef}>
                <div className="w-full h-auto">
                    <h1 className={`text-3xl font-bold ${isScrolled ? 'bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent' : `${homePage ? 'text-white' : 'bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'}`}`}>MitNar.</h1>
                </div>
                <ul className="w-full h-auto hidden lg:flex items-center justify-center gap-6">
                    <li className="relative">
                        <button onClick={() => toggleDropdown('home')} className={`bg-transparent w-full h-fit flex justify-center items-center duration-150 transition-all font-semibold ${isScrolled ? 'text-zinc-600 hover:text-primary focus:text-primary' : `${homePage ? 'text-zinc-300 hover:text-white focus:text-white' : 'text-zinc-600 hover:text-primary focus:text-primary'}`}`} aria-haspopup="true" aria-expanded={navbarState === 'home'}>
                            <>Home</>
                            <Icon path={mdiMenuDown} size={0.85} />
                        </button>
                        <AnimatePresence>
                            {navbarState === 'home' && <motion.ul
                                className={`absolute top-16 w-32 h-0 py-4 px-4 rounded bg-transparent shadow-md shadow-zinc-500/25 flex flex-col items-start overflow-y-hidden ${dark ? 'lg:bg-zinc-900' : 'lg:bg-white'}`}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <li>
                                    <NavLink to='/' onClick={() => handleDefault('/')} className={({ isActive }) => isActive ? `w-full h-8 flex items-center gap-1 font-semibold ${dark ? 'text-white' : 'text-primary'}` : `w-full h-8 font-semibold ${dark ? 'text-zinc-300 hover:text-white' : 'text-zinc-600 hover:text-primary'}  duration-150 transition-all flex items-center gap-1`} aria-label="Home 1">
                                        Home 1
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/home2' onClick={() => handleDefault('/home2')} className={({ isActive }) => isActive ? `w-full h-8 flex items-center gap-1 font-semibold ${dark ? 'text-white' : 'text-primary'}` : `w-full h-8 flex items-center font-semibold ${dark ? 'text-zinc-300 hover:text-white' : 'text-zinc-600 hover:text-primary'} duration-150 transition-all`} aria-label="Home 2">Home 2</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/home3' onClick={() => handleDefault('/home3')} className={({ isActive }) => isActive ? `w-full h-8 flex items-center gap-1 font-semibold ${dark ? 'text-white' : 'text-primary'}` : `w-full h-8 flex items-center font-semibold ${dark ? 'text-zinc-300 hover:text-white' : 'text-zinc-600 hover:text-primary'} duration-150 transition-all`} aria-label="Home 3">Home 3</NavLink>
                                </li>
                            </motion.ul>}
                        </AnimatePresence>
                    </li>
                    <li className="relative">
                        <button onClick={() => toggleDropdown('sessions')} className={`bg-transparent w-full h-fit flex justify-center items-center duration-150 transition-all font-semibold ${isScrolled ? 'text-zinc-600 hover:text-primary focus:text-primary' : `${homePage ? 'text-zinc-300 hover:text-white focus:text-white' : 'text-zinc-600 hover:text-primary focus:text-primary'}`}`} aria-haspopup="true" aria-expanded={navbarState === 'sessions'}>
                            <>Sessions</>
                            <Icon path={mdiMenuDown} size={0.85} />
                        </button>
                        <AnimatePresence>
                            {navbarState === 'sessions' && <motion.ul
                                className={`absolute top-16 w-max h-0 py-4 px-4 rounded bg-transparent shadow-md shadow-zinc-500/25 flex flex-col items-start overflow-y-hidden ${dark ? 'lg:bg-zinc-900' : 'lg:bg-white'}`}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <li>
                                    <NavLink to='/live' onClick={() => handleDefault('/live')} className={({ isActive }) => isActive ? `w-full h-8 flex items-center gap-1 font-semibold ${dark ? 'text-white' : 'text-primary'}` : `w-full h-8 font-semibold ${dark ? 'text-zinc-300 hover:text-white' : 'text-zinc-600 hover:text-primary'}  duration-150 transition-all flex items-center gap-1`} aria-label="Webinars Now">
                                        <>Webinars Now</>
                                        <Icon path={mdiEqualizer} size={0.85} />
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/events' onClick={() => handleDefault('/events')} className={({ isActive }) => isActive ? `w-full h-8 flex items-center gap-1 font-semibold ${dark ? 'text-white' : 'text-primary'}` : `w-full h-8 flex items-center font-semibold ${dark ? 'text-zinc-300 hover:text-white' : 'text-zinc-600 hover:text-primary'} duration-150 transition-all`} aria-label="Events">Upcoming Events</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/recorded' onClick={() => handleDefault('/recorded')} className={({ isActive }) => isActive ? `w-full h-8 flex items-center gap-1 font-semibold ${dark ? 'text-white' : 'text-primary'}` : `w-full h-8 flex items-center font-semibold ${dark ? 'text-zinc-300 hover:text-white' : 'text-zinc-600 hover:text-primary'} duration-150 transition-all`} aria-label="Recorded">Recorded</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/speakers' onClick={() => handleDefault('/speakers')} className={({ isActive }) => isActive ? `w-full h-8 flex items-center gap-1 font-semibold ${dark ? 'text-white' : 'text-primary'}` : `w-full h-8 flex items-center ${dark ? 'text-zinc-300 hover:text-white' : 'text-zinc-600 hover:text-primary'} font-semibold duration-150 transition-all`} aria-label="Speakers">
                                        Speakers
                                    </NavLink>
                                </li>
                            </motion.ul>}
                        </AnimatePresence>
                    </li>
                    <li>
                        <NavLink to='/aboutus' onClick={() => handleDefault('/aboutus')} id="navlink" className={({ isActive }) => isActive ? `${isScrolled ? 'text-primary font-semibold' : `font-semibold ${homePage ? 'text-white' : 'text-primary'}`}` : `duration-150 transition-all ${isScrolled ? 'text-zinc-600 hover:text-primary' : `${homePage ? 'text-zinc-300 hover:text-white' : 'text-zinc-600 hover:text-primary'}`} font-semibold`} aria-label="About Us">About Us</NavLink>
                    </li>
                    <li className="relative">
                        <button className={`bg-transparent w-full h-fit flex justify-center items-center duration-150 transition-all font-semibold ${isScrolled ? 'text-zinc-600 hover:text-primary focus:text-primary' : `${homePage ? 'text-zinc-300 hover:text-white focus:text-white' : 'text-zinc-600 hover:text-primary focus:text-primary'}`}`} onClick={() => toggleDropdown('resources')} aria-haspopup="true" aria-expanded={navbarState === 'resources'}>
                            <>Resources</>
                            <Icon path={mdiMenuDown} size={0.85} />
                        </button>
                        <AnimatePresence>
                            {navbarState === 'resources' && <motion.ul
                                className={`absolute z-[3] top-16 w-40 h-0 py-4 px-4 rounded shadow-md shadow-zinc-500/25 flex flex-col items-start overflow-y-hidden ${dark ? 'bg-zinc-900' : 'bg-white'}`}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <li>
                                    <NavLink to='/faq' onClick={() => handleDefault('/faq')} className={({ isActive }) => isActive ? `w-full h-8 flex items-center font-semibold ${dark ? 'text-white' : 'text-primary'}` : `w-full h-8 items-center flex ${dark ? 'text-zinc-300 hover:text-white' : 'text-zinc-600 hover:text-primary'} font-semibold duration-150 transition-all`} aria-label="FAQ" >FAQ</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/support' onClick={() => handleDefault('/support')} className={({ isActive }) => isActive ? `w-full h-8 flex items-center font-semibold ${dark ? 'text-white' : 'text-primary'}` : `w-full h-8 items-center flex ${dark ? 'text-zinc-300 hover:text-white' : 'text-zinc-600 hover:text-primary'} font-semibold duration-150 transition-all`} aria-label="Support">Support</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/contactus' onClick={() => handleDefault('/contactus')} className={({ isActive }) => isActive ? `w-full h-8 flex items-center font-semibold ${dark ? 'text-white' : 'text-primary'}` : `w-full h-8 items-center flex ${dark ? 'text-zinc-300 hover:text-white' : 'text-zinc-600 hover:text-primary'} font-semibold duration-150 transition-all`} aria-label="Contact Us">Contact Us</NavLink>
                                </li>
                            </motion.ul>}
                        </AnimatePresence>
                    </li>
                </ul>
                <NavbarMenu
                    dark={dark}
                    navbarRef={navbarRef}
                    closeAllDropdowns={closeAllDropdowns}
                    navbarState={navbarState}
                    toggleDropdown={toggleDropdown}
                    isScrolled={isScrolled}
                    navbarMenu={navbarMenu}
                    closeNavbarMenu={() => setNavbarMenu(false)}
                />
                <div className="w-full h-auto flex items-center justify-end gap-3 relative">
                    <button className='group transition-all duration-150 relative' onClick={() => toggleDropdown('open')}>
                        <Icon path={mdiBellOutline} size={1} className={isScrolled ? 'text-zinc-600 hover:text-primary' : `${homePage ? 'text-white' : 'text-zinc-600 hover:text-primary'}`} />
                        <span className={`absolute top-0 right-0 z-[3] w-1 h-1 rounded-full ${markAsRead ? 'hidden' : 'block'}  ${isScrolled ? 'bg-zinc-700 group-hover:bg-primary' : `${homePage ? 'bg-white' : 'bg-zinc-700 group-hover:bg-primary'}`}`}></span>
                    </button>

                    <div className={`hover:cursor-pointer ${isScrolled ? 'text-zinc-600' : `${homePage ? 'text-white' : 'text-zinc-600'}`}`} onClick={() => toggleDropdown('userAccount')}>
                        <Icon path={mdiAccountCircle} size={1.7} />
                    </div>

                    <button className={`size-12 rounded-full hover:cursor-pointer fixed top-1/2 -translate-y-10 right-[5%] ${isScrolled ? 'bg-primary hover:bg-darkPrimary text-white' : `${homePage ? 'bg-white hover:bg-zinc-300 text-zinc-600' : 'bg-primary hover:bg-darkPrimary text-white'}`} flex items-center justify-center lg:hidden`} onClick={() => setNavbarMenu(true)}>
                        <Icon path={mdiMenu} size={1.25} />
                    </button>

                    <button onClick={() => toggleDropdown('search')}>
                        <Icon path={mdiMagnify} size={1.25} className={isScrolled ? "text-zinc-600" : `${homePage ? 'text-white' : 'text-zinc-600'}`} />
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
                                    placeholder='What is your looking for?'
                                    className={`w-full h-auto py-6 px-[8%] shadow-bottom ${dark ? 'bg-zinc-900' : 'bg-white'}`}
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

LightNavbar.propTypes = {
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
    homePage: PropTypes.bool.isRequired
};

export default LightNavbar;
