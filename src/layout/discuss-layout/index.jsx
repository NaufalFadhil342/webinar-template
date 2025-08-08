import { useEffect, useState } from 'react';
import { Outlet, useSearchParams, Link } from 'react-router';
import PropTypes from 'prop-types';
import AddNewTopics from "./main-content/addNewTopics";
import Topics from "./main-content/topics";
import DiscussSearch from "./side-content/discussSearch";
import DiscussStatistics from "./side-content/discussStatistics";
import DiscussActivity from './side-content/discussActivity';
import DiscussPopularTags from './side-content/discussPopularTags';
import DiscussContributors from './side-content/discussContributors';
import { useTopics } from '../../hooks/useTopics';
import { useAuth } from '../../hooks/useAuth';

const Discuss = ({ dark }) => {
    const [filteredTopics, setFilteredTopics] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState('');
    const { topics } = useTopics();
    const { isAuthenticated } = useAuth();

    // Checking the parameters for the topic
    useEffect(() => {
        const queryFromUrl = searchParams.get('search');

        if (queryFromUrl && topics.length > 0) {
            console.log('Found url search params:', queryFromUrl);
            const decodedQuery = queryFromUrl.replace(/-/g, ' ')
            setSearchQuery(decodedQuery);
        };

        const query = (queryFromUrl || '').toLowerCase();
        const results = topics.filter(topic => (
            (topic.topic?.text || '').toLowerCase().includes(query) ||
            (topic.namePict || '').toLowerCase().includes(query)
        ));

        console.log(results)
        console.log("Filtered by URL params", results.length, 'of', topics.length);
        setFilteredTopics(results);
    }, [topics, searchParams])

    return (
        <section className='w-full h-auto'>
            {isAuthenticated ? (
                <div className='w-full h-auto grid grid-cols-[2fr,1fr] gap-10 px-10 pb-24'>
                    <div className="w-full h-auto flex flex-col gap-8">
                        <AddNewTopics
                            dark={dark}
                        />
                        <Topics dark={dark} topics={filteredTopics} />
                    </div>
                    <aside className="w-full h-auto flex flex-col gap-10">
                        <DiscussSearch
                            dark={dark}
                            setSearchParams={setSearchParams}
                            setSearchQuery={setSearchQuery}
                            setFilteredTopics={setFilteredTopics}
                            searchQuery={searchQuery}
                            topics={topics}
                        />
                        <DiscussStatistics dark={dark} />
                        <DiscussActivity
                            dark={dark}
                            topics={topics}
                        />
                        <DiscussPopularTags dark={dark} />
                        <DiscussContributors dark={dark} />
                    </aside>
                </div>
            ) : (
                <div className="w-full h-auto flex flex-col items-center justify-center pb-24">
                    <h1 className="text-center font-semibold text-zinc-900 text-[2em]">Login or Sign Up to Get Access to Our Community</h1>
                    <Link to='/register' className="w-fit h-12 px-4 mt-6 flex items-center bg-primary text-white hover:bg-darkPrimary rounded-md transition-all duration-150 ease-in-out">Register</Link>
                </div>
            )}
            <Outlet />
        </section>
    );
};

Discuss.propTypes = {
    dark: PropTypes.bool
};

export default Discuss;