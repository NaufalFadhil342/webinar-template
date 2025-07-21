const parseDurationToMinutes = (durationStr) => {
    if (!durationStr) return 0;

    const timeMatch = durationStr.match(/(\d+):(\d+):(\d+)/);
    if (timeMatch) {
        const hours = parseInt(timeMatch[1]);
        const minutes = parseInt(timeMatch[2]);
        return hours * 60 + minutes;
    }

    const hourMatch = durationStr.match(/(\d+)h/);
    const minuteMatch = durationStr.match(/(\d+)m/);

    const hours = hourMatch ? parseInt(hourMatch[1]) : 0;
    const minutes = minuteMatch ? parseInt(minuteMatch[1]) : 0;

    return hours * 60 + minutes;
};

const parseFilteredSearchsDate = (dateString) => {
    const [day, month, year] = dateString.split('-');

    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}

function getSearchsFilter(webinarsData, currentResult) {
    let processedSearched = [...webinarsData];

    if (currentResult.status && currentResult.status !== 'all') {
        processedSearched = processedSearched.filter((selectStatus) => {
            return selectStatus.status === currentResult.status
        })
    }

    if (currentResult.category && currentResult.category !== '') {
        processedSearched = processedSearched.filter(selectCategory => {
            return selectCategory.category === currentResult.category
        })
    }

    if (currentResult.rates && currentResult.rates !== '') {
        const parseRating = parseFloat(currentResult.rates);

        processedSearched = processedSearched.filter((selectRate) => {
            return selectRate.rates >= parseRating
        })
    }

    if (currentResult.languages && currentResult.languages.length > 0) {
        processedSearched = processedSearched.filter(selectLang => {
            return currentResult.languages.includes(selectLang.language)
        })
    }

    if (currentResult.duration && currentResult.duration.length > 0) {
        processedSearched = processedSearched.filter(selectDuration => {
            const durationInMinutes = parseDurationToMinutes(selectDuration.duration);

            return currentResult.duration.some(selectRange => {
                switch (selectRange) {
                    case '<1 hour':
                        return durationInMinutes < 60;
                    case '1-2 hours':
                        return durationInMinutes >= 60 && durationInMinutes < 120
                    case '2-4 hours':
                        return durationInMinutes >= 120 && durationInMinutes <= 240
                    case '4-8 hours':
                        return durationInMinutes >= 240 && durationInMinutes <= 480
                    case '8-16 hours':
                        return durationInMinutes >= 480 && durationInMinutes <= 960;
                    case '>16 hours':
                        return durationInMinutes >= 960;
                    default:
                        return false;
                }
            })
        })
    }

    if (currentResult.level && currentResult.level.length > 0) {
        processedSearched = processedSearched.filter(result => {
            if (currentResult.level.includes('all level') || currentResult.length === 0) {
                return true;
            }

            return currentResult.level.some((selectLevel) => {
                return selectLevel.toLowerCase() === result.level.toLowerCase()
            })
        })
    }

    if (currentResult.date && typeof currentResult.date === 'object') {
        const { from, to } = currentResult.date;

        if (from && to) {
            const fromDate = new Date(from + '-01');
            const toDate = new Date(to + '-01');
            toDate.setMonth(toDate.getMonth() + 1);
            toDate.setDate(0);

            processedSearched = processedSearched.filter((selectDate) => {
                const filterDateTime = parseFilteredSearchsDate(selectDate.date);

                return filterDateTime >= fromDate && filterDateTime <= toDate
            })
        }
    }

    if (currentResult.costs || currentResult.costs !== '') {
        return processedSearched.filter(selectPrice => {
            const itemPrice = selectPrice.costs;

            if (currentResult.costs === 'free') {
                return itemPrice === 0 ||
                    itemPrice === '0' ||
                    itemPrice === 'free' ||
                    itemPrice === null ||
                    itemPrice === undefined ||
                    itemPrice === '';
            }

            if (currentResult.costs === 'paid') {
                return itemPrice &&
                    itemPrice !== 0 &&
                    itemPrice !== '0' &&
                    itemPrice !== 'free' &&
                    itemPrice !== null &&
                    itemPrice !== undefined &&
                    itemPrice !== '';
            }

            return true;
        });
    }

    if (currentResult.sort === 'Most Relevant') {
        return processedSearched
    }

    processedSearched.sort((a, b) => {
        switch (currentResult.sort) {
            case 'Most Popular':
                return b.views - a.views;
            case 'Highest Rating':
                return b.rating - a.rating;
            case 'Newest':
                return new Date(b.date) - new Date(a.date);
            case 'Low - High':
                return a.costs - b.costs;
            case 'High - Low':
                return b.costs - a.costs;
            default:
                return 0;
        }
    })

    return processedSearched;
}

export { getSearchsFilter }