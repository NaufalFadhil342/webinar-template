import propTypes from 'prop-types';
import { topicsData } from '../../../data/topicsData';
import TopicsDetails from './topicsDetails';

const Topics = ({ dark }) => {

    return (
        <section className={`w-full h-auto py-24 px-[8%] flex flex-col gap-12 ${dark ? "bg-zinc-800" : "bg-white"}`} aria-label="Support topics">

            <h1 className={`${dark ? "text-white" : "text-zinc-900"} uppercase font-bold tracking-wide text-4xl w-3/4 h-auto`} id="topics-heading">
                Explore Our Comprehensive Support Topics for Seamless Webinar Experiences
            </h1>

            <div className='w-full h-auto grid lg:grid-cols-3 gap-8' aria-labelledby="topics-heading">

                {topicsData.map((topic) => (
                    <TopicsDetails key={topic.id} topic={topic} dark={dark} />
                ))}
            </div>
        </section>
    )
};


Topics.propTypes = {
    dark: propTypes.bool.isRequired,
}

export default Topics;
