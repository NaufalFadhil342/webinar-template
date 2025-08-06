import { useState, Fragment, useEffect } from "react";
import Header from "../../components/header";
import { SPEAKERS_HEADER as header } from "../../config/configData";
import PropTypes from 'prop-types';
import FeaturedSpeakers from "../../layout/speakers-layout/featuredSpeakers";
import AllSpeaker from "../../layout/speakers-layout/allSpeakers";
import ToTop from "../../UI/toTop";
import { usePageLoading } from "../../hooks/usePageLoading";
import LoadingOverlay from "../../components/loadingOverlay";
import { failLoadData as message } from "../../config/configData";

const SpeakersPage = ({ dark }) => {
    const [, setPageData] = useState(null);
    const { isLoading, stopLoading } = usePageLoading({
        initialDelay: 0,
        minDuration: 300,
        maxDuration: 1200,
        autoStart: true
    })

    useEffect(() => {
        const fetchPageData = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 800));
                setPageData({ loaded: true })
            } catch (error) {
                console.error(message.error, error)
            } finally {
                stopLoading()
            }
        }

        fetchPageData();
    }, [stopLoading])

    return (
        <Fragment>
            <LoadingOverlay isLoading={isLoading} dark={dark} />
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
        </Fragment>
    )
};

SpeakersPage.propTypes = {
    dark: PropTypes.bool
}

export default SpeakersPage;