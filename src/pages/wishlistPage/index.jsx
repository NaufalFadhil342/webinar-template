import Header from "../../components/header";
import { WISHLIST_HEADER as header } from "../../config/configData";
import Wishlist from "../../layout/wishlist-layout";
import PropTypes from 'prop-types';

const WishlistPage = ({ dark }) => {
    return (
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
    )
};

WishlistPage.propTypes = {
    dark: PropTypes.bool
}

export default WishlistPage;