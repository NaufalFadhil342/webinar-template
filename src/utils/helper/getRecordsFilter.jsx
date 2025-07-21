const isDateInRange = (recordDate, filterDate) => {
    const recordDateTime = new Date(recordDate);
    const now = new Date();

    switch (filterDate.value) {
        case 'all':
            return true;

        case 'last-week':
            {
                const lastWeek = new Date();
                lastWeek.setDate(now.getDate() - 7);
                return recordDateTime >= lastWeek;
            }

        case 'last-month':
            {
                const lastMonth = new Date();
                lastMonth.setMonth(now.getMonth() - 1);
                return recordDateTime >= lastMonth;
            }

        case 'this-year':
            {
                const thisYearStart = new Date(now.getFullYear(), 0, 1);
                return recordDateTime >= thisYearStart;
            }

        case 'last-year':
            {
                const lastYearStart = new Date(now.getFullYear() - 1, 0, 1);
                const lastYearEnd = new Date(now.getFullYear() - 1, 11, 31);
                return recordDateTime >= lastYearStart && recordDateTime <= lastYearEnd;
            }

        case 'custom':
            {
                if (!filterDate.range) return true;

                const fromDate = new Date(filterDate.range.from + '-01');
                const toDate = new Date(filterDate.range.to + '-01');
                toDate.setMonth(toDate.getMonth() + 1);
                toDate.setDate(0);

                return recordDateTime >= fromDate && recordDateTime <= toDate;
            }

        default:
            return true;
    }
};

const parseDurationToMinutes = (durationStr) => {
    if (!durationStr) return 0;

    const hourMatch = durationStr.match(/(\d+)h/);
    const minuteMatch = durationStr.match(/(\d+)m/);

    const hours = hourMatch ? parseInt(hourMatch[1]) : 0;
    const minutes = minuteMatch ? parseInt(minuteMatch[1]) : 0;

    return hours * 60 + minutes;
};

const isDurationRange = (recordDuration, filterDuration) => {
    if (filterDuration.value === 'all') {
        return true;
    }

    const durationInMinutes = parseDurationToMinutes(recordDuration);

    if (filterDuration.min !== undefined && filterDuration.max !== undefined) {
        return durationInMinutes >= filterDuration.min && durationInMinutes <= filterDuration.max;
    }

    switch (filterDuration.value) {
        case 'quick':
            return durationInMinutes >= 0 && durationInMinutes <= 29;
        case 'short':
            return durationInMinutes >= 30 && durationInMinutes <= 60;
        case 'standard':
            return durationInMinutes >= 61 && durationInMinutes <= 120;
        case 'extended':
            return durationInMinutes >= 121 && durationInMinutes <= 240;
        case 'fullday':
            return durationInMinutes >= 241;
        default:
            return true;
    }
}

function getRecordsFilter(recordedData, currentFilters) {
    let processedRecorded = [...recordedData];

    if (currentFilters.search.trim() !== '') {
        processedRecorded = processedRecorded.filter((recorded) => {
            const searchTerms = currentFilters.search.toLowerCase();

            const title = recorded.title.toLowerCase().includes(searchTerms);
            const category = recorded.category.toLowerCase().includes(searchTerms);
            const speaker = recorded.speaker.toLowerCase().includes(searchTerms);
            const tags = recorded.tags.some((tag) => tag.toLowerCase().includes(searchTerms));

            return title || category || speaker || tags
        })
    };

    if (currentFilters.category &&
        currentFilters.category !== 'all' &&
        currentFilters.category !== 'All Categories') {

        processedRecorded = processedRecorded.filter((recorded) => {
            return recorded.category.toLowerCase() === currentFilters.category.toLowerCase();
        });
    };

    if (currentFilters.date && currentFilters.date.value !== 'all') {

        processedRecorded = processedRecorded.filter(recorded => {
            return isDateInRange(recorded.date, currentFilters.date);
        });
    };

    if (currentFilters.duration && currentFilters.duration.value !== 'all') {
        processedRecorded = processedRecorded.filter(recorded => {
            return isDurationRange(recorded.duration, currentFilters.duration)
        })
    };

    processedRecorded.sort((a, b) => {
        switch (currentFilters.sort) {
            case 'Most Recent':
                return new Date(b.date) - new Date(a.date);
            case 'Most Popular':
                return b.views - a.views;
            case 'Highest Rated':
                return b.rating - a.rating;
            case 'A-Z':
                return a.title.localeCompare(b.title);
            case 'Z-A':
                return b.title.localeCompare(a.title);
            default:
                return 0;
        }
    })

    return processedRecorded;
}

export { getRecordsFilter };