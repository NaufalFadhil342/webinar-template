import ConnectWithUs from "../../layout/connectWithUs-layout";
import ToTop from "../../UI/toTop";
import ContactForm from "./contactForm";
import PropTypes from 'prop-types'

const ContactUs = ({ dark }) => {
    return (
        <section className="w-full h-auto flex flex-col gap-10" aria-label="contact page">
            <ConnectWithUs dark={dark} />
            <ContactForm dark={dark} />
            <ToTop dark={dark} />
        </section>
    )
}

ContactUs.propTypes = {
    dark: PropTypes.bool,
}

export default ContactUs;