import { Fragment, useCallback, useEffect, useState } from 'react';
import Header from '../../components/header';
import SupportingBy from '../../layout/supportingBy-layout';
import Testimonials from '../../layout/testimonial-layout';
import PropTypes from 'prop-types';
import ToTop from '../../UI/toTop';
import { TESTIMONIALS_HEADER } from '../../config/configData';
import { failLoadData as message } from '../../config/configData';
import { usePageLoading } from '../../hooks/usePageLoading';
import LoadingOverlay from '../../components/loadingOverlay';

const TestimonialsPage = ({ dark }) => {
    const [, setPageData] = useState(null);
    const { isLoading, stopLoading } = usePageLoading({
        initialDelay: 50,
        minDuration: 200,
        maxDuration: 1000,
        autoStart: true
    })

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
            <main className='w-full h-auto flex flex-col gap-10' aria-label='Testimonials Page'>
                <Header
                    title={TESTIMONIALS_HEADER.title}
                    description={TESTIMONIALS_HEADER.description}
                    ariaLabel='testimonials header'
                    dark={dark}
                />
                <section aria-labelledby='testimonials-content'>
                    <div id='testimonials-content'>
                        <Testimonials dark={dark} />
                        <SupportingBy dark={dark} />
                    </div>
                    <ToTop dark={dark} />
                </section>
            </main>
        </Fragment>
    )
};

TestimonialsPage.propTypes = {
    dark: PropTypes.bool
}

export default TestimonialsPage;