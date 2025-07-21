import Icon from "@mdi/react";
import { mdiStar, mdiStarOutline } from "@mdi/js";

import PropTypes from 'prop-types';

const Rating = ({ rate }) => {

    return (
        <section className='flex'>
            {Array(5).fill(null).map((_, index) => (
                <Icon
                    key={index}
                    path={index < rate ? mdiStar : mdiStarOutline}
                    size={1}
                    className='text-[#FFB200]'
                />
            ))}
        </section>
    )
}

Rating.propTypes = {
    rate: PropTypes.number.isRequired,
};

export default Rating;
