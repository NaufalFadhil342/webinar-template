import { NavLink } from 'react-router';
import PropTypes from 'prop-types';

const NavLinkItem = ({ to, onClick, children, ariaLabel }) => {
    return (
        <NavLink
            to={to}
            onClick={onClick}
            aria-label={ariaLabel}
            className={({ isActive }) => isActive ? 'w-auto h-8 text-white font-semibold text-lg flex items-center gap-1' : 'w-auto h-8 text-lg text-zinc-300 hover:text-white font-semibold duration-150 transition-all flex items-center gap-1'}
        >
            {children}
        </NavLink>
    );
};

NavLinkItem.propTypes = {
    to: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
    ariaLabel: PropTypes.string.isRequired,
};

export default NavLinkItem;
