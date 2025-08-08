import PropTypes from 'prop-types';
import FeaturedEvent from './featuredEvent';

const FeaturedEvents = ({ featuredEvents, dark }) => {
    return (
        <section className='w-full h-auto mt-10'>
            {featuredEvents.length > 0 && (
                <div className="w-full px-[8%]">
                    <div className="flex flex-col gap-10">
                        {featuredEvents.map(event => (
                            <FeaturedEvent key={event.id} event={event} dark={dark} />
                        ))}
                    </div>
                </div>
            )}
        </section>
    )
};

FeaturedEvents.propTypes = {
    featuredEvents: PropTypes.array,
    dark: PropTypes.bool
}

export default FeaturedEvents