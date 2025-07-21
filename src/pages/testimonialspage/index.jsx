import Header from '../../components/header';
import SupportingBy from '../../layout/supportingBy-layout';
import Testimonials from '../../layout/testimonial-layout';
import PropTypes from 'prop-types';
import ToTop from '../../UI/toTop';
import { TESTIMONIALS_HEADER } from '../../config/configData';

const TestimonialsPage = ({ dark }) => {

    return (
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
    )
};

TestimonialsPage.propTypes = {
    dark: PropTypes.bool
}

export default TestimonialsPage;