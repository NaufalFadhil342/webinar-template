import { Link } from 'react-router-dom';
import { dummyBenefitData } from "../../data/benefitData";
import BenefitDetail from './benefitDetail';
import PropTypes from 'prop-types';
import { useAuth } from '../../hooks/useAuth';

const Benefit = ({ dark, homePage }) => {
    const { isAuthenticated } = useAuth();

    return (
        <section
            className="w-full h-auto py-24 px-[8%]"
            aria-label="Benefits Section"
        >
            <div className="w-full sm:w-2/3 h-auto flex flex-col items-center mx-auto gap-3">
                <span className={`italic text-[15px] transition-colors duration-300 ${dark ? 'text-secondary' : 'text-primary'
                    }`}>
                    Benefit
                </span>
                <h1 className={`w-full font-bold text-center uppercase text-4xl leading-tight tracking-wide transition-colors duration-300 ${dark ? 'text-white' : 'text-zinc-900'
                    }`}>
                    Unlock the Power of Knowledge Through Webinars
                </h1>
                <p className={`w-full text-center transition-colors duration-300 ${dark ? 'text-zinc-300' : 'text-zinc-600'
                    }`}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel architecto cupiditate accusamus suscipit repudiandae Excepturi quaerat ex in omnis veritatis.
                </p>
            </div>

            <div className="mt-14 w-full h-auto grid justify-items-center lg:grid-cols-3 gap-8">
                {dummyBenefitData.map((item) => (
                    <BenefitDetail key={item.id} item={item} dark={dark} />
                ))}
            </div>
            <div className={`mt-14 w-full h-auto ${homePage ? 'hidden' : 'flex'
                } justify-center gap-4`}>
                {!isAuthenticated && (
                    <Link
                        to='/register'
                        onClick={() => window.scrollTo(0, 0)}
                        className={`w-auto h-10 px-5 flex items-center duration-150 transition-colors ${dark ? 'bg-secondary text-white hover:bg-darkSecondary' : 'bg-primary text-white hover:bg-darkPrimary'
                            }`}
                        aria-label="Join our webinars"
                    >
                        Register
                    </Link>
                )}
                <Link
                    to='/aboutus'
                    onClick={() => window.scrollTo(0, 0)}
                    className={`group w-auto h-10 px-4 flex items-center border-b-2 transition-all duration-150 ${dark ? 'text-zinc-300 border-zinc-300 hover:text-white hover:border-white' : 'border-zinc-600 text-zinc-600 hover:border-primary hover:text-primary'
                        }`}
                    aria-label="Learn more about us"
                >
                    Learn More
                </Link>
            </div>
        </section>
    )
}

Benefit.propTypes = {
    dark: PropTypes.bool.isRequired,
    homePage: PropTypes.bool
}

export default Benefit;
