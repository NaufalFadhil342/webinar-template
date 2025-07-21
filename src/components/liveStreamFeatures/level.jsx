import Icon from '@mdi/react'
import { mdiMenuDown } from '@mdi/js';
import PropTypes from 'prop-types';

const Level = ({ showDropdownFilter, handleDropdownFilter, levelRef, dark, levelOptions, onLevelChange, selectedLevels, disabled }) => {

    const handleLevelSelect = (levelId) => {
        const currentSelected = new Set(selectedLevels.selected);

        if (levelId === 'all') {
            if (currentSelected.has('all')) {
                // If 'all' is currently selected, clear everything
                const newSelection = {
                    selected: [],
                    isAllSelected: false,
                    selectedCount: 0
                };
                onLevelChange(newSelection);
            } else {
                // Select 'all'
                const newSelection = {
                    selected: ['all'],
                    isAllSelected: true,
                    selectedCount: 1
                };
                onLevelChange(newSelection);
            }
        } else {
            if (currentSelected.has('all')) {
                // If 'all' was selected, replace it with the specific level
                const newSelection = {
                    selected: [levelId],
                    isAllSelected: false,
                    selectedCount: 1
                };
                onLevelChange(newSelection);
            } else {
                // Toggle the specific level
                if (currentSelected.has(levelId)) {
                    currentSelected.delete(levelId);
                } else {
                    currentSelected.add(levelId);
                }

                // If no levels are selected, default to 'all'
                if (currentSelected.size === 0) {
                    const newSelection = {
                        selected: ['all'],
                        isAllSelected: true,
                        selectedCount: 1
                    };
                    onLevelChange(newSelection);
                } else {
                    const newSelection = {
                        selected: Array.from(currentSelected),
                        isAllSelected: false,
                        selectedCount: currentSelected.size
                    };
                    onLevelChange(newSelection);
                }
            }
        }
    };

    const isLevelSelected = (levelId) => {
        return selectedLevels.selected.includes(levelId);
    };

    const formatNumber = (number) => {
        return number.toLocaleString('en-US');
    };

    return (
        <section
            className={`group py-[5px] px-3 font-medium border ${dark ? 'border-secondary hover:bg-secondary' : 'border-primary hover:bg-primary'} rounded-full duration-150 transition-all ease-in-out cursor-pointer relative`}
            ref={levelRef}
            onClick={e => e.stopPropagation()}
        >
            <div className={`w-full h-auto flex items-center ${dark ? 'text-white' : 'text-zinc-600 group-hover:text-white'} transition-all duration-150 ease-in-out`} onClick={() => handleDropdownFilter('level')}>
                <p>Level</p>
                <Icon path={mdiMenuDown} size={1} />
            </div>
            {showDropdownFilter === 'level' && (
                <ul className={`absolute z-[4] top-10 left-0 shadow-wide ${dark ? 'bg-zinc-800' : 'bg-white'} w-60 h-auto flex flex-col overflow-y-auto`} onClick={(e) => e.stopPropagation()}>
                    {levelOptions.map((grade) => (
                        <li
                            key={grade.id}
                            className={` font-medium px-3 py-2 bg-transparent ${dark ? 'hover:bg-white/10' : 'hover:bg-primary/10'} flex items-center gap-2`}
                            onClick={() => handleLevelSelect(grade.id)}
                        >
                            <input
                                type="checkbox"
                                checked={isLevelSelected(grade.id)}
                                onChange={() => handleLevelSelect(grade.id)}
                                onClick={(e) => e.stopPropagation()}
                                className="w-4 h-4"
                                disabled={disabled}
                            />
                            <div className='w-auto h-auto flex gap-1'>
                                <span className={`text-sm font-medium ${dark ? 'text-zinc-300' : 'text-zinc-700'
                                    }`}>
                                    {grade.label}
                                </span>
                                <span className={`${dark ? 'text-zinc-400' : 'text-zinc-500'
                                    } text-sm`}>
                                    ({formatNumber(grade.amount)})
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
};

Level.propTypes = {
    showDropdownFilter: PropTypes.string,
    handleDropdownFilter: PropTypes.func.isRequired,
    levelRef: PropTypes.object.isRequired,
    dark: PropTypes.bool,
    levelOptions: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired
    })).isRequired,
    onLevelChange: PropTypes.func.isRequired,
    selectedLevels: PropTypes.shape({
        selected: PropTypes.array.isRequired,
        isAllSelected: PropTypes.bool.isRequired,
        selectedCount: PropTypes.number.isRequired
    }).isRequired,
    disabled: PropTypes.bool
};

export default Level;