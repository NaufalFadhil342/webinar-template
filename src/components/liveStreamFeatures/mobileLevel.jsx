import { useState } from 'react';
import Icon from '@mdi/react'
import { mdiMenuDown } from '@mdi/js';
import PropTypes from 'prop-types';

const levelStatus = [
    {
        level: 'All Levels',
        amount: 3000,
        id: 'all'
    },
    {
        level: 'Beginner',
        amount: 1500,
        id: 'beginner'
    },
    {
        level: 'Intermediate',
        amount: 1000,
        id: 'intermediate'
    },
    {
        level: 'Expert',
        amount: 500,
        id: 'expert'
    },
];

const MobileLevel = ({ showDropdownFilter, handleDropdownFilter, levelRef, dark }) => {
    const [selectedLevels, setSelectedLevels] = useState(new Set(['all']));

    const handleLevelSelect = (levelId) => {
        setSelectedLevels(prevSelected => {
            const newSelected = new Set(prevSelected);

            if (levelId === 'all') {
                if (newSelected.has('all')) {
                    newSelected.clear();
                } else {
                    newSelected.clear();
                    newSelected.add('all');
                }
            } else {
                if (newSelected.has('all')) {
                    newSelected.clear();
                    newSelected.add(levelId);
                } else {
                    if (newSelected.has(levelId)) {
                        newSelected.delete(levelId);

                        if (newSelected.size === 0) {
                            newSelected.add('all');
                        }
                    } else {
                        newSelected.add(levelId)
                    }
                }
            }

            return newSelected;
        })
    };

    const isLevelSelected = (levelId) => {
        return selectedLevels.has(levelId)
    };

    const formatNumber = (number) => {
        return number.toLocaleString('en-EN')
    };

    return (
        <section className='w-full h-auto' ref={levelRef}>
            <div className={`group w-full h-auto py-2 px-3 flex justify-center bg-transparent ${dark ? 'hover:bg-secondary' : 'hover:bg-primary'} transition-all duration-150 ease-in-out`}>
                <div className={`w-fit h-full flex items-center ${dark ? 'text-zinc-300' : 'text-zinc-600 group-hover:text-white'} transition-all duration-150 ease-in-out`} onClick={() => handleDropdownFilter('level')}>
                    <p>Level</p>
                    <Icon path={mdiMenuDown} size={1} className={`ml-2 transition-transform duration-200 ${showDropdownFilter === 'level' ? 'rotate-180' : ''}`} />
                </div>
            </div>
            {showDropdownFilter === 'level' && (
                <ul className={`w-full h-auto flex flex-col`}>
                    {levelStatus.map((grade) => (
                        <li
                            key={grade.id}
                            className={`font-medium px-3 py-2 bg-transparent ${dark ? 'hover:bg-white/10' : 'hover:bg-primary/10'} flex items-center gap-2`}
                            onClick={() => handleLevelSelect(grade.id)}
                        >
                            <input
                                type="checkbox"
                                checked={isLevelSelected(grade.id)}
                                onChange={() => handleLevelSelect(grade.id)}
                                onClick={(e) => e.stopPropagation()}
                                className="w-4 h-4"
                            />
                            <div className='w-auto h-auto flex gap-1'>
                                <span className={`text-sm font-medium ${dark ? 'text-zinc-300' : 'text-zinc-700'}`}>{grade.level}</span>
                                <span className={`${dark ? 'text-zinc-400' : 'text-zinc-500'} text-sm`}>({formatNumber(grade.amount)})</span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
};

MobileLevel.propTypes = {
    showDropdownFilter: PropTypes.any,
    handleDropdownFilter: PropTypes.func.isRequired,
    levelRef: PropTypes.object.isRequired,
    dark: PropTypes.bool
}

export default MobileLevel;