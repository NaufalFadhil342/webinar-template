import { useCallback, useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import MobileLanguages from "../../components/liveStreamFeatures/mobileLanguages";
import MobileLevel from "../../components/liveStreamFeatures/mobileLevel";
import { AnimatePresence, motion } from 'motion/react';

const MobileWebinarFilter = ({
    status,
    showDropdownFilter,
    handleDropdownFilter,
    languagesRef,
    languages,
    levelRef,
    disabled,
    dark,
    currentFilters,
    onStatusChange,
    onLanguageChange,
    onLevelChange,
    showMobileFilter,
    setShowMobileFilter
}) => {
    const mobileFilterRef = useRef();

    const renderStatusFilter = useCallback((statusItem) => {
        const isSelected = currentFilters.status === statusItem.id;

        return (
            <li className='w-full h-auto cursor-pointer' key={statusItem.id}>
                <button
                    className={`font-medium w-full h-full py-2 px-3 ${isSelected
                        ? `${dark ? 'bg-secondary text-white' : "bg-primary text-white"}`
                        : `${dark ? 'text-zinc-300 hover:bg-white/10' : "text-zinc-600 hover:bg-primary/10"}`
                        }`}
                    onClick={() => {
                        onStatusChange(statusItem.id)
                        setShowMobileFilter(null)
                    }}
                    disabled={disabled}
                    type="button"
                    aria-pressed={isSelected}
                    aria-label={`Filter by ${statusItem.label}`}
                >
                    {statusItem.label}
                </button>
            </li>
        );
    }, [disabled, onStatusChange, currentFilters.status, dark, setShowMobileFilter]);

    const handleLanguageSelectionChange = useCallback((languageSelection) => {
        onLanguageChange(languageSelection);
    }, [onLanguageChange]);

    const handleLevelSelectionChange = useCallback((levelSelection) => {
        onLevelChange(levelSelection);
    }, [onLevelChange]);

    const handleCloseFilter = () => setShowMobileFilter(null);

    const handleOutsideClick = useCallback((event) => {
        if (mobileFilterRef.current && !mobileFilterRef.current.contains(event.target)) {
            setShowMobileFilter(null);
        }
    }, [setShowMobileFilter]);

    useEffect(() => {
        if (showMobileFilter === 'mobileFilter') {
            const timer = setTimeout(() => {
                document.addEventListener('click', handleOutsideClick);
            }, 100);

            return () => {
                clearTimeout(timer);
                document.removeEventListener('click', handleOutsideClick);
            };
        }
    }, [showMobileFilter, handleOutsideClick]);

    return (
        <AnimatePresence>
            {showMobileFilter === 'mobileFilter' && (
                <>
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-50 z-[4] hidden sm:block lg:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleCloseFilter}
                    />
                    <motion.section
                        className={`fixed left-0 top-0 z-[5] w-full sm:w-80 h-screen flex flex-col lg:hidden justify-center ${dark ? 'bg-zinc-600' : 'bg-white'} drop-shadow-lg`}
                        initial={{ x: -80, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -80, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        ref={mobileFilterRef}
                    >
                        <div className="w-full h-auto flex justify-center mb-4 absolute z-[4] top-10">
                            <button
                                className={`text-4xl font-semibold size-12 rounded-full shadow-[0_0_10px_rgba(25,25,25,0.25)] ${dark ? 'text-zinc-200 hover:text-secondary' : 'text-zinc-500 hover:text-primary'} duration-150 transition-colors`}
                                type="button"
                                aria-label="close sidebar filter"
                                onClick={handleCloseFilter}
                            >
                                <span className="w-full h-full flex justify-center">x</span>
                            </button>
                        </div>
                        <ul className="w-full h-auto flex flex-col" role="group" aria-label="Status filters">
                            {status.map(renderStatusFilter)}
                        </ul>
                        <div className="w-full h-auto">
                            <MobileLanguages
                                showDropdownFilter={showDropdownFilter}
                                handleDropdownFilter={handleDropdownFilter}
                                languagesRef={languagesRef}
                                languages={languages}
                                onSelectionChange={handleLanguageSelectionChange}
                                disabled={disabled}
                                dark={dark}
                                currentFilters={currentFilters}
                                handleCloseFilter={handleCloseFilter}
                            />
                            <MobileLevel
                                showDropdownFilter={showDropdownFilter}
                                handleDropdownFilter={handleDropdownFilter}
                                levelRef={levelRef}
                                onSelectionChange={handleLevelSelectionChange}
                                disabled={disabled}
                                dark={dark}
                                currentFilters={currentFilters}
                                handleCloseFilter={handleCloseFilter}
                            />
                        </div>
                    </motion.section>
                </>
            )}
        </AnimatePresence>
    )
};

MobileWebinarFilter.propTypes = {
    status: PropTypes.array.isRequired,
    showDropdownFilter: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.oneOf([null])
    ]),
    handleDropdownFilter: PropTypes.func.isRequired,
    languagesRef: PropTypes.shape({
        current: PropTypes.instanceOf(Element)
    }),
    levelRef: PropTypes.object.isRequired,
    languages: PropTypes.array,
    disabled: PropTypes.bool,
    dark: PropTypes.bool,
    currentFilters: PropTypes.shape({
        status: PropTypes.string.isRequired,
        languages: PropTypes.object.isRequired,
        levels: PropTypes.object.isRequired,
        sort: PropTypes.string.isRequired
    }).isRequired,
    onStatusChange: PropTypes.func.isRequired,
    onLanguageChange: PropTypes.func.isRequired,
    onLevelChange: PropTypes.func.isRequired,
    showMobileFilter: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.oneOf([null])
    ]),
    setShowMobileFilter: PropTypes.func
}

export default MobileWebinarFilter;