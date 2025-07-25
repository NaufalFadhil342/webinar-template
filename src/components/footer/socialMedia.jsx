import { Link } from "react-router";
import Icon from "@mdi/react";
import PropTypes from 'prop-types';

const SocialMedia = ({ dark, size, icon, toTopScreen }) => {
    return (
        <Link onClick={toTopScreen} className={`${dark ? 'text-zinc-300 hover:text-secondary' : 'text-zinc-600 hover:text-white'} duration-150 transition-colors`}>
            <Icon path={icon} size={size} />
        </Link>
    )
};

SocialMedia.propTypes = {
    dark: PropTypes.bool,
    size: PropTypes.number,
    icon: PropTypes.string,
    toTopScreen: PropTypes.func
}

export default SocialMedia;