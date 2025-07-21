import { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

const LevelFilter = ({
    onFiltersChange,
    selectedLevel,
    dark,
    levelOptions
}) => {
    const selectLevelArray = useMemo(() => {
        if (!selectedLevel) return [];

        if (Array.isArray(selectedLevel)) {
            if (selectedLevel.length === 0 || (selectedLevel.length === 1 && selectedLevel[0] === 'all level')) {
                return []
            }
            return selectedLevel
        }

        if (selectedLevel !== 'all level') {
            return [selectedLevel]
        }

        return [];
    }, [selectedLevel]);

    const isLevelSelected = useCallback((level) => {
        if (level === 'all level') {
            return !selectedLevel ||
                selectedLevel.length === 0 ||
                (Array.isArray(selectedLevel) && selectedLevel.length === 1 && selectedLevel[0] === 'all level')
        }

        return selectLevelArray.includes(level)
    }, [selectLevelArray, selectedLevel]);

    const handleLevelChange = useCallback((level) => {
        let newLevelSelect;

        if (level.value === 'all level') {
            newLevelSelect = ['all level'];
        } else {
            if (isLevelSelected(level.value)) {
                newLevelSelect = selectLevelArray.filter(l => l !== level.value);

                if (newLevelSelect.length === 0) {
                    newLevelSelect = ['all level']
                }
            } else {
                newLevelSelect = [...selectLevelArray, level.value];
            }
        }

        onFiltersChange('level', newLevelSelect);
    }, [isLevelSelected, onFiltersChange, selectLevelArray]);

    return (
        <section className="w-full h-auto">
            <h3 className={`text-[1.7em] mb-2 font-medium leading-none ${dark ? 'text-white' : 'text-zinc-900'}`}>Level</h3>
            <ul className='w-full h-auto'>
                {levelOptions.map((level, index) => {
                    const isSelected = isLevelSelected(level.value);

                    return (
                        <li
                            key={index}
                            className={`w-full h-auto flex items-center gap-2 py-2 ${dark ? 'text-zinc-300 hover:font-medium bg-transparent hover:bg-white/10' : 'text-zinc-600 hover:font-medium bg-transparent hover:bg-primary/10'}`}
                            role='option'
                            onClick={() => handleLevelChange(level)}
                        >
                            <input
                                type="checkbox"
                                className='hover:cursor-pointer'
                                onChange={() => { }}
                                checked={isSelected}
                                readOnly
                                aria-checked={isSelected}
                            />
                            <span className={dark ? 'text-zinc-300 font-medium' : 'text-zinc-600 font-medium'}>{level.label}</span>
                        </li>
                    )

                })}
            </ul>
        </section>
    )
};

LevelFilter.propTypes = {
    onFiltersChange: PropTypes.func.isRequired,
    selectedLevel: PropTypes.array.isRequired,
    dark: PropTypes.bool,
    levelOptions: PropTypes.array
}

export default LevelFilter;