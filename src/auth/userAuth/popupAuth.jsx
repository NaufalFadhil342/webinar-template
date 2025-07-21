import PropTypes from 'prop-types';

const PopupAuth = ({ children, dark }) => {
    // set the popup with your API here. 

    return (
        <button className={`w-full h-auto py-3 flex items-center justify-center gap-3 bg-transparent border rounded-md transition-all duration-150 ${dark ? "hover:bg-secondary border-white hover:border-secondary text-white" : "hover:bg-primary border-zinc-700 hover:border-primary text-zinc-600 hover:text-white"}`}>{children}</button>
    )
};

PopupAuth.propTypes = {
    dark: PropTypes.bool,
    children: PropTypes.node.isRequired,
}

export default PopupAuth;