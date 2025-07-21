import { useState } from 'react';
import PropTypes from 'prop-types';
import EducationDetail from './education-detail';
import { formValidation } from '../../utils/formValidation';

const Education = ({
    dark,
    jobFairForm,
    setJobFairForm,
    defaultStateValidationRules,
    errors,
    setErrors
}) => {
    const [addEducation, setAddEducation] = useState([{ id: Date.now() }]);

    // Optimized handle for education
    const handleEducation = (index, field, value) => {
        setJobFairForm(prev => {
            const updatedEducation = [...prev.education];

            // Make sure the index exists
            if (!updatedEducation[index]) {
                updatedEducation[index] = {}
            };

            // update the specific field
            updatedEducation[index] = {
                ...updatedEducation[index],
                [field]: value
            };

            const updatedForm = {
                ...prev,
                education: updatedEducation
            };

            // Validate all education field after any change
            const validationErrors = formValidation(updatedForm, defaultStateValidationRules);

            setErrors(validationErrors);

            return updatedForm;
        })
    };

    const handleAddEducation = (e) => {
        e.preventDefault();

        setAddEducation([...addEducation, { id: Date.now() }]);
    };

    const removeEducation = (index) => {
        const updatedEducation = [...addEducation];

        updatedEducation.splice(index, 1);
        setAddEducation(updatedEducation);
    };

    const renderEducationDetail = () => {
        return (
            <>
                {addEducation.map((education, index) => (
                    <div key={education.id}>
                        <EducationDetail
                            dark={dark}
                            index={index}
                            education={jobFairForm.education[index] || {}}
                            handleEducation={handleEducation}
                            showRemoveButton={addEducation.length > 1}
                            onRemove={() => removeEducation(index)}
                            errors={errors}
                        />
                    </div>
                ))}
                <button className={`w-fit mx-auto h-auto py-2 px-4 rounded-md text-white font-medium bg-zinc-400 hover:bg-zinc-500/80`} onClick={handleAddEducation}>+ Add More Education</button>
            </>
        )
    };

    return (
        <main className="w-full h-auto flex flex-col gap-6">
            <h1 className={`text-3xl font-semibold ${dark ? "text-secondary" : "text-primary"}`}>Education</h1>
            {renderEducationDetail()}
        </main>
    )
};

Education.propTypes = {
    dark: PropTypes.bool,
    jobFairForm: PropTypes.object,
    setJobFairForm: PropTypes.func,
    defaultStateValidationRules: PropTypes.object,
    errors: PropTypes.object,
    setErrors: PropTypes.func
}

export default Education;