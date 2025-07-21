import ToTop from "../../UI/toTop";
import PropTypes from 'prop-types';
import JobFairForm from "./jobFair-form";

const JobFairPage = ({ dark }) => {
    return (
        <main className="w-full h-auto" aria-label="Job fair page">
            <section className="w-full h-auto" aria-label="Job fair content">
                <JobFairForm dark={dark} />
            </section>
            <ToTop dark={dark} />
        </main>
    )
};

JobFairPage.propTypes = {
    dark: PropTypes.bool
}

export default JobFairPage;