import Icon from '@mdi/react';
import { mdiChevronRight } from '@mdi/js';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

const ContactInfo = ({ label, text, link, icon, dark, map, to, blank }) => {
    const handleContactInfo = () => {
        window.scrollTo({ top: 0 })
    }

    return (
        <li className="w-full h-auto flex flex-col gap-2 items-start">
            <Icon path={icon} size={2} className={`-ml-1 ${dark ? 'text-secondary' : 'text-primary'}`} />
            <h3 className={`text-xl font-medium ${dark ? "text-white" : "text-zinc-900"}`}>{label}</h3>
            <p className={dark ? "text-zinc-300" : "text-zinc-700"}>{text}</p>
            <Link to={to} target={blank} onClick={handleContactInfo} className={` flex items-end group ${dark ? "text-secondary hover:text-zinc-300" : "text-primary hover:text-zinc-700"} transition-all duration-150`}>
                {link}
                {map ? <Icon path={mdiChevronRight} size={1} className={dark ? "text-secondary group-hover:text-zinc-300" : "text-primary group-hover:text-zinc-700"} /> : null}
            </Link>
        </li>
    )
}

ContactInfo.propTypes = {
    label: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    link: PropTypes.string,
    icon: PropTypes.string.isRequired,
    dark: PropTypes.bool,
    map: PropTypes.bool,
    to: PropTypes.string.isRequired,
    blank: PropTypes.string
}

export default ContactInfo;