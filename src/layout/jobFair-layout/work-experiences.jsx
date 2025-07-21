import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import WorkExperiencesDetail from './work-experiences-detail';

const WorkExperiences = ({ dark, jobFairForm, setJobFairForm }) => {
    const [workExperiences, setWorkExperiences] = useState([{ id: Date.now() }]);

    // Optimized handle for work experiences
    const handleWorkExperience = useCallback((index, field, value) => {
        setJobFairForm(prev => {
            const updatedWorkExperiences = [...prev.workExperiences];

            // Make sure the index exists
            if (!updatedWorkExperiences[index]) {
                updatedWorkExperiences[index] = {};
            };

            // Update the specific field
            updatedWorkExperiences[index] = {
                ...updatedWorkExperiences[index],
                [field]: value
            };

            return {
                ...prev,
                workExperiences: updatedWorkExperiences
            }
        });
    }, [setJobFairForm]);

    const addWorkExperiences = (e) => {
        e.preventDefault();

        setWorkExperiences([...workExperiences, { id: Date.now() }]);
    };

    const removeWorkExperience = (index) => {
        const updatedExperiences = [...workExperiences];

        updatedExperiences.splice(index, 1);
        setWorkExperiences(updatedExperiences);
    };

    const renderWorkExperiencesDetail = () => {
        return (
            <>
                {workExperiences.map((experience, index) => (
                    <div key={experience.id} className='relative'>
                        <WorkExperiencesDetail
                            dark={dark}
                            index={index}
                            experience={jobFairForm.workExperiences[index] || {}}
                            handleWorkExperience={handleWorkExperience}
                            showRemoveButton={workExperiences.length > 1}
                            onRemove={() => removeWorkExperience(index)}
                        />
                    </div>
                ))}
                <button
                    className='w-fit mx-auto h-auto py-2 px-4 rounded-md text-white font-medium bg-zinc-400 hover:bg-zinc-500/80'
                    onClick={addWorkExperiences}
                >
                    + Add More Experience
                </button>
            </>
        )
    }

    return (
        <main className='w-full h-auto flex flex-col gap-8'>
            <h1 className={`text-3xl font-semibold ${dark ? "text-secondary" : "text-primary"}`}>Work Experiences (If any)</h1>
            {renderWorkExperiencesDetail()}
        </main>
    )
};

WorkExperiences.propTypes = {
    dark: PropTypes.bool,
    jobFairForm: PropTypes.object.isRequired,
    setJobFairForm: PropTypes.func.isRequired
}

export default WorkExperiences;