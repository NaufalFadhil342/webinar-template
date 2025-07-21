import HowItWorksDetail from "./howItWorksDetail";
import { dummyGuideData as guides } from "../../data/guideData";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const HowItWorks = ({ dark }) => {
    return (
        <section
            className="w-full h-auto py-24 px-[8%] flex flex-col items-center gap-16"
            aria-label="How It Works Section"
        >
            <div className="w-full lg:w-3/5 h-auto mx-auto flex flex-col items-center gap-3">
                <span className={`text-[15px] italic transition-colors duration-300 ${dark ? 'text-secondary' : 'text-primary'
                    }`}>
                    Webinar
                </span>
                <h1 className={`text-4xl tracking-wide font-bold uppercase text-center transition-colors duration-300 ${dark ? 'text-white' : 'text-zinc-900'
                    }`}>
                    Your Guide to Attending Our Webinars
                </h1>
                <p className={`text-center transition-colors duration-300 ${dark ? 'text-zinc-300' : 'text-zinc-700'
                    }`}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, iure incidunt fugit beatae voluptatum, dolore consequatur doloribus saepe ullam ab numquam.
                </p>
            </div>
            <div className="w-full sm:w-3/5 lg:w-full h-auto grid lg:grid-cols-3 items-start gap-8">
                {guides.map((guide, index) => (
                    <HowItWorksDetail
                        key={guide.id}
                        title={guide.title}
                        text={guide.shortText}
                        image={guide.image}
                        dark={dark}
                        aria-label={`Step ${index + 1}: ${guide.title}`}
                    />
                ))}
            </div>
            <div>
                <Link
                    to='/events'
                    onClick={() => window.scrollTo(0, 0)}
                    className={`w-auto h-auto py-2 px-4 transition-all duration-150 hover:cursor-pointer rounded-lg ${dark ? 'bg-secondary text-white hover:bg-darkSecondary hover:shadow-lg'
                        : 'bg-primary text-white hover:bg-darkPrimary hover:shadow-lg'
                        }`}
                    aria-label="Join webinar"
                >
                    Join
                </Link>
            </div>
        </section>
    )
}

HowItWorks.propTypes = {
    dark: PropTypes.bool.isRequired
}

export default HowItWorks;
