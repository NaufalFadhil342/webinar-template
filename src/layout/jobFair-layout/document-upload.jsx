import PropTypes from 'prop-types';

const DocumentUpload = ({ dark, jobFairForm, handleJobFair, errors }) => {

    return (
        <main className="w-full h-auto flex flex-col gap-8">
            <div className='w-full h-auto flex flex-col gap-8'>
                <h1 className={`text-3xl font-semibold ${dark ? "text-secondary" : "text-primary"}`}>Document Upload</h1>
                <section className='w-full h-auto'>
                    <label htmlFor="resume" className={`after:content-['*'] after:ml-1 after:text-red-500 ${dark ? "text-white font-medium" : "text-zinc-900 font-medium"}`}>Resume/CV (PDF or Word)</label>
                    <input
                        type="file"
                        id='resume'
                        name='resume'
                        accept='.pdf, .docx, .doc'
                        className="w-full h-auto py-3 mt-2 border border-zinc-300 text-zinc-600"
                        onChange={handleJobFair}
                    />
                    {errors.resume && <p className='text-red-500'>{errors.resume}</p>}
                    {jobFairForm.resume && (
                        <p className='text-zinc-700 mt-2'>
                            File selected: {jobFairForm.resume.name}
                            {jobFairForm.resume.size && `(${(jobFairForm.resume.size / 1024).toFixed(2)} KB)`}
                        </p>
                    )}
                </section>
                <section className='w-full h-auto'>
                    <label htmlFor="coverLetter" className={dark ? "text-white font-medium" : "text-zinc-900 font-medium"}>Cover Letter</label>
                    <input
                        type="file"
                        id='coverLetter'
                        name='coverLetter'
                        accept='.pdf'
                        className="w-full h-auto py-3 mt-2 border border-zinc-300 text-zinc-600"
                        onChange={handleJobFair}
                    />
                    {jobFairForm.coverLetter &&
                        <p className='text-zinc-700 mt-2'>
                            File selected: {jobFairForm.coverLetter.name}
                            {jobFairForm.coverLetter.size && `(${(jobFairForm.coverLetter.size / 1024).toFixed(2)} KB)`}
                        </p>
                    }
                </section>
            </div>
            <div className='w-full h-auto flex flex-col gap-8'>
                <h1 className={`text-3xl font-semibold ${dark ? "text-secondary" : "text-primary"}`}>Consent & Submit</h1>
                <div className='w-full h-auto flex flex-col gap-6'>
                    <span className='flex items-center gap-2'>
                        <input
                            type="checkbox"
                            name='consent'
                            className={dark ? 'border border-zinc-300' : 'border border-zinc-600'}
                            checked={jobFairForm.consent}
                            onChange={handleJobFair}
                        />
                        <p className={`after:content-['*'] after:ml-2 after:text-red-500 ${dark ? "text-white font-medium" : "text-zinc-900 font-medium"}`}>I consent to the processing of my personal data in accordance with the Privacy Policy.</p>
                    </span>
                    <span className='flex items-center gap-2'>
                        <input
                            type="checkbox"
                            name='confirmation'
                            className={dark ? 'border border-zinc-300' : 'border border-zinc-600'}
                            checked={jobFairForm.confirmation}
                            onChange={handleJobFair}
                        />
                        <p className={`after:content-['*'] after:ml-2 after:text-red-500 ${dark ? "text-white font-medium" : "text-zinc-900 font-medium"}`}>I confirm that the information provided in this application is true and accurate.</p>
                    </span>
                    <span className='flex items-center gap-2'>
                        <input
                            type="checkbox"
                            className={dark ? 'border border-zinc-300' : 'border border-zinc-600'}
                        />
                        <p className={dark ? "text-white font-medium" : "text-zinc-900 font-medium"}>I would like to be considered for other relevant positions in the future</p>
                    </span>
                </div>
            </div>
        </main>
    )
};

DocumentUpload.propTypes = {
    dark: PropTypes.bool,
    jobFairForm: PropTypes.object.isRequired,
    handleJobFair: PropTypes.func.isRequired,
    errors: PropTypes.object
}

export default DocumentUpload;