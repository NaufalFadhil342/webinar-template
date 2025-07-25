import { Link } from "react-router";
import PropTypes from 'prop-types'

const TermPolice = ({ toTopScreen, dark }) => {
    return (
        <ul className='flex flex-col xm:flex-row items-center gap-4'>
            <li className="w-auto">
                <Link onClick={toTopScreen} className={`underline ${dark ? 'text-white hover:text-secondary' : 'text-zinc-600 hover:text-white'} hover:cursor-pointer duration-150 transition-colors`}>Privacy Policy</Link>
            </li>
            <li className="w-auto">
                <Link onClick={toTopScreen} className={`underline ${dark ? 'text-white hover:text-secondary' : 'text-zinc-600 hover:text-white'} hover:cursor-pointer duration-150 transition-colors`}>Terms of Service</Link>
            </li>
            <li className="w-auto">
                <Link onClick={toTopScreen} className={`underline ${dark ? 'text-white hover:text-secondary' : 'text-zinc-600 hover:text-white'} hover:cursor-pointer duration-150 transition-colors`}>Cookies Settings</Link>
            </li>
        </ul>
    )
};

TermPolice.propTypes = {
    toTopScreen: PropTypes.func.isRequired,
    dark: PropTypes.bool.isRequired
}

export default TermPolice;