import UserAuth from "../../auth/userAuth";
import PropTypes from 'prop-types';
import ToTop from "../../UI/toTop";

const RegisterPage = ({ dark }) => {
    return (
        <main className="w-full h-auto" aria-label="Register page">
            <section className="w-full h-auto" aria-label="Register content">
                <UserAuth dark={dark} />
            </section>
            <ToTop dark={dark} />
        </main>
    )
};

RegisterPage.propTypes = {
    dark: PropTypes.bool
};

export default RegisterPage;