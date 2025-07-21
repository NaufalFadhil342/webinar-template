import Header from "../../components/header";
import { COMMUNITY_HEADER } from "../../config/configData";
import ToTop from "../../UI/toTop";
import PropTypes from 'prop-types';
import Discuss from "../../layout/discuss-layout";

const CommunityPage = ({ dark }) => {
    return (
        <main className="w-full h-auto flex flex-col gap-10">
            <Header
                dark={dark}
                title={COMMUNITY_HEADER.title}
                description={COMMUNITY_HEADER.description}
                tagline="Discuss"
                ariaLabel="Community Header Section"
            />
            <section aria-labelledby="community-content">
                <div id="community-content">
                    <Discuss dark={dark} />
                </div>
                <ToTop dark={dark} />
            </section>
        </main>
    );
};

CommunityPage.propTypes = {
    dark: PropTypes.bool
};

export default CommunityPage;