import { Fragment, useEffect, useState } from 'react';
import Header from '../../components/header';
import { ERROR_HEADER as header } from '../../config/configData';
import PropTypes from 'prop-types';
import { failLoadData as message } from '../../config/configData';
import { usePageLoading } from '../../hooks/usePageLoading';
import LoadingOverlay from '../../components/loadingOverlay';

const ErrorPage = ({ dark }) => {
    const [, setPageData] = useState(null);
    const { isLoading, stopLoading } = usePageLoading({
        initialDelay: 50,
        minDuration: 100,
        maxDuration: 800,
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
            <main className='w-full h-auto mb-8'>
                <Header
                    ariaLabel="Error header"
                    dark={dark}
                    title={header.title}
                    description={header.description}
                    hasButton={true}
                    tagline='404'
                />
            </main>
        </Fragment>
    )
}

ErrorPage.propTypes = {
    dark: PropTypes.bool
}

export default ErrorPage;