import Hero from "../../components/header/hero";
import Benefit from "../../layout/benefit-layout";
import CallToAction from "../../layout/callToAction-layout";
import Gallery from "../../layout/gallery-layout";
import Highlight from "../../layout/highlight-layout";
import HowItWorks from "../../layout/howItWorks-layout";
import SupportingBy from "../../layout/supportingBy-layout";
import Testimonials from "../../layout/testimonial-layout";
import PropTypes from 'prop-types';
import ToTop from "../../UI/toTop";
import PriceList from "../../layout/priceList-layout";

const Home = ({ dark }) => {
    return (
        <main className="w-full h-auto flex flex-col gap-10" aria-label="home">
            <Hero dark={dark} />
            <section aria-labelledby="home-section">
                <div id='home-section'>
                    <SupportingBy dark={dark} />
                    <Highlight dark={dark} />
                    <Benefit dark={dark} />
                    <Testimonials dark={dark} />
                    <HowItWorks dark={dark} />
                    <Gallery dark={dark} />
                    <PriceList dark={dark} />
                    <CallToAction dark={dark} />
                </div>
                <ToTop dark={dark} />
            </section>
        </main>
    )
}

Home.propTypes = {
    dark: PropTypes.bool.isRequired,
}

export default Home;