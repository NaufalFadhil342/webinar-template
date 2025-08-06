import { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/header';
import Topics from '../../layout/supportCenter-layout/topics';
import ToTop from '../../UI/toTop';
import Help from '../../layout/supportCenter-layout/help';
import Support from '../../layout/supportCenter-layout/support';
import ConnectWithUs from '../../layout/connectWithUs-layout';
import { SUPPORT_HEADER } from '../../config/configData';
import { usePageLoading } from '../../hooks/usePageLoading';
import { failLoadData as message } from '../../config/configData';
import LoadingOverlay from '../../components/loadingOverlay';

const SupportPage = ({ dark }) => {
    const [, setPageData] = useState(null);

    const { isLoading, stopLoading } = usePageLoading({
        initialDelay: 50,
        minDuration: 300,
        maxDuration: 1200,
        autoStart: true
    });

    useEffect(() => {
        const fetchPageData = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 800))
                setPageData({ loaded: true })
            } catch (error) {
                console.log(message.error, error)
            } finally {
                stopLoading()
            }
        }

        fetchPageData()
    }, [stopLoading])

    return (
        <Fragment>
            <LoadingOverlay isLoading={isLoading} dark={dark} />
            <main className='w-full h-auto flex flex-col gap-10' aria-label="Support page">
                <Header
                    title={SUPPORT_HEADER.title}
                    description={SUPPORT_HEADER.description}
                    dark={dark}
                    ariaLabel='support center'
                />
                <section aria-labelledby="support-content">
                    <div id="support-content">
                        <Topics dark={dark} />
                        <Help dark={dark} />
                        <Support dark={dark} />
                        <ConnectWithUs dark={dark} />
                    </div>
                    <ToTop dark={dark} />
                </section>
            </main>
        </Fragment>
    )
};

SupportPage.propTypes = {
    dark: PropTypes.bool
};

export default SupportPage;
