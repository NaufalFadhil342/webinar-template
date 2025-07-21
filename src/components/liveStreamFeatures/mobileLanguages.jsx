import Icon from "@mdi/react";
import { mdiMenuDown } from '@mdi/js';
import PropTypes from 'prop-types';
import { useLanguageSelection } from "../../hooks/useLanguageSelection";

const MobileLanguages = ({
    showDropdownFilter,
    handleDropdownFilter,
    languagesRef,
    languages = [],
    onSelectionChange,
    disabled = false,
    dark,
    currentFilters,
    handleCloseFilter
}) => {
    const selectedLanguages = currentFilters?.languages || { selected: ['all'], isAllSelected: true, selectedCount: 1 };

    const {
        processedLanguages,
        handleLanguageToggle,
        isLanguageSelected,
        formatNumber,
        getDisplayText,
        totalAmount
    } = useLanguageSelection(languages, selectedLanguages, onSelectionChange)

    return (
        <section className="w-full h-auto flex flex-col items-center" ref={languagesRef}>
            <div className={`w-full h-auto flex justify-center bg-transparent px-3 py-2 ${dark
                ? 'hover:bg-secondary text-white'
                : 'hover:bg-primary text-zinc-600 hover:text-white'
                } ${selectedLanguages.selectedCount > 1 || !selectedLanguages.isAllSelected
                    ? 'text-white'
                    : `${dark ? 'text-white' : 'text-zinc-600 group-hover:text-white'}`
                } transition-all duration-150 ease-in-out`}
                onClick={() => {
                    if (!disabled) {
                        handleDropdownFilter('languages');
                    }
                }}
                onKeyDown={(e) => {
                    if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
                        e.preventDefault();
                        handleDropdownFilter('languages');
                    }
                }}
                tabIndex={disabled ? -1 : 0}
                role="button">
                <p>
                    {getDisplayText}
                </p>
                <Icon
                    path={mdiMenuDown}
                    size={1}
                    className={`ml-2 transition-transform duration-200 ${showDropdownFilter === 'languages' ? 'rotate-180' : ''
                        }`}
                />
            </div>

            {showDropdownFilter === 'languages' && !disabled && (
                <div className='w-full h-auto border-t border-gray-200'>
                    <ul
                        className='max-h-[35vh] overflow-y-auto'
                        role="listbox"
                        aria-label="Language selection options"
                    >
                        <li
                            className={`w-full flex items-center gap-2 p-3 cursor-pointer ${dark ? 'hover:bg-white/15 focus:bg-white/15' : 'hover:bg-primary/15'
                                } ${isLanguageSelected('all')
                                    ? `${dark ? 'bg-white/10 text-secondary' : 'bg-primary/10 text-primary'}`
                                    : `${dark ? 'text-zinc-300' : 'text-zinc-600'}`
                                }`}
                            role="option"
                            onClick={() => {
                                handleLanguageToggle('all')
                                handleCloseFilter()
                            }}
                            tabIndex={0}
                            aria-selected={isLanguageSelected('all')}
                        >
                            <input
                                type="checkbox"
                                className="w-4 h-4 pointer-events-none"
                                checked={selectedLanguages.isAllSelected}
                                onChange={() => { }}
                                tabIndex={-1}
                            />
                            <div className='flex-1 flex items-center justify-between'>
                                <span className={`text-sm font-semibold ${dark ? 'text-white' : 'text-zinc-900'
                                    }`}>
                                    All Languages
                                </span>
                                <span className={`${dark ? 'text-zinc-400' : 'text-zinc-500'
                                    } text-sm font-medium`}>
                                    ({formatNumber(totalAmount)})
                                </span>
                            </div>
                        </li>
                        {processedLanguages.map((language) => (
                            <li
                                key={language.code}
                                className={`w-full flex items-center gap-2 p-3 cursor-pointer ${dark ? 'hover:bg-white/15 focus:bg-white/15' : 'hover:bg-primary/15 focus:bg-primary/15'
                                    } ${isLanguageSelected(language.code)
                                        ? `${dark ? 'bg-white/10 text-secondary' : 'bg-primary/10 text-primary'}`
                                        : `${dark ? 'text-zinc-300' : 'text-zinc-600'}`
                                    }`}
                                role="option"
                                onClick={() => {
                                    handleLanguageToggle(language.code)
                                    handleCloseFilter()
                                }}
                                tabIndex={0}
                                aria-selected={isLanguageSelected(language.code)}
                            >
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 pointer-events-none"
                                    checked={isLanguageSelected(language.code)}
                                    onChange={() => { }}
                                    tabIndex={-1}
                                />
                                <div className='flex-1 flex items-center justify-between min-w-0'>
                                    <div className="flex flex-col min-w-0 flex-1">
                                        <span className={`text-sm font-medium ${dark ? 'text-white' : 'text-zinc-900'} truncate`}>
                                            {language.nativeName}
                                        </span>
                                        {language.name && language.name !== language.nativeName && (
                                            <span className='text-xs opacity-70'>
                                                {language.name}
                                            </span>
                                        )}
                                    </div>
                                    <span className={`${dark ? 'text-zinc-400' : 'text-zinc-500'} text-sm font-medium ml-2 flex-shrink-0`}>
                                        ({formatNumber(language.amount || 0)})
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </section>
    );
};

MobileLanguages.propTypes = {
    showDropdownFilter: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.oneOf([null])
    ]),
    handleDropdownFilter: PropTypes.func.isRequired,
    languagesRef: PropTypes.shape({
        current: PropTypes.instanceOf(Element)
    }),
    languages: PropTypes.arrayOf(PropTypes.shape({
        code: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        nativeName: PropTypes.string.isRequired,
        amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    })),
    onSelectionChange: PropTypes.func,
    disabled: PropTypes.bool,
    dark: PropTypes.bool,
    currentFilters: PropTypes.shape({
        languages: PropTypes.shape({
            selected: PropTypes.array.isRequired,
            isAllSelected: PropTypes.bool.isRequired,
            selectedCount: PropTypes.number.isRequired
        })
    }),
    handleCloseFilter: PropTypes.func
}

export default MobileLanguages;