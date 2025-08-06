import { useEffect, useState, useCallback, Fragment } from "react";
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
import { usePageLoading } from "../../hooks/usePageLoading";
import LoadingOverlay from "../../components/loadingOverlay";
import { failLoadData as message } from "../../config/configData";

const Home = ({ dark }) => {
    const [, setPageData] = useState(null);
    const { isLoading, stopLoading } = usePageLoading({
        initialDelay: 50,
        minDuration: 200,
        maxDuration: 1000,
        autoStart: true
    });

    const fetchPageData = useCallback(async () => {
        try {
            await new Promise(resolve => setTimeout(resolve, 800));
            setPageData({ loaded: true });
        } catch (error) {
            console.error(message.error, error);
        } finally {
            stopLoading();
        }
    }, [stopLoading])

    useEffect(() => {
        fetchPageData()
    }, [fetchPageData])

    return (
        <Fragment>
            <LoadingOverlay
                isLoading={isLoading}
                dark={dark}
            />

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
        </Fragment>
    )
}

Home.propTypes = {
    dark: PropTypes.bool.isRequired,
}

export default Home;