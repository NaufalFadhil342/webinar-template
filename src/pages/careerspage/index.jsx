import { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/header';
import Careers from '../../layout/careers-layout';
import Discover from '../../layout/discover-layout';
import CallToAction from "../../layout/callToAction-layout";
import ToTop from '../../UI/toTop';
import { CAREERS_HEADER } from '../../config/configData';
import { usePageLoading } from '../../hooks/usePageLoading';
import { failLoadData as message } from '../../config/configData';
import LoadingOverlay from '../../components/loadingOverlay';

const CareersPage = ({ dark }) => {
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
    }, [stopLoading])

    return (
        <Fragment>
            <LoadingOverlay isLoading={isLoading} dark={dark} />
            <main className="w-full h-auto flex flex-col gap-10">
                <Header
                    ariaLabel='Careers page header'
                    dark={dark}
                    description={CAREERS_HEADER.description}
                    title={CAREERS_HEADER.title}
                />
                <section aria-labelledby='careers-content'>
                    <div id='careers-content'>
                        <Careers dark={dark} />
                        <Discover dark={dark} />
                        <CallToAction dark={dark} />
                    </div>
                    <ToTop dark={dark} />
                </section>
            </main>
        </Fragment>
    )
};

CareersPage.propTypes = {
    dark: PropTypes.bool.isRequired
};

export default CareersPage;
