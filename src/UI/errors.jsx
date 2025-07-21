export const getErrorMessage = (currentFilters) => {
    const hasSearch = currentFilters.search.trim() !== '';
    const hasCategory = currentFilters.category && currentFilters.category !== 'all' && currentFilters.category !== 'All Categories';
    const hasDateFilter = currentFilters.date && currentFilters.date.value !== 'all';
    const hasDurationFilter = currentFilters.duration && currentFilters.duration.value !== 'all';

    const activeFilters = [];
    if (hasSearch) activeFilters.push(`"${currentFilters.search}"`);
    if (hasCategory) activeFilters.push(`category: ${currentFilters.category}`);
    if (hasDateFilter) activeFilters.push(`time: ${currentFilters.date.label}`);
    if (hasDurationFilter) activeFilters.push(`duration: ${currentFilters.duration.label}`);

    const messages = [
        {
            title: "No Sessions Found",
            description: activeFilters.length > 0
                ? `We couldn't find any sessions matching your criteria: ${activeFilters.join(', ')}. Try broadening your search or explore different topics.`
                : "No recorded sessions are currently available. Check back soon for new content!",
            suggestions: activeFilters.length > 0
                ? ["Clear some filters", "Try different keywords", "Browse all sessions"]
                : ["Check back later", "Browse upcoming sessions", "View popular topics"]
        },
        {
            title: "Nothing Here Yet",
            description: activeFilters.length > 0
                ? `Your search for ${activeFilters.join(' + ')} didn't match any sessions. Let's try a different approach!`
                : "We're working on adding more sessions. Stay tuned for exciting content!",
            suggestions: activeFilters.length > 0
                ? ["Refine your search", "Clear filters", "Explore categories"]
                : ["Subscribe for updates", "View featured content", "Check our schedule"]
        },
        {
            title: "Oops! No Matches",
            description: activeFilters.length > 0
                ? `We searched high and low but couldn't find sessions for: ${activeFilters.join(', ')}. Don't give up - try tweaking your filters!`
                : "Our session library is growing! More content is coming your way soon.",
            suggestions: activeFilters.length > 0
                ? ["Adjust your filters", "Try similar terms", "Reset all filters"]
                : ["Browse popular sessions", "Check upcoming events", "Follow us for updates"]
        },
        {
            title: "No Results This Time",
            description: activeFilters.length > 0
                ? `The combination of ${activeFilters.join(' and ')} didn't yield any results. How about trying something different?`
                : "We're continuously adding new sessions. Your next favorite topic might be just around the corner!",
            suggestions: activeFilters.length > 0
                ? ["Try fewer filters", "Use different keywords", "Browse by category"]
                : ["Explore trending topics", "View recent additions", "Join our community"]
        }
    ];

    const messageIndex = Math.floor(Date.now() / (1000 * 60 * 5)) % messages.length;
    return messages[messageIndex];
};

export const getEventsErrorMessage = (search, category, date, eventsData) => {
    if (!eventsData || eventsData.length === 0) {
        return {
            type: 'no-data',
            title: "There's No Event Available",
            message: " Sorry, currently there's no event available. Please check again later.",
            suggestion: 'Register to our newsletter to get notification about new event'
        };
    }

    const hasSearch = search && search.trim() !== '';
    const hasCategory = category !== '' && category !== 'all';
    const hasDate = date !== '' && category !== 'all';

    const hasActiveFilters = hasSearch || hasCategory || hasDate;

    if (hasActiveFilters) {
        const activeFilters = [];

        if (hasSearch) {
            activeFilters.push(`search "${search.trim()}"`);
        }
        if (hasCategory) {
            activeFilters.push(`category "${category}"`);
        }
        if (hasDate) {
            activeFilters.push(`date "${date}"`);
        }

        let filterText;
        if (activeFilters.length === 1) {
            filterText = activeFilters[0];
        } else if (activeFilters.length === 2) {
            filterText = activeFilters.join(' and ');
        } else {
            const lastFilter = activeFilters.pop();
            filterText = activeFilters.join(', ') + ', and ' + lastFilter;
        }

        return {
            type: 'no-results',
            title: 'The Event Not Found',
            message: `There's no event matches with ${filterText}.`,
            suggestion: 'Try change or remove some filters to see more.',
        };
    }

    return {
        type: 'general-error',
        title: 'Oops! Something Went Wrong',
        message: 'An error occurred while loading events. Please refresh the page.',
        suggestion: 'If the problem persists, please contact our support team.'
    };
}

export const getSearchErrorMessage = (currentResult) => {

    const hasLanguage = currentResult.languages && currentResult.languages.length > 0;
    const hasDuration = currentResult.duration && currentResult.duration.length > 0;
    const hasDate = currentResult.date && currentResult.date.from !== '' && currentResult.date.to !== '';

    const hasActiveFilters = hasLanguage || hasDuration || hasDate

    if (hasActiveFilters) {
        const activeFilters = [];

        if (hasLanguage) activeFilters.push(`language: ${currentResult.languages}`)
        if (hasDuration) activeFilters.push(`duration: ${currentResult.duration}`)
        if (hasDate) activeFilters.push(`date: ${currentResult.date}`)

        let filterText;
        if (activeFilters.length === 1) {
            filterText = activeFilters[0];
        } else if (activeFilters.length === 2) {
            filterText = activeFilters.join(' and ')
        } else {
            const lastFilter = activeFilters.pop();
            filterText = activeFilters.join(', ') + ', ' + lastFilter
        }

        return {
            type: 'no-result',
            title: 'The Event Not Found',
            message: `There's no event matches with ${filterText}`,
            suggestion: 'Try change or remove the filter to get the event you want'
        }
    }

    return {
        type: 'general-error',
        title: 'Oops! Something Wrong',
        message: 'An error occured while loading event. Please refresh the page.',
        suggestion: 'If the problem persists, please contact our support team.'
    }
}