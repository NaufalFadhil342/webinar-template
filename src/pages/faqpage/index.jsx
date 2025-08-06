import { Fragment, useCallback, useEffect, useState } from "react";
import Header from "../../components/header";
import FAQs from "../../layout/faqs-layout";
import PropTypes from 'prop-types';
import ToTop from "../../UI/toTop";
import { FAQS_HEADER } from '../../config/configData';
import { usePageLoading } from "../../hooks/usePageLoading";
import LoadingOverlay from "../../components/loadingOverlay";
import { failLoadData as message } from "../../config/configData";

const FaqPage = ({ dark }) => {
    const [, setPageData] = useState(null);
    const { isLoading, stopLoading } = usePageLoading({
        initialDelay: 50,
        minDuration: 200,
        maxDuration: 1000,
        autoStart: true
    });

    const fetchPageData = useCallback(async () => {
        try {
            await new Promise(resolve => setTimeout(resolve, 800))
            setPageData({ loaded: true })
        } catch (error) {
            console.error(message.error, error)
        } finally {
            stopLoading()
        }
    }, [stopLoading])

    useEffect(() => {
        fetchPageData()
    }, [fetchPageData])

    return (
        <Fragment>
            <LoadingOverlay isLoading={isLoading} dark={dark} />
            <main className="w-full h-auto flex flex-col gap-10" aria-label="Frequently Asked Questions">
                <Header
                    title={FAQS_HEADER.title}
                    description={FAQS_HEADER.description}
                    tagline='FAQs'
                    ariaLabel="FAQ Header"
                    dark={dark}
                />
                <section aria-label="FAQs-section">
                    <FAQs dark={dark} />
                </section>
                <ToTop dark={dark} />
            </main>
        </Fragment>
    )
};

FaqPage.propTypes = {
    dark: PropTypes.bool.isRequired
}

export default FaqPage;
