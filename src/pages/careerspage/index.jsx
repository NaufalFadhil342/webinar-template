import PropTypes from 'prop-types';
import Header from '../../components/header';
import Careers from '../../layout/careers-layout';
import Discover from '../../layout/discover-layout';
import CallToAction from "../../layout/callToAction-layout";
import ToTop from '../../UI/toTop';
import { CAREERS_HEADER } from '../../config/configData';

const CareersPage = ({ dark }) => {

    return (
        <main className="w-full h-auto flex flex-col gap-10">
            <Header
                ariaLabel='Careers page header'
                dark={dark}
                description={CAREERS_HEADER.description}
                title={CAREERS_HEADER.title}
            />
            <section aria-labelledby='careers-content'>
                <div id='careers-content'>
                    <Careers dark={dark} />
                    <Discover dark={dark} />
                    <CallToAction dark={dark} />
                </div>
                <ToTop dark={dark} />
            </section>
        </main>
    )
};

CareersPage.propTypes = {
    dark: PropTypes.bool.isRequired
};

export default CareersPage;
