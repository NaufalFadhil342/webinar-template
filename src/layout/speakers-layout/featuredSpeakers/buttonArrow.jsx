import Icon from "@mdi/react"
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import PropTypes from 'prop-types';

const ButtonArrow = ({ prevButton, nextButton, prevBtnDisable, nextBtnDisable, dark }) => {
    return (
        <>
            <button
                className={`size-10 rounded-full bg-white text-zinc-600 ${dark ? 'hover:bg-secondary' : 'hover:bg-primary'} shadow-wide flex items-center justify-center hover:text-white disabled:text-zinc-600/50 hover:disabled:bg-white disabled:shadow-none transition-all duration-150`}
                onClick={prevButton}
                disabled={prevBtnDisable}
                aria-label='previous speaker'
            >
                <Icon path={mdiChevronLeft} size={1.5} />
            </button>
            <button
                className={`size-10 rounded-full bg-white text-zinc-600 ${dark ? 'hover:bg-secondary' : 'hover:bg-primary'} shadow-wide flex items-center justify-center hover:text-white disabled:text-zinc-600/50 hover:disabled:bg-white disabled:shadow-none transition-all duration-150`}
                onClick={nextButton}
                disabled={nextBtnDisable}
                aria-label='next speaker'
            >
                <Icon path={mdiChevronRight} size={1.5} />
            </button>
        </>
    )
};

ButtonArrow.propTypes = {
    prevButton: PropTypes.func.isRequired,
    nextButton: PropTypes.func.isRequired,
    prevBtnDisable: PropTypes.bool,
    nextBtnDisable: PropTypes.bool,
    dark: PropTypes.bool
}

export default ButtonArrow