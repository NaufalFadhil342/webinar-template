// import { useMemo, useCallback } from 'react';
import Icon from '@mdi/react';
import { mdiMenuDown } from '@mdi/js';
import PropTypes from 'prop-types';
import { useLanguageSelection } from '../../hooks/useLanguageSelection';

const Languages = ({
    showDropdownFilter,
    handleDropdownFilter,
    languagesRef,
    languages = [],
    disabled = false,
    dark,
    selectedLanguages = { selected: ['all'], isAllSelected: true, selectedCount: 1 },
    onLanguageChange
}) => {

    const {
        processedLanguages,
        isLanguageSelected,
        handleLanguageToggle,
        getDisplayText,
        formatNumber,
        totalAmount
    } = useLanguageSelection(languages, selectedLanguages, onLanguageChange)

    return (
        <section
            className={`group py-[5px] px-3 font-medium border ${dark ? 'border-secondary' : 'border-primary'
                } rounded-full transition-all duration-150 ease-in-out cursor-pointer relative ${disabled
                    ? 'opacity-50 cursor-not-allowed'
                    : `${dark ? 'hover:bg-secondary' : 'hover:bg-primary'}`
                } ${selectedLanguages.selectedCount > 1 || !selectedLanguages.isAllSelected
                    ? `${dark ? 'bg-secondary text-white' : 'bg-primary text-white'}`
                    : ''
                }`}
            ref={languagesRef}
            role="combobox"
            aria-expanded={showDropdownFilter === 'languages'}
            aria-haspopup="listbox"
            aria-disabled={disabled}
            onClick={(e) => e.stopPropagation()}
        >
            <div
                className={`w-full h-auto flex items-center ${selectedLanguages.selectedCount > 1 || !selectedLanguages.isAllSelected
                    ? 'text-white'
                    : `${dark ? 'text-white' : 'text-zinc-600 group-hover:text-white'}`
                    } transition-all duration-150 ease-in-out`}
                onClick={() => {
                    console.log('Language dropdown clicked, disabled:', disabled);
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
                role="button"
            >
                <p className="truncate flex-1 text-left">
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
                <div className={`absolute z-[4] top-10 left-0 border ${dark ? 'border-zinc-600 bg-zinc-800' : 'border-zinc-200 bg-white'
                    } rounded-md shadow-wide w-80`}>
                    <ul
                        className='max-h-[40vh] overflow-y-auto'
                        role="listbox"
                        aria-label="Language selection options"
                    >
                        {/* "All Languages" option */}
                        <li
                            className={`w-full flex items-center gap-2 p-3 cursor-pointer ${dark ? 'hover:bg-white/15 focus:bg-white/15' : 'hover:bg-primary/15'
                                } ${isLanguageSelected('all')
                                    ? `${dark ? 'bg-white/10 text-secondary' : 'bg-primary/10 text-primary'}`
                                    : `${dark ? 'text-zinc-300' : 'text-zinc-600'}`
                                }`}
                            role="option"
                            onClick={() => handleLanguageToggle('all')}
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

                        {/* Individual language options */}
                        {processedLanguages.map((language) => {

                            return (
                                <li
                                    key={language.code}
                                    className={`w-full flex items-center gap-2 p-3 cursor-pointer ${dark ? 'hover:bg-white/15 focus:bg-white/15' : 'hover:bg-primary/15 focus:bg-primary/15'
                                        } ${isLanguageSelected(language.code)
                                            ? `${dark ? 'bg-white/10 text-secondary' : 'bg-primary/10 text-primary'}`
                                            : `${dark ? 'text-zinc-300' : 'text-zinc-600'}`
                                        }`}
                                    role="option"
                                    onClick={() => handleLanguageToggle(language.code)}
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
                                            <span className={`text-sm font-medium ${dark ? 'text-white' : 'text-zinc-900'
                                                } truncate`}>
                                                {language.nativeName}
                                            </span>
                                            {language.name && language.name !== language.nativeName && (
                                                <span className={`text-xs truncate ${dark ? 'text-zinc-400' : 'text-zinc-500'
                                                    }`}>
                                                    {language.name}
                                                </span>
                                            )}
                                        </div>
                                        <span className={`${dark ? 'text-zinc-400' : 'text-zinc-500'
                                            } text-sm font-medium ml-2 flex-shrink-0`}>
                                            ({formatNumber(language.amount || 0)})
                                        </span>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )}
        </section>
    );
};

Languages.propTypes = {
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
    disabled: PropTypes.bool,
    dark: PropTypes.bool,
    selectedLanguages: PropTypes.shape({
        selected: PropTypes.array.isRequired,
        isAllSelected: PropTypes.bool.isRequired,
        selectedCount: PropTypes.number.isRequired
    }),
    onLanguageChange: PropTypes.func.isRequired,
};

export default Languages;