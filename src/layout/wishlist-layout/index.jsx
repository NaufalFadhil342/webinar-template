import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import WishlistDetail from "./wishlistDetail";
import PropTypes from 'prop-types';

const Wishlist = ({ dark }) => {
    const { isAuthenticated } = useAuth();

    return (
        <section className="w-full h-auto px-[8%]">
            {isAuthenticated ? (
                <div className="w-full h-auto">
                    <WishlistDetail dark={dark} />
                </div>
            ) : (
                <div className="w-full h-auto flex flex-col items-center pb-24">
                    <h1 className="text-center font-semibold text-zinc-900 text-[2em]">Login or Sign Up to Get Access to Your Wishlist</h1>
                    <Link to='/register' className="w-fit h-12 px-4 mt-6 flex items-center bg-primary text-white hover:bg-darkPrimary rounded-md transition-all duration-150 ease-in-out">Register</Link>
                </div>
            )}
        </section>
    )
};

Wishlist.propTypes = {
    dark: PropTypes.bool
}

export default Wishlist;