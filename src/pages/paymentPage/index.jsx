import { Fragment, useEffect, useState } from 'react';
import Header from "../../components/header";
import { PAYMENT_HEADER as header } from "../../config/configData";
import Payment from "../../components/payment";
import ToTop from "../../UI/toTop";
import PropTypes from 'prop-types';
import { failLoadData as message } from '../../config/configData';
import { usePageLoading } from '../../hooks/usePageLoading';
import LoadingOverlay from '../../components/loadingOverlay';

const PaymentGateway = ({ dark }) => {
    const [, setPageData] = useState(null);
    const { isLoading, stopLoading } = usePageLoading({
        initialDelay: 50,
        minDuration: 300,
        maxDuration: 1200,
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

        fetchPageData();
    }, [stopLoading])

    return (
        <Fragment>
            <LoadingOverlay isLoading={isLoading} dark={dark} />
            <main className='w-full h-auto flex flex-col gap-10'>
                <Header
                    ariaLabel='payment gateway header'
                    dark={dark}
                    title={header.title}
                    tagline='payment'
                />
                <section className='pb-24' aria-labelledby='payment gateway content'>
                    <div id='payment gateway content'>
                        <Payment dark={dark} />
                    </div>
                    <ToTop dark={dark} />
                </section>
            </main>
        </Fragment>
    )
};

PaymentGateway.propTypes = {
    dark: PropTypes.bool
};

export default PaymentGateway;
