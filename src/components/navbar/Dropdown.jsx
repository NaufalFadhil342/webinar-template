import { AnimatePresence, motion } from 'motion/react';
import { mdiMenuDown } from '@mdi/js';
import Icon from '@mdi/react';
import PropTypes from 'prop-types';


const Dropdown = ({ isOpen, toggle, children }) => {
    return (
        <div className="relative">
            <button onClick={toggle} className='bg-transparent w-full h-fit text-lg flex justify-center items-center duration-150 transition-all text-zinc-300 hover:text-white font-semibold focus:text-white' aria-haspopup="true" aria-expanded={isOpen}>
                {children[0]} {/* First child is the button label */}

                <Icon path={mdiMenuDown} size={0.85} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        className='w-max h-0 py-4 px-4 rounded bg-transparent flex flex-col items-center overflow-y-hidden'
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        role="menu"
                    >
                        {children.slice(1)} {/* Remaining children are the dropdown items */}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};

Dropdown.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default Dropdown;
