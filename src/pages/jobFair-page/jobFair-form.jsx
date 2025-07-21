import PropTypes from 'prop-types';
import JobFairFormDetail from './jobFair-formDetail';

const JobFairForm = ({ dark }) => {

    return (
        <section className='w-full h-full py-24 px-[8%] flex flex-col gap-12'>
            <h1 className={`${dark ? "text-white" : 'text-zinc-900'} uppercase font-bold text-center text-5xl`}>Job Application</h1>
            <JobFairFormDetail dark={dark} />
        </section>
    )
};

JobFairForm.propTypes = {
    dark: PropTypes.bool
};

export default JobFairForm;