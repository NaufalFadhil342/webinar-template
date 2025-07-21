import { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const LangsFilter = ({
    onFiltersChange,
    selectedLangs,
    dark,
    languagesList
}) => {
    const [showLangs, setShowLangs] = useState(false);

    const selectedLangsArray = useMemo(() => {
        if (!selectedLangs || selectedLangs === '') return [];

        if (Array.isArray(selectedLangs)) return selectedLangs;
        return [selectedLangs];
    }, [selectedLangs]);

    const isLangSelected = useCallback((langsValue) => {
        return selectedLangsArray.includes(langsValue)
    }, [selectedLangsArray]);

    const expandLang = () => setShowLangs(prev => !prev);

    const handleLangChange = useCallback((language) => {
        let newSelectedLang;

        if (isLangSelected(language.name)) {
            newSelectedLang = selectedLangsArray.filter((lang) => lang !== language.name)
        } else {
            newSelectedLang = [...selectedLangsArray, language.name];
        }

        onFiltersChange('languages', newSelectedLang)
    }, [isLangSelected, onFiltersChange, selectedLangsArray]);

    const sortingLanguages = useMemo(() => {

        return languagesList.sort((a, b) => {
            return a.nativeName.localeCompare(b.nativeName, undefined, {
                numeric: true,
                sensitivity: 'base'
            })
        })
    }, [languagesList]);

    return (
        <section className='w-full h-auto'>
            <h3 className={`text-[1.7em] font-medium mb-2 ${dark ? 'text-white' : 'text-zinc-900'} leading-none`}>Languages</h3>
            <ul className={`w-full ${showLangs ? 'h-auto' : 'h-52'} overflow-y-hidden`}>
                {sortingLanguages.map((lang) => {
                    const isSelected = isLangSelected(lang.name)

                    return (
                        <li
                            key={lang.code}
                            className={`py-2 w-full h-auto flex items-center gap-2 ${dark ? 'text-zinc-300 bg-transparent hover:bg-white/10' : 'text-zinc-600 bg-transparent hover:bg-primary/10'}`}
                            role='option'
                            onClick={() => handleLangChange(lang)}
                        >
                            <input
                                type="checkbox"
                                onChange={() => handleLangChange(lang)}
                                checked={isSelected}
                                aria-checked={isLangSelected(lang.name)}
                            />
                            <div className='w-full h-auto flex items-center justify-between gap-2'>
                                <div className='w-auto h-auto'>
                                    <h5 className={`w-auto h-auto ${dark ? 'text-zinc-300' : 'text-zinc-600'} font-medium`}>{lang.nativeName}</h5>
                                    <p className='text-xs text-zinc-400'>{lang.name}</p>
                                </div>
                                <span className='w-auto h-auto text-sm text-zinc-400'>({lang.amount})</span>
                            </div>
                        </li>
                    )
                })}
            </ul>
            <button
                type='button'
                className={`bg-transparent outline-none border-none text-sm ${dark ? 'text-secondary' : 'text-primary'} font-normal hover:font-medium transition-colors duration-150 ease-in`}
                onClick={expandLang}
                aria-expanded='true'
                aria-label={showLangs ? 'Show less' : 'Show all languages'}
            >
                {showLangs ? 'Show less' : 'Show all languages'}
            </button>
        </section>
    )
};

LangsFilter.propTypes = {
    onFiltersChange: PropTypes.func.isRequired,
    selectedLangs: PropTypes.array.isRequired,
    dark: PropTypes.bool,
    languagesList: PropTypes.array
}

export default LangsFilter;