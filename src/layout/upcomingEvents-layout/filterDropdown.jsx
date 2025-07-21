import { useRef, useCallback, useEffect } from "react";
import Icon from "@mdi/react";
import { mdiChevronDown } from '@mdi/js';
import PropTypes from 'prop-types';

const FilterDropdown = ({
    options,
    selected,
    onChange,
    label,
    dark,
    isOpen,
    onToggle,
    onClose,
    placeholder,
    className }) => {
    const filterDropdownRef = useRef();

    const handleOutsideClick = useCallback((event) => {
        if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target)) {
            onClose();
        }
    }, [onClose]);

    const handleKeyDown = useCallback((event) => {
        if (event.key === 'Escape') {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, handleOutsideClick, handleKeyDown]);

    const handleOptionSelect = (option) => {
        onChange(option);
        onClose();
    };

    const handleAllSelection = () => {
        onChange('');
        onClose();
    };

    const getDisplayText = () => {
        if (selected) {
            return selected;
        }
        return placeholder || label;
    };

    const isOptionSelected = (option) => {
        return selected === option;
    };

    const isAllSelected = () => {
        return !selected || selected === '';
    };

    return (
        <div className="relative" ref={filterDropdownRef}>
            <button
                className={`flex items-center justify-between w-auto h-auto gap-2 px-4 py-2 rounded-md ${dark ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-white hover:bg-gray-100'} border ${dark ? 'border-zinc-700' : 'border-gray-200'}`}
                onClick={onToggle}
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                aria-label={`Filter by ${label}`}
            >
                <span className={dark ? 'text-zinc-300' : 'text-zinc-700'}>{getDisplayText()}</span>
                <Icon path={mdiChevronDown} size={0.85} className={dark ? 'text-zinc-400' : 'text-zinc-500'} />
            </button>
            {isOpen && (
                <div
                    className={`${className} ${dark ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-gray-200'}`}
                    role="listbox"
                    aria-label={`${label} options`}
                >
                    <ul className='w-full h-auto'>
                        <li
                            className={`px-4 py-2 cursor-pointer ${dark ? 'hover:bg-zinc-700' : 'hover:bg-gray-100'} ${isAllSelected() ? dark ? 'bg-zinc-700' : 'bg-gray-100' : ''}`}
                            onClick={handleAllSelection}
                            role="option"
                            aria-selected={isAllSelected()}
                        >
                            <span className={dark ? 'text-zinc-300' : 'text-zinc-700'}>All {label}</span>
                        </li>
                        {options.map((option, index) => (
                            <li
                                key={`${option}-${index}`}
                                className={`px-4 py-2 cursor-pointer ${dark ? 'hover:bg-zinc-700' : 'hover:bg-gray-100'} ${isOptionSelected(option)
                                    ? dark
                                        ? 'bg-zinc-700 text-blue-300'
                                        : 'bg-blue-50 text-blue-700'
                                    : ''
                                    }`}
                                onClick={() => handleOptionSelect(option)}
                                role="option"
                                aria-selected={isOptionSelected(option)}
                            >
                                <span className={dark ? 'text-zinc-300' : 'text-zinc-700'}>{option}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

FilterDropdown.propTypes = {
    options: PropTypes.array,
    selected: PropTypes.string,
    onChange: PropTypes.func,
    label: PropTypes.string,
    dark: PropTypes.bool,
    onClear: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    className: PropTypes.string,
    placeholder: PropTypes.string
}

export default FilterDropdown;