import PropTypes from 'prop-types';
import { careersData } from '../../data/careersData';
import CareersItem from './careersItem';
import { Element } from 'react-scroll';

const Careers = ({ dark }) => {

    // Check if careers data exist or not
    if (!careersData || careersData.length === 0) {
        return (
            <div className={`w-full h-96 flex items-center justify-center ${dark ? "text-zinc-300" : "text-zinc-600"
                }`}>
                No career opportunities available at the moment.
            </div>
        );
    }

    return (
        <Element name='discover'>
            <section className={`w-full h-auto mx-auto px-[8%] py-24 flex flex-col gap-12 ${dark ? "bg-zinc-800" : "bg-white"
                }`}>
                <div className='w-full sm:w-2/3 h-auto sm:mx-auto flex flex-col items-center gap-3'>
                    <span className={`text-[15px] italic ${dark ? "text-secondary" : "text-primary"
                        }`}>
                        Careers
                    </span>
                    <h1 className={`uppercase text-4xl font-bold text-center tracking-wide ${dark ? "text-white" : "text-zinc-"
                        }`}>
                        Open Positions
                    </h1>
                    <p className={`w-full md:w-2/3 text-center ${dark ? "text-zinc-300" : "text-zinc-600"
                        }`}>
                        Exploring exciting career opportunities that align with our innovative webinars initiatives.
                    </p>
                </div>
                <div className='w-full lg:w-2/3 h-auto lg:mx-auto'>
                    <ul className='w-full h-auto'>
                        {careersData.map((career) => (
                            <CareersItem key={career.id} career={career} dark={dark} />
                        ))}
                    </ul>
                </div>
            </section>
        </Element>
    )
};

Careers.propTypes = {
    dark: PropTypes.bool.isRequired
}

export default Careers;
