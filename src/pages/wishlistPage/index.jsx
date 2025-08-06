import { Fragment, useEffect, useState } from 'react';
import Header from "../../components/header";
import { WISHLIST_HEADER as header } from "../../config/configData";
import Wishlist from "../../layout/wishlist-layout";
import PropTypes from 'prop-types';
import { failLoadData as message } from "../../config/configData";
import { usePageLoading } from '../../hooks/usePageLoading';
import LoadingOverlay from '../../components/loadingOverlay';

const WishlistPage = ({ dark }) => {
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

        fetchPageData()
    }, [stopLoading])

    return (
        <Fragment>
            <LoadingOverlay isLoading={isLoading} dark={dark} />
            <main className='w-full h-auto flex flex-col'>
                <Header
                    ariaLabel="Wishlist header"
                    title={header.title}
                    description={header.description}
                    dark={dark}
                />
                <section className="w-full h-auto" aria-labelledby="Wishlist content">
                    <div id="Wishlist content">
                        <Wishlist dark={dark} />
                    </div>
                </section>
            </main>
        </Fragment>
    )
};

WishlistPage.propTypes = {
    dark: PropTypes.bool
}

export default WishlistPage;