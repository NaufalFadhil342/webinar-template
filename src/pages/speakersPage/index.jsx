import Header from "../../components/header";
import { SPEAKERS_HEADER as header } from "../../config/configData";
import PropTypes from 'prop-types';
import FeaturedSpeakers from "../../layout/speakers-layout/featuredSpeakers";
import AllSpeaker from "../../layout/speakers-layout/allSpeakers";
import ToTop from "../../UI/toTop";

const SpeakersPage = ({ dark }) => {
    return (
        <main className='w-full h-auto flex flex-col gap-10' aria-label="Speakers page">
            <Header
                ariaLabel="speakers header section"
                dark={dark}
                description={header.description}
                title={header.title}
                tagline="speakers"
            />
            <section className="w-full h-auto flex flex-col gap-10" aria-label="Speakers content">
                <div className="w-full h-auto">
                    <FeaturedSpeakers dark={dark} />
                </div>
                <div className="w-full h-auto">
                    <AllSpeaker dark={dark} />
                </div>
            </section>
            <ToTop dark={dark} />
        </main>
    )
};

SpeakersPage.propTypes = {
    dark: PropTypes.bool
}

export default SpeakersPage;