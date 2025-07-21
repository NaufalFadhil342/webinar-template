import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const AdditionalLinks = ({ dark, to, name, toTopScreen }) => {
    return (
        <li className={`w-auto h-8 flex items-center duration-150 transition-colors ${dark ? 'text-zinc-300 hover:text-secondary' : 'text-zinc-600 hover:text-white'}`}>
            <Link to={`/${to}`} onClick={toTopScreen}>{name}</Link>
        </li>
    )
};

AdditionalLinks.propTypes = {
    dark: PropTypes.bool,
    to: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    toTopScreen: PropTypes.func.isRequired
}

export default AdditionalLinks;