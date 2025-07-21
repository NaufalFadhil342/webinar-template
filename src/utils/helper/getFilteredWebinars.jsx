const validateLanguageSelection = (languageSelection) => {
    if (!languageSelection?.selected ||
        languageSelection.selected.length === 0 ||
        (languageSelection.selected.length === 1 && languageSelection.selected[0] === '')) {
        return {
            selected: ['all'],
            isAllSelected: true,
            selectedCount: 1
        };
    }

    return languageSelection;
};

const shouldApplyLanguageFilter = (languageSelection) => {
    return !languageSelection.isAllSelected &&
        languageSelection.selected &&
        languageSelection.selected.length > 0 &&
        !languageSelection.selected.every(lang => lang === '' || lang === 'all');
};

const filterWebinarsByLanguage = (webinars, languageSelection, availableLanguages = []) => {
    const validatedSelection = validateLanguageSelection(languageSelection);

    if (validatedSelection.isAllSelected) {
        return webinars;
    };

    const languageMap = new Map();
    availableLanguages.forEach(lang => {
        if (lang.code && lang.name) {
            languageMap.set(lang.code.toLowerCase(), lang.name.toLowerCase());
            languageMap.set(lang.name.toLowerCase(), lang.name.toLowerCase());
            if (lang.nativeName) {
                languageMap.set(lang.nativeName.toLowerCase(), lang.name.toLowerCase());
            }
        }
    });

    // Filter webinars by selected languages using full names
    return webinars.filter(webinar => {
        // Handle case where webinar.language might be undefined/null
        const webinarLanguage = webinar.language || 'English';
        const normalizedWebinarLang = webinarLanguage.toLowerCase();

        return validatedSelection.selected.some(selectedLang => {
            const normalizedSelected = selectedLang.toLowerCase();

            // Direct match
            if (normalizedWebinarLang === normalizedSelected) {
                return true;
            }

            // Check if webinar language matches any mapped language
            const mappedWebinarLang = languageMap.get(normalizedWebinarLang);
            const mappedSelectedLang = languageMap.get(normalizedSelected);

            if (mappedWebinarLang && mappedSelectedLang) {
                return mappedWebinarLang === mappedSelectedLang;
            }

            // Fallback: check if selected language code matches webinar language
            if (languageMap.has(normalizedSelected)) {
                return mappedWebinarLang === languageMap.get(normalizedSelected);
            }

            return false;
        });
    });
};

// Updated main filter function
function getFilteredWebinars(webinars, currentFilters, availableLanguages = []) {
    if (!webinars || webinars.length === 0) {
        return [];
    }

    let processedWebinars = [...webinars];

    // Step 1: Filter by status
    if (currentFilters.status !== 'all') {
        processedWebinars = processedWebinars.filter(webinar => {
            if (currentFilters.status === 'live') {
                return webinar.isLive === true || webinar.status === 'live';
            }
            if (currentFilters.status === 'starting') {
                return webinar.isStarting === true || webinar.status === 'starting';
            }
            return true;
        });
    }

    // Step 2: Filter by languages using full names
    if (shouldApplyLanguageFilter(currentFilters.languages)) {
        processedWebinars = filterWebinarsByLanguage(
            processedWebinars,
            currentFilters.languages,
            availableLanguages
        );
    }

    // Step 3: Filter by levels
    if (currentFilters.levels &&
        !currentFilters.levels.isAllSelected &&
        currentFilters.levels.selected &&
        currentFilters.levels.selected.length > 0) {
        processedWebinars = processedWebinars.filter(webinar => {
            const webinarLevel = webinar.level || 'beginner';
            return currentFilters.levels.selected.includes(webinarLevel);
        });
    }

    // Step 4: Sort the results
    processedWebinars.sort((a, b) => {
        switch (currentFilters.sort) {
            case 'Most Relevant':
                return (b.relevanceScore || 0) - (a.relevanceScore || 0);
            case 'Most Reviews':
                return (b.reviewCount || 0) - (a.reviewCount || 0);
            case 'Highest Rating':
                return (b.rating || 0) - (a.rating || 0);
            case 'Newest':
                return new Date(b.createdAt || b.date || 0) - new Date(a.createdAt || a.date || 0);
            default:
                return 0;
        }
    });

    return processedWebinars;
};

export { getFilteredWebinars, validateLanguageSelection };