import PropTypes from 'prop-types';

const earnJobOption = [
    { jobOption: 'Job Board' },
    { jobOption: 'Company Website' },
    { jobOption: 'LinkedIn' },
    { jobOption: 'Employee Referral' },
    { jobOption: 'Social Media' },
    { jobOption: 'Company Website' },
    { jobOption: 'University/College' },
    { jobOption: 'Career Fair' },
    { jobOption: 'Other' }
]

const AdditionalInfo = ({ dark, handleJobFair, jobFairForm }) => {
    return (
        <main className="w-full h-auto flex flex-col gap-8">
            <h1 className={`text-3xl font-semibold ${dark ? "text-secondary" : "text-primary"}`}>Additional Information</h1>
            <section className="w-full h-auto">
                <label htmlFor="introduction" className={dark ? "font-medium text-white" : "font-medium text-zinc-900"}>Cover Letter / Introduction</label>
                <textarea
                    name="introduction"
                    id="introduction"
                    className={`w-full h-32 p-2 mt-2 border-b-2 outline-none bg-transparent ${dark ? "border-zinc-300 text-zinc-300 focus:border-secondary" : "border-zinc-600 text-zinc-600 focus:border-primary"}`}
                    placeholder="Tell us summarize about yourself and why you're interested in this position..."
                    value={jobFairForm.introduction}
                    onChange={handleJobFair}
                />
            </section>
            <section className='w-full h-auto'>
                <label htmlFor="portfolio" className={dark ? "font-medium text-white" : "font-medium text-zinc-900"}>Portfolio / Website Link</label>
                <input
                    type="text"
                    placeholder='https://example.com'
                    id='portfolio'
                    className={`w-full h-12 px-2 mt-2 border-b-2 outline-none bg-transparent ${dark ? "border-zinc-300 text-zinc-300 focus:border-secondary" : "border-zinc-600 text-zinc-600 focus:border-primary"}`}
                    name='portfolio'
                    value={jobFairForm.portfolio}
                    onChange={handleJobFair}
                />
            </section>
            <section className='w-full h-auto'>
                <label htmlFor="linkedInProfile" className={dark ? "font-medium text-white" : "font-medium text-zinc-900"}>Linkedin Profile</label>
                <input
                    type="text"
                    placeholder='https://linkedin.com/yourprofile'
                    id='linkedInProfile'
                    className={`w-full h-12 px-2 mt-2 border-b-2 outline-none bg-transparent ${dark ? "border-zinc-300 text-zinc-300 focus:border-secondary" : "border-zinc-600 text-zinc-600 focus:border-primary"}`}
                    name='linkedInProfile'
                    value={jobFairForm.linkedInProfile}
                    onChange={handleJobFair}
                />
            </section>
            <section className='w-full h-auto'>
                <label htmlFor="githubProfile" className={dark ? "font-medium text-white" : "font-medium text-zinc-900"}>Github Profile (for technical positions)</label>
                <input
                    type="text"
                    placeholder='https://github.com/yourusername'
                    id='githubProfile'
                    className={`w-full h-12 px-2 mt-2 border-b-2 outline-none bg-transparent ${dark ? "border-zinc-300 text-zinc-300 focus:border-secondary" : "border-zinc-600 text-zinc-600 focus:border-primary"}`}
                    name='githubProfile'
                    value={jobFairForm.githubProfile}
                    onChange={handleJobFair}
                />
            </section>
            <section className='w-full h-auto'>
                <label htmlFor="earnJob" className={dark ? "font-medium text-white" : "font-medium text-zinc-900"}>How did you hear about us?</label>
                <select name="earnJob" id="earnJob" className={`w-full h-12 px-2 border-b-2 bg-transparent outline-none ${dark ? "text-zinc-300 border-zinc-300 focus:border-secondary" : "text-zinc-600 border-zinc-600 focus:border-primary"}`} value={jobFairForm.earnJob} onChange={handleJobFair}>
                    <option value="" className={dark ? "bg-zinc-700" : "bg-white"} disabled>Select an option</option>
                    {earnJobOption.map((earn, index) => (
                        <option value={earn.jobOption} key={index} className={dark ? "bg-zinc-700" : 'bg-white'}>{earn.jobOption}</option>
                    ))}
                </select>
            </section>
        </main>
    )
};

AdditionalInfo.propTypes = {
    dark: PropTypes.bool,
    jobFairForm: PropTypes.object.isRequired,
    handleJobFair: PropTypes.func.isRequired
}

export default AdditionalInfo;