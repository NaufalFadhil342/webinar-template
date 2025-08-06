import { useState, useEffect, Fragment } from "react";
import { useLocation } from "react-router";
import PropTypes from 'prop-types';
import Header from "../../components/header";
import ToTop from "../../UI/toTop";
import { ABOUT_HEADER } from '../../config/configData';
import OurHistory from "../../layout/ourHistory-layout";
import Benefit from "../../layout/benefit-layout";
import TeamMates from "../../layout/teammates-layout";
import Testimonials from "../../layout/testimonial-layout";
import { usePageLoading } from "../../hooks/usePageLoading";
import { useAsyncOperation } from "../../hooks/useAsyncOperation";
import LoadingOverlay from "../../components/loadingOverlay";
import { failLoadData as message } from "../../config/configData";

const AboutUs = ({ dark }) => {
    const location = useLocation('/');
    const [, setPageData] = useState(null);

    // Loading page hook
    const { isLoading, startLoading, stopLoading } = usePageLoading({
        initialDelay: 50,
        minDuration: 200,
        maxDuration: 1000,
        autoStart: true
    })

    // Async operations hook
    const { executeAsync } = useAsyncOperation();

    // Simulate data fetching
    useEffect(() => {
        const fetchPageData = async () => {
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 800));
                setPageData({ loaded: true });
            } catch (error) {
                console.error(message.error, error);
            } finally {
                stopLoading();
            }
        };

        fetchPageData();
    }, [stopLoading]);

    // Handler for others async operations
    const handleAsyncAction = async () => {
        await executeAsync(
            () => fetch('/api/some-endpoint').then(res => res.json()),
            'Processing request...'
        );
    };

    // Manual loading control
    const handleManualLoading = () => {
        startLoading('Custom loading message...');
        setTimeout(() => {
            stopLoading();
        }, 2000);
    };

    return (
        <Fragment>
            <LoadingOverlay
                isLoading={isLoading}
                dark={dark}
            />

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

                {/* Debug buttons - remove in production */}
                <div className="fixed bottom-8 left-8 flex gap-2">
                    <button
                        onClick={handleManualLoading}
                        className="px-3 py-1 bg-blue-500 text-white rounded text-xs"
                    >
                        Manual Loading
                    </button>
                    <button
                        onClick={handleAsyncAction}
                        className="px-3 py-1 bg-green-500 text-white rounded text-xs"
                    >
                        Async Action
                    </button>
                </div>
            </main>
        </Fragment>
    )
};

AboutUs.propTypes = {
    dark: PropTypes.bool.isRequired
};

export default AboutUs;
