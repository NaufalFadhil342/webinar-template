import { Fragment, useCallback, useEffect, useState } from 'react';
import UserAuth from "../../auth/userAuth";
import PropTypes from 'prop-types';
import ToTop from "../../UI/toTop";
import { failLoadData as message } from '../../config/configData';
import { usePageLoading } from '../../hooks/usePageLoading';
import LoadingOverlay from '../../components/loadingOverlay';

const RegisterPage = ({ dark }) => {
    const [, setPageData] = useState(null);
    const { isLoading, stopLoading } = usePageLoading({
        initialDelay: 50,
        minDuration: 100,
        maxDuration: 800,
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
        fetchPageData();
    }, [fetchPageData])

    return (
        <Fragment>
            <LoadingOverlay isLoading={isLoading} dark={dark} />
            <main className="w-full h-auto" aria-label="Register page">
                <section className="w-full h-auto" aria-label="Register content">
                    <UserAuth dark={dark} />
                </section>
                <ToTop dark={dark} />
            </main>
        </Fragment>
    )
};

RegisterPage.propTypes = {
    dark: PropTypes.bool
};

export default RegisterPage;