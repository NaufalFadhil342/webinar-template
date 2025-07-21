import Header from "../../components/header";
import FAQs from "../../layout/faqs-layout";
import PropTypes from 'prop-types';
import ToTop from "../../UI/toTop";
import { FAQS_HEADER } from '../../config/configData';

const FaqPage = ({ dark }) => {

    return (
        <main className="w-full h-auto flex flex-col gap-10" aria-label="Frequently Asked Questions">
            <Header
                title={FAQS_HEADER.title}
                description={FAQS_HEADER.description}
                tagline='FAQs'
                ariaLabel="FAQ Header"
                dark={dark}
            />
            <section aria-labelledby="FAQs-section">
                <div id="FAQs-section">
                    <FAQs dark={dark} />
                </div>
                <ToTop dark={dark} />
            </section>
        </main>
    )
};


FaqPage.propTypes = {
    dark: PropTypes.bool.isRequired
}


export default FaqPage;
