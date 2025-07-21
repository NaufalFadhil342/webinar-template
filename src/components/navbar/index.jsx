import { useState, useRef, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import LightNavbar from "./lightNavbar";
import DarkNavbar from "./darkNavbar";
import PropTypes from 'prop-types';

const Navbar = ({ dark, isScrolled, toggleDark }) => {
    const [navbarState, setNavbarState] = useState(null);
    const [markAsRead, setMarkAsRead] = useState(false);
    const [navbarMenuIsOpen, setNavbarMenuIsOpen] = useState(false);
    const navbarRef = useRef(null);

    const location = useLocation();

    const homePage = location.pathname === "/";

    const toggleDropdown = useCallback((currId) => {
        setNavbarState(prev => prev === currId ? null : currId);
    }, []);

    const closeAllDropdowns = useCallback(() => {
        setNavbarState(null);
    }, []);

    const handleOutsideClick = useCallback((event) => {
        if (navbarRef.current && !navbarRef.current.contains(event.target)) {
            closeAllDropdowns();
        }
    }, [closeAllDropdowns]);

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);

        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [handleOutsideClick]);

    return (
        <section role="navigation" aria-label="Main Navigation">
            {dark ? <DarkNavbar
                navbarRef={navbarRef}
                navbarState={navbarState}
                markAsRead={markAsRead}
                setMarkAsRead={setMarkAsRead}
                toggleDropdown={toggleDropdown}
                closeAllDropdowns={closeAllDropdowns}
                isScrolled={isScrolled}
                dark={dark}
                toggleDark={toggleDark}
                navbarMenu={navbarMenuIsOpen}
                setNavbarMenu={setNavbarMenuIsOpen}
                homePage={homePage}
            /> :
                <LightNavbar
                    navbarRef={navbarRef}
                    navbarState={navbarState}
                    markAsRead={markAsRead}
                    setMarkAsRead={setMarkAsRead}
                    toggleDropdown={toggleDropdown}
                    closeAllDropdowns={closeAllDropdowns}
                    dark={dark}
                    isScrolled={isScrolled}
                    toggleDark={toggleDark}
                    navbarMenu={navbarMenuIsOpen}
                    setNavbarMenu={setNavbarMenuIsOpen}
                    homePage={homePage}
                />}
        </section>
    );
}

// Add prop validation
Navbar.propTypes = {
    dark: PropTypes.bool.isRequired,
    isScrolled: PropTypes.bool.isRequired,
    toggleDark: PropTypes.func.isRequired,
};

export default Navbar;
