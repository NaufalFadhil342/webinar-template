import { Fragment, useEffect, useState } from 'react';
import ToTop from "../../UI/toTop";
import PropTypes from 'prop-types';
import JobFairForm from "./jobFair-form";
import { failLoadData as message } from '../../config/configData';
import { usePageLoading } from '../../hooks/usePageLoading';
import LoadingOverlay from '../../components/loadingOverlay';

const JobFairPage = ({ dark }) => {
    const [, setPageData] = useState(null);
    const { isLoading, stopLoading } = usePageLoading({
        initialDelay: 50,
        minDuration: 400,
        maxDuration: 1400,
        autoStart: true
    })

    useEffect(() => {
        const fetchPageData = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 800))
                setPageData({ loaded: true })
            } catch (error) {
                console.error(message.error, error)
            } finally {
                stopLoading()
            }
        }

        fetchPageData()
    }, [stopLoading]);

    return (
        <Fragment>
            <LoadingOverlay isLoading={isLoading} dark={dark} />
            <main className="w-full h-auto" aria-label="Job fair page">
                <section className="w-full h-auto" aria-label="Job fair content">
                    <JobFairForm dark={dark} />
                </section>
                <ToTop dark={dark} />
            </main>
        </Fragment>
    )
};

JobFairPage.propTypes = {
    dark: PropTypes.bool
}

export default JobFairPage;