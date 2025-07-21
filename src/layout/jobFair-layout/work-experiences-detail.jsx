import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js';

const WorkExperiencesDetail = ({
    dark,
    index,
    experience,
    handleWorkExperience,
    showRemoveButton,
    onRemove
}) => {

    const handleChange = (e) => {
        const { name, value } = e.target;
        handleWorkExperience(index, name, value);
    };

    return (
        <div className='w-full h-auto flex flex-col gap-8 relative'>
            {showRemoveButton && (
                <button
                    className='absolute top-0 right-0 text-red-500 hover:text-red-700'
                    type='button'
                    onClick={onRemove}
                >
                    <Icon path={mdiDelete} size={1} />
                </button>
            )}
            <section className='w-full h-auto flex items-center gap-6'>
                <div className='w-full h-auto'>
                    <label htmlFor={`company-${index}`} className={dark ? "text-white font-medium" : "text-zinc-900 font-medium"}>Company Name</label>
                    <input
                        type="text"
                        id={`company-${index}`}
                        name='company'
                        value={experience.company || ''}
                        onChange={handleChange}
                        className={`w-full h-12 mt-2 flex items-center px-2 bg-transparent outline-none border-b-2 ${dark ? "border-zinc-300 text-zinc-300 focus:border-secondary" : "border-zinc-600 text-zinc-600 focus:border-primary"}`}
                    />
                </div>
                <div className='w-full h-auto'>
                    <label htmlFor={`jobTitle-${index}`} className={dark ? "text-white font-medium" : "text-zinc-900 font-medium"}>Job Title</label>
                    <input
                        type="text"
                        id={`jobTitle-${index}`}
                        name='jobTitle'
                        value={experience.jobTitle || ''}
                        onChange={handleChange}
                        className={`w-full h-12 mt-2 flex items-center px-2 bg-transparent outline-none border-b-2 ${dark ? "border-zinc-300 text-zinc-300 focus:border-secondary" : "border-zinc-600 text-zinc-600 focus:border-primary"}`}
                    />
                </div>
            </section>
            <section className='w-full h-auto flex items-center gap-6'>
                <div className='w-full h-auto'>
                    <label htmlFor={`startDate-${index}`} className={dark ? "text-white font-medium" : "text-zinc-900 font-medium"}>Start Date</label>
                    <input
                        type="month"
                        id={`startDate-${index}`}
                        name='startDate'
                        value={experience.startDate || ''}
                        onChange={handleChange}
                        className={`w-full h-12 mt-2 px-2 bg-transparent outline-none border-b-2 ${dark ? "border-zinc-300 text-zinc-300 focus:border-secondary" : "border-zinc-600 text-zinc-600 focus:border-primary"}`}
                    />
                </div>
                <div className='w-full h-auto'>
                    <label htmlFor={`endDate-${index}`} className={dark ? "text-white font-medium" : "text-zinc-900 font-medium"}>End Date</label>
                    <input
                        type="month"
                        id={`endDate-${index}`}
                        name='endDate'
                        value={experience.endDate || ''}
                        onChange={handleChange}
                        className={`w-full h-12 mt-2 px-2 bg-transparent outline-none border-b-2 ${dark ? "border-zinc-300 text-zinc-300 focus:border-secondary" : "border-zinc-600 text-zinc-600 focus:border-primary"}`}
                    />
                </div>
            </section>
            <section className='w-full h-auto'>
                <label htmlFor={`jobExplain-${index}`} className={dark ? "text-white font-medium" : "text-zinc-900 font-medium"}>Responsibilities & Achievements</label>
                <textarea
                    name={`jobExplain-${index}`}
                    id="jobExplain"
                    value={experience.jobExplain || ''}
                    onChange={handleChange}
                    className={`w-full h-32 mt-2 p-2 bg-transparent outline-none border-b-2 ${dark ? "border-zinc-300 text-zinc-300 focus:border-secondary" : "border-zinc-600 text-zinc-600 focus:border-primary"}`}
                    placeholder='Explain briefly about your job'
                />
            </section>
        </div>
    )
};

WorkExperiencesDetail.propTypes = {
    dark: PropTypes.bool,
    index: PropTypes.number,
    experience: PropTypes.object.isRequired,
    handleWorkExperience: PropTypes.func.isRequired,
    showRemoveButton: PropTypes.any,
    onRemove: PropTypes.func
}

export default WorkExperiencesDetail;