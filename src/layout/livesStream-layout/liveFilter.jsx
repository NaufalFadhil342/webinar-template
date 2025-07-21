import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import Languages from "../../components/liveStreamFeatures/languages";
import Level from "../../components/liveStreamFeatures/level";
import { mdiMenuDown, mdiFilterOutline } from "@mdi/js";
import Icon from "@mdi/react";
import PropTypes from 'prop-types';
import MobileWebinarFilter from "./mobileWebinarFilter";

const SORT_ITEMS = ['Most Relevant', 'Most Reviews', 'Highest Rating', 'Newest'];

const FILTER_STATUS = [
  { id: 'all', label: 'All', active: true },
  { id: 'live', label: 'Live Now', active: false },
  { id: 'starting', label: 'Starting Soon', active: false }
];

const LEVEL_OPTIONS = [
  { id: 'all', label: 'All Levels', amount: 5000 },
  { id: 'beginner', label: 'Beginner', amount: 3500 },
  { id: 'intermediate', label: 'Intermediate', amount: 1500 },
  { id: 'advanced', label: 'Advanced', amount: 950 }
];

const LiveFilter = ({
  onFiltersChange,
  initialSort = 'Most Relevant',
  className = '',
  disabled = false,
  languages,
  dark
}) => {
  const [filters, setFilters] = useState({
    sort: initialSort,
    status: 'all',
    languages: {
      selected: ['all'],
      isAllSelected: true,
      selectedCount: 1
    },
    levels: {
      selected: ['all'],
      isAllSelected: true,
      selectedCount: 1
    }
  });
  const [showDropdownFilter, setShowDropdownFilter] = useState(null);
  const [showMobileFilter, setShowMobileFilter] = useState(null);

  const languagesRef = useRef();
  const levelRef = useRef();
  const sortItemsRef = useRef();
  const filterButtonRef = useRef();

  const handleDropdownToggle = (currDropdown) => {
    setShowDropdownFilter(prev => prev === currDropdown ? null : currDropdown);
  };

  const handleMobileFilterToggle = () => {
    setShowMobileFilter(showMobileFilter ? null : 'mobileFilter');
  };

  // Handle outside click to close dropdowns
  const handleOutsideClick = useCallback((event) => {
    const refs = [languagesRef, levelRef, sortItemsRef];
    const clickedOutside = refs.every(ref =>
      !ref.current || !ref.current.contains(event.target)
    );

    if (clickedOutside) {
      setShowDropdownFilter(null);
    }
  }, []);

  const handleStatusChange = useCallback((statusId) => {
    setFilters(prev => ({
      ...prev,
      status: statusId
    }));
  }, []);

  const handleSortChange = useCallback((sortValue) => {
    setFilters(prev => ({
      ...prev,
      sort: sortValue
    }));
    setShowDropdownFilter(null);
  }, []);

  const handleLanguageChange = useCallback((languageSelection) => {
    setFilters(prev => ({
      ...prev,
      languages: languageSelection
    }));
  }, []);

  const handleLevelChange = useCallback((levelSelection) => {
    setFilters(prev => ({
      ...prev,
      levels: levelSelection
    }));
  }, []);

  useEffect(() => {
    if (showDropdownFilter) {
      document.addEventListener('click', handleOutsideClick);
      return () => document.removeEventListener('click', handleOutsideClick);
    }
  }, [handleOutsideClick, showDropdownFilter]);

  useEffect(() => {
    if (onFiltersChange) {
      onFiltersChange(filters);
    }
  }, [filters, onFiltersChange]);

  const statusButtons = useMemo(() =>
    FILTER_STATUS.map((status) => (
      <li key={status.id}>
        <button
          className={`w-auto h-auto px-3 py-[5px] rounded-full border transition-all duration-150 ease-in ${filters.status === status.id
            ? `${dark ? 'border-secondary bg-secondary text-white' : 'border-primary bg-primary text-white'}`
            : `${dark ? 'border-secondary text-zinc-300 hover:bg-secondary hover:text-white' : 'border-primary text-zinc-600 hover:text-white hover:bg-primary'}`
            } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          onClick={() => !disabled && handleStatusChange(status.id)}
          disabled={disabled}
          type="button"
        >
          {status.label}
        </button>
      </li>
    )), [filters.status, dark, disabled, handleStatusChange])

  return (
    <section
      className={`w-full h-auto flex gap-4 justify-between items-center ${className} ${disabled ? 'pointer-events-none opacity-60' : ''
        }`}
      role="region"
      aria-label="Live stream filters"
    >
      <div className="hidden lg:flex items-center gap-4">
        <ul className="w-auto h-auto flex items-center gap-4" role="group" aria-label="Status filters">
          {statusButtons}
        </ul>
        <div className="flex items-center gap-4">
          <Languages
            showDropdownFilter={showDropdownFilter}
            handleDropdownFilter={handleDropdownToggle}
            languagesRef={languagesRef}
            languages={languages}
            disabled={disabled}
            dark={dark}
            selectedLanguages={filters.languages}
            onLanguageChange={handleLanguageChange}
          />
          <Level
            showDropdownFilter={showDropdownFilter}
            handleDropdownFilter={handleDropdownToggle}
            levelRef={levelRef}
            disabled={disabled}
            dark={dark}
            selectedLevels={filters.levels}
            onLevelChange={handleLevelChange}
            levelOptions={LEVEL_OPTIONS}
          />
        </div>
      </div>
      <button
        ref={filterButtonRef}
        className="flex items-center gap-1 lg:hidden"
        onClick={handleMobileFilterToggle}
        type="button"
      >
        <Icon path={mdiFilterOutline} size={1} className={dark ? "text-secondary" : "text-primary"} />
        <p className={dark ? "text-zinc-300 font-medium" : "text-zinc-600 font-medium"}>Filter</p>
      </button>
      <div className="w-auto h-auto relative flex-shrink-0" ref={sortItemsRef}>
        <button
          className={`w-full h-auto flex gap-1 items-center cursor-pointer focus:outline-none focus:ring-2 ${dark ? 'focus:ring-white/50' : 'focus:ring-primary/50'} rounded px-2 py-1 transition-colors duration-150 ${showDropdownFilter === 'sortItems' ? `${dark ? 'text-secondary' : 'text-primary'}` : `${dark ? 'text-zinc-300 hover:text-secondary' : 'text-zinc-700 hover:text-primary'}`
            } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
          onClick={() => handleDropdownToggle('sortItems')}
          disabled={disabled}
          type="button"
          aria-expanded={showDropdownFilter === 'sortItems'}
          aria-haspopup="listbox"
          aria-label={`Sort by ${filters.sort}`}
        >
          <span className="font-medium">{filters.sort}</span>
          <Icon
            path={mdiMenuDown}
            size={1}
            className={`transition-transform duration-200 ${showDropdownFilter === 'sortItems' ? 'rotate-180' : ''
              }`}
          />
        </button>
        {showDropdownFilter === 'sortItems' && !disabled && (
          <ul
            className={`w-48 h-auto border ${dark ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-zinc-200'} shadow-wide rounded-md absolute right-0 top-10 z-[4] overflow-hidden`}
            role="listbox"
            aria-label="Sort options"
          >
            {SORT_ITEMS.map((item, index) => {
              const isSelected = filters.sort === item;

              return (
                <li key={index}>
                  <button
                    className={`w-full px-3 py-2 text-left bg-transparent  ${dark ? 'hover:bg-white/15 focus:bg-white/15' : 'hover:bg-primary/15 focus:bg-primary/15'} focus:outline-none cursor-pointer transition-colors duration-150 ${isSelected ? `${dark ? 'bg-white/10 font-medium text-secondary' : 'bg-primary/10 font-medium text-primary'}` : `${dark ? 'text-zinc-300' : 'text-zinc-600'}`
                      }`}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSortChange(item)}
                  >
                    {item}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <MobileWebinarFilter
        status={FILTER_STATUS}
        showDropdownFilter={showDropdownFilter}
        handleDropdownFilter={handleDropdownToggle}
        languagesRef={languagesRef}
        languages={languages}
        levelRef={levelRef}
        disabled={disabled}
        dark={dark}
        currentFilters={filters}
        onStatusChange={handleStatusChange}
        onLanguageChange={handleLanguageChange}
        onLevelChange={handleLevelChange}
        showMobileFilter={showMobileFilter}
        setShowMobileFilter={setShowMobileFilter}
      />
    </section>
  );
};

LiveFilter.propTypes = {
  languages: PropTypes.array,
  onFiltersChange: PropTypes.func,
  initialSort: PropTypes.oneOf(SORT_ITEMS),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  dark: PropTypes.bool
};

export default LiveFilter;