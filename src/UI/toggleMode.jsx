import PropTypes from 'prop-types';
import { mdiWhiteBalanceSunny, mdiMoonWaningCrescent } from '@mdi/js';
import Icon from '@mdi/react';

const ToggleMode = ({ dark, toggleDark, closeAllDropdowns, className }) => {
    const handleToggle = () => {
        toggleDark();
        closeAllDropdowns();
    }

    return (
        <button onClick={handleToggle} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}>
            {
                dark ? (
                    <p className={`${className} flex gap-1 items-center`}>
                        <>Light</>
                        <Icon path={mdiWhiteBalanceSunny} size={0.75} />
                    </p>
                ) : (
                    <p className={`${className} flex gap-1 items-center`}>
                        <>Dark</>
                        <Icon path={mdiMoonWaningCrescent} size={0.75} />
                    </p>
                )
            }
        </button>
    )
}

ToggleMode.propTypes = {
    dark: PropTypes.bool.isRequired,
    toggleDark: PropTypes.func.isRequired,
    closeAllDropdowns: PropTypes.func.isRequired,
    className: PropTypes.string,
}

export default ToggleMode;
