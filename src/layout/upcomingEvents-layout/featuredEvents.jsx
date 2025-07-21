import PropTypes from 'prop-types';
import FeaturedEvent from './featuredEvent';

const EdgeTopLeft = ({ dark }) => (
    <div className={`${dark ? 'bg-zinc-700' : 'bg-[#f1f1f3]'} w-[2.7rem] h-10 rounded-br-xl absolute top-0 left-0 z-[3]`}>
        <div className={`${dark ? 'bg-zinc-700' : 'bg-[#F1F1F3]'} w-5 h-4 absolute z-[5] top-0 left-10`}>
            <div className={`w-full h-full ${dark ? 'bg-secondary' : 'bg-primary'} rounded-tl-xl absolute left-[3px]`} />
        </div>
        <div className={`${dark ? 'bg-zinc-700' : 'bg-[#F1F1F3]'} w-4 h-5 absolute z-[5] top-10 left-0`}>
            <div className={`w-full h-full ${dark ? 'bg-secondary' : 'bg-primary'} rounded-tl-xl`} />
        </div>
    </div>
);

const EdgeBottomRight = ({ dark }) => (
    <div className={`${dark ? 'bg-zinc-700' : 'bg-[#f1f1f3]'} w-[2.7rem] h-10 rounded-tl-xl absolute bottom-0 right-0 z-[3]`}>
        <div className={`${dark ? 'bg-zinc-700' : 'bg-[#F1F1F3]'} w-4 h-5 absolute z-[5] bottom-10 right-0`}>
            <div className={`w-full h-full ${dark ? 'bg-secondary' : 'bg-primary'} rounded-br-xl`} />
        </div>
        <div className={`${dark ? 'bg-zinc-700' : 'bg-[#F1F1F3]'} w-5 h-4 absolute z-[5] bottom-0 right-10`}>
            <div className={`w-full h-full ${dark ? 'bg-secondary' : 'bg-primary'} rounded-br-xl absolute right-[3px]`} />
        </div>
    </div>
);

const FeaturedEvents = ({ featuredEvents, dark }) => {
    return (
        <section className='w-full h-auto mt-10'>
            {featuredEvents.length > 0 && (
                <div className="w-full px-[8%]">
                    <div className="flex flex-col gap-10">
                        {featuredEvents.map(event => (
                            <FeaturedEvent key={event.id} event={event} dark={dark} EdgeBottomRight={EdgeBottomRight} EdgeTopLeft={EdgeTopLeft} />
                        ))}
                    </div>
                </div>
            )}
        </section>
    )
};

EdgeBottomRight.propTypes = {
    dark: PropTypes.bool
}

EdgeTopLeft.propTypes = {
    dark: PropTypes.bool
}

FeaturedEvents.propTypes = {
    featuredEvents: PropTypes.array,
    dark: PropTypes.bool
}

export default FeaturedEvents