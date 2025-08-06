import { Fragment, useEffect, useState } from 'react';
import ConnectWithUs from "../../layout/connectWithUs-layout";
import ToTop from "../../UI/toTop";
import ContactForm from "./contactForm";
import PropTypes from 'prop-types'
import { usePageLoading } from '../../hooks/usePageLoading';
import { failLoadData as message } from '../../config/configData';
import LoadingOverlay from '../../components/loadingOverlay';

const ContactUs = ({ dark }) => {
    const [, setPageData] = useState(null);
    const { isLoading, stopLoading } = usePageLoading({
        initialDelay: 50,
        minDuration: 100,
        maxDuration: 800,
        autoStart: true
    });

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

        fetchPageData();
    }, [stopLoading])

    return (
        <Fragment>
            <LoadingOverlay isLoading={isLoading} dark={dark} />
            <section className="w-full h-auto flex flex-col gap-10" aria-label="contact page">
                <ConnectWithUs dark={dark} />
                <ContactForm dark={dark} />
                <ToTop dark={dark} />
            </section>
        </Fragment>
    )
}

ContactUs.propTypes = {
    dark: PropTypes.bool,
}

export default ContactUs;