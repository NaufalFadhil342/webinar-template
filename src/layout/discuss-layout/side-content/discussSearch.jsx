import Search from "../../../UI/search";
import PropTypes from 'prop-types';

const DiscussSearch = ({
    dark,
    setSearchParams,
    topics,
    searchQuery,
    setFilteredTopics,
    setSearchQuery
}) => {

    // Handling filter by search
    const handleSearchParams = () => {
        console.log('searching for:', searchQuery);

        if (!searchQuery.trim()) {
            console.log("the topic you search is not found!");
            setFilteredTopics(topics);
            setSearchParams({});
            return
        };

        const formattedQuery = searchQuery.replace(/\s+/g, '-');
        setSearchParams({ search: formattedQuery });

        setTimeout(() => {
            const query = (searchQuery || '').toLowerCase();

            const results = topics.filter(topic => {
                const content = (topic.topic?.text || '').toLowerCase();
                const user = (topic.namePict || '').toLowerCase();

                return (
                    content.includes(query) ||
                    user.includes(query)
                )
            });

            setFilteredTopics(results);
        }, 500)
    };

    const handleSearchQuery = (e) => setSearchQuery(e.target.value);

    const handleSearch = (e) => {
        e.preventDefault();

        handleSearchParams();
    };

    return (
        <section className="w-full h-auto">
            <Search
                dark={dark}
                placeholder='Search for a topic'
                className={`${dark ? 'bg-zinc-800' : 'bg-white'} w-full h-auto p-4  rounded-md shadow-md shadow-zinc-500/15`}
                searchIcon={true}
                value={searchQuery}
                onChange={handleSearchQuery}
                onSubmit={handleSearch}
            />
        </section>
    );
};

DiscussSearch.propTypes = {
    dark: PropTypes.bool,
    setSearchParams: PropTypes.func,
    setSearchQuery: PropTypes.func,
    topics: PropTypes.array,
    searchQuery: PropTypes.string,
    setFilteredTopics: PropTypes.func
}

export default DiscussSearch;