import PropTypes from 'prop-types';

const SkillQualified = ({ dark, jobFairForm, handleJobFair }) => {
    return (
        <main className="w-full h-auto flex flex-col gap-8">
            <h1 className={`text-3xl font-semibold ${dark ? "text-secondary" : "text-primary"}`}>Skills & Qualifications</h1>
            <section className="w-full h-auto">
                <label htmlFor="skill" className={dark ? "font-semibold text-white" : "font-semibold text-zinc-900"}>Professional Skills (Seperate with commas)</label>
                <input
                    type="text"
                    id="skill"
                    placeholder="e.g. JavaScript, Project Menagement, Photoshop"
                    className={`w-full h-12 inline-block px-2 mt-2 bg-transparent outline-none border-b-2 ${dark ? "text-zinc-300 border-zinc-300 focus:border-secondary" : "text-zinc-600 border-zinc-600 focus:border-primary"}`}
                    name='skill'
                    value={jobFairForm.skill}
                    onChange={handleJobFair}
                />
            </section>
            <section className="w-full h-auto">
                <label htmlFor="language" className={dark ? "font-semibold text-white" : "font-semibold text-zinc-900"}>Languages</label>
                <input
                    type="text"
                    id="language"
                    placeholder="e.g. Indonesia (Fluent), Inglish (Intermediate)"
                    className={`w-full h-12 inline-block px-2 mt-2 bg-transparent outline-none border-b-2 ${dark ? "text-zinc-300 border-zinc-300 focus:border-secondary" : "text-zinc-600 border-zinc-600 focus:border-primary"}`}
                    name='language'
                    value={jobFairForm.language}
                    onChange={handleJobFair}
                />
            </section>
            <section className="w-full h-auto">
                <label htmlFor="certificate" className={dark ? "font-semibold text-white" : "font-semibold text-zinc-900"}>Certifications (Seperate with commas)</label>
                <input
                    type="text"
                    id="certificate"
                    placeholder="e.g. AWS Certified, PMP, Scrum Master"
                    className={`w-full h-12 inline-block px-2 mt-2 bg-transparent outline-none border-b-2 ${dark ? "text-zinc-300 border-zinc-300 focus:border-secondary" : "text-zinc-600 border-zinc-600 focus:border-primary"}`}
                    name='certificate'
                    value={jobFairForm.certificate}
                    onChange={handleJobFair}
                />
            </section>
        </main>
    )
};

SkillQualified.propTypes = {
    dark: PropTypes.bool,
    jobFairForm: PropTypes.object.isRequired,
    handleJobFair: PropTypes.func.isRequired
}

export default SkillQualified;