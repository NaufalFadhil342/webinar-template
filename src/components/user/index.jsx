import { AnimatePresence, motion } from 'motion/react';
import { Link } from 'react-router';
import ToggleMode from '../../UI/toggleMode';
import PropTypes from 'prop-types';
import { useAuth } from '../../hooks/useAuth';

const User = ({ navbarState, dark, toggleDark, closeAllDropdowns }) => {
    const { user, isAuthenticated, logout } = useAuth();

    const handleLogout = () => {
        logout();
        closeAllDropdowns();
    };

    // Better display name logic
    const getDisplayName = () => {
        if (!user) return 'User';

        return (
            (user.usernameOrEmail ? (user.usernameOrEmail.includes('@') ? user.usernameOrEmail.split('@')[0] : user.usernameOrEmail) : '') || 'User'
        )
    };

    return (
        <AnimatePresence>
            {navbarState === 'userAccount' && (
                <motion.div
                    className={`p-4 w-40 h-0 absolute z-[2] top-16 right-0 flex flex-col gap-2 shadow-md ${dark ? 'bg-zinc-800 shadow-zinc-500/25' : 'bg-white shadow-none'} rounded overflow-hidden`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {isAuthenticated ? (
                        <p className={`${dark ? 'text-zinc-300' : 'text-zinc-600'} font-semibold w-full flex flex-wrap`}>
                            Hello, {getDisplayName()}
                        </p>
                    ) : (
                        <Link to='/register' onClick={() => window.scrollTo(0, 0)} className={dark ? 'text-zinc-300 hover:text-secondary font-semibold' : 'text-zinc-600 hover:text-primary font-semibold'}>
                            Log In
                        </Link>
                    )}
                    <Link
                        to='/wishlist'
                        onClick={() => window.scrollTo(0, 0)}
                        className={dark ? 'text-zinc-300 hover:text-secondary font-semibold' : 'text-zinc-600 hover:text-primary font-semibold'}
                    >
                        Wishlist
                    </Link>
                    <ToggleMode className={dark ? 'text-zinc-300 hover:text-secondary font-semibold' : 'text-zinc-600 hover:text-primary font-semibold'} dark={dark} toggleDark={toggleDark} closeAllDropdowns={closeAllDropdowns} />
                    {isAuthenticated ? (
                        <button
                            onClick={handleLogout}
                            className={`w-full text-left ${dark ? 'text-zinc-300 hover:text-red-400 font-semibold' : 'text-zinc-600 hover:text-red-600 font-semibold'}`}
                        >
                            Logout
                        </button>
                    ) : null}
                </motion.div>
            )
            }
        </AnimatePresence>
    )
};

User.propTypes = {
    navbarState: PropTypes.any,
    dark: PropTypes.bool,
    toggleDark: PropTypes.func.isRequired,
    closeAllDropdowns: PropTypes.func.isRequired
};

export default User;