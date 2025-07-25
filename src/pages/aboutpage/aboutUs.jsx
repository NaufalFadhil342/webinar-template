import { useLocation } from "react-router";
import PropTypes from 'prop-types';
import Header from "../../components/header";
import ToTop from "../../UI/toTop";
import { ABOUT_HEADER } from '../../config/configData';
import OurHistory from "../../layout/ourHistory-layout";
import Benefit from "../../layout/benefit-layout";
import TeamMates from "../../layout/teammates-layout";
import Testimonials from "../../layout/testimonial-layout";

const AboutUs = ({ dark }) => {
    const location = useLocation('/');

    return (
        <main className="w-full h-auto flex flex-col gap-10">
            <Header
                dark={dark}
                title={ABOUT_HEADER.title}
                tagline='engage'
                description={ABOUT_HEADER.description}
                ariaLabel="About Us Header Section"
            />
            <section aria-labelledby="aboutus-content">
                <div id="aboutus-content">
                    <OurHistory dark={dark} />
                    <Benefit dark={dark} homePage={location.pathname !== "/"} />
                    <TeamMates dark={dark} />
                    <Testimonials dark={dark} homePage={location.pathname !== "/"} />
                </div>
                <ToTop dark={dark} />
            </section>
        </main>
    )
};

AboutUs.propTypes = {
    dark: PropTypes.bool.isRequired
};

export default AboutUs;
