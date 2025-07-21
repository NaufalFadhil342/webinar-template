import PropTypes from 'prop-types';
import Header from '../../components/header';
import Topics from '../../layout/supportCenter-layout/topics';
import ToTop from '../../UI/toTop';
import Help from '../../layout/supportCenter-layout/help';
import Support from '../../layout/supportCenter-layout/support';
import ConnectWithUs from '../../layout/connectWithUs-layout';
import { SUPPORT_HEADER } from '../../config/configData';

const SupportPage = ({ dark }) => {

    return (
        <main className='w-full h-auto flex flex-col gap-10' aria-label="Support page">
            <Header
                title={SUPPORT_HEADER.title}
                description={SUPPORT_HEADER.description}
                dark={dark}
                ariaLabel='support center'
            />
            <section aria-labelledby="support-content">
                <div id="support-content">
                    <Topics dark={dark} />
                    <Help dark={dark} />
                    <Support dark={dark} />
                    <ConnectWithUs dark={dark} />
                </div>
                <ToTop dark={dark} />
            </section>
        </main>
    )
};

SupportPage.propTypes = {
    dark: PropTypes.bool
};

export default SupportPage;
