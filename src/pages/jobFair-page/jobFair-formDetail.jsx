/** 
 * In this component we create multiple form style.
*/

import React, { useCallback, useEffect, useState, useMemo } from 'react';
import Form from '../../UI/form';
import PropTypes from 'prop-types';
import { formValidation } from '../../utils/formValidation';
import FormStepRenderer from './formStep-render';

const defaultState = {
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    workExperiences: [],
    education: [],
    skill: '',
    language: '',
    certificate: '',
    introduction: '',
    portfolio: '',
    linkedInProfile: '',
    githubProfile: '',
    earnJob: '',
    resume: '',
    coverLetter: '',
    consent: false,
    confirmation: false
};

// In real app, this validation rules should be stored in the server.
const defaultStateValidationRules = {
    fullName: { required: true, type: 'text' },
    email: { required: true, type: 'email' },
    phoneNumber: { required: true, type: 'tel' },
    country: { required: true },
    education: {
        instituteName: { required: true, type: 'text' },
        gradDate: { required: true }
    },
    resume: {
        required: true,
        type: 'file',
        fileTypes: ['pdf', 'doc', 'docx'],
        maxSize: 3 * 1024 * 1024
    },
    consent: { required: true },
    confirmation: { required: true }
};

const JobFairFormDetail = ({ dark }) => {
    const [jobFairForm, setJobFairForm] = useState(defaultState);
    const [errors, setErrors] = useState({});
    const [currentStep, setCurrentStep] = useState(1);
    const [isCurrentStepValid, setIsCurrentStepValid] = useState(false);

    // Define which fields are required for each step
    const stepRequiredFields = useMemo(() => ({
        1: ['fullName', 'email', 'phoneNumber', 'country'],
        3: ['instituteName', 'gradDate'],
        5: ['resume', 'consent', 'confirmation']
    }), []);

    const handleJobFair = useCallback((e) => {
        let name, value;

        // Handle file input
        if (e.target.type === 'file') {
            name = e.target.name;
            value = e.target.files[0] || null;
        } else {
            name = e.target.name;
            value = e.target.value;
        }

        // Using functional updates to ensure we're working with the latest state
        if (name.includes('.')) {
            const [section, field] = name.split('.');

            setJobFairForm(prev => {
                const updatedForm = {
                    ...prev,
                    [section]: { ...prev[section], [field]: value }
                };

                // calculate validation errors with the updated form 
                const errorsField = formValidation(updatedForm, defaultStateValidationRules)[name];

                // Update errors in a separate setErrors call
                setErrors(prevErrors => ({
                    ...prevErrors,
                    [name]: errorsField || undefined
                }));

                return updatedForm;
            });
        } else {
            setJobFairForm(prev => {
                const updatedForm = { ...prev, [name]: value };

                // Calculate validation errors with the updated form
                const errorsField = formValidation(updatedForm, defaultStateValidationRules)[name];

                // Updated errors in a seperate setErrors call
                setErrors(prevErrors => ({
                    ...prevErrors,
                    [name]: errorsField || undefined
                }));

                return updatedForm;
            });
        };
    }, []);

    const handleJobFairSubmit = useCallback((e) => {
        e.preventDefault();

        // validate all field before submission
        const allErrors = formValidation(jobFairForm, defaultStateValidationRules);
        setErrors(allErrors);

        // check if there are any errors
        const hasErrors = Object.keys(allErrors).length > 0;

        if (!hasErrors) {
            // create FormData for file upload
            const formData = new FormData();

            // add all simple fields
            Object.keys(jobFairForm).forEach(key => {
                if (key !== 'workExperiences' && key !== 'education' && key !== 'resume' && key !== 'coverLetter') {
                    formData.append(key, jobFairForm[key]);
                }
            });

            // add file
            if (jobFairForm.resume) {
                formData.append('resume', jobFairForm.resume)
            };

            if (jobFairForm.coverLetter) {
                formData.append('coverLetter', jobFairForm.coverLetter)
            };

            // add complex fields as JSON strings
            formData.append('workExperiences', JSON.stringify(jobFairForm.workExperiences));
            formData.append('education', JSON.stringify(jobFairForm.education));

            // submit the form (replace with actual API endpoint)
            // fetch('api/submit-job-fair', {
            //     method: 'POST',
            //     body: formData
            // })
            //     .then(response => response.json())
            //     .then(data => {
            //         console.log('Success:', data);
            //     })
            //     .catch(error => {
            //         console.error('Error:', error);
            //     });

            const fetchData = Object.fromEntries(formData);
            console.log('formData:', fetchData);
        };
    }, [jobFairForm])

    const nextStep = (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });

        setCurrentStep(prev => prev + 1);
    };

    const prevStep = (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' })

        setCurrentStep(prev => prev - 1);
    };

    // validation logic for current step
    const validateCurrentStep = useCallback(() => {
        const requiredFields = stepRequiredFields[currentStep] || [];

        // If no required field for this step, it's automatically valid
        if (requiredFields.length === 0) {
            setIsCurrentStepValid(true);
            return;
        };

        // Special handling for edacation step
        if (currentStep === 3) {
            // First, ensure we have at least one education entry
            if (!jobFairForm.education || jobFairForm.education.length === 0) {
                setIsCurrentStepValid(false);
                return;
            };

            // Then, validate each education entry for required fields
            const isEducationValid = jobFairForm.education.every((edu, index) => {
                // Check if required fields exist and have value
                const hasInstituteValue = edu.instituteName && edu.instituteName.trim() !== '';
                const hasGradDateValue = edu.gradDate && edu.gradDate.trim() !== '';

                // Check if there are no errors for these fields
                const noInstituteError = !errors[`education[${index}].instituteName`];
                const noGradDateError = !errors[`education[${index}].gradDate`];

                return hasInstituteValue && hasGradDateValue && noInstituteError && noGradDateError;
            });

            setIsCurrentStepValid(isEducationValid);
            return;
        } else if (currentStep === 5) {
            const isValid = requiredFields.every(field => {
                // for file fields, check if they exist (File objects)
                const hasValue = !!jobFairForm[field];
                // Field has no validation errors
                const hasNoErrors = !errors[field];

                return hasValue && hasNoErrors;
            });

            setIsCurrentStepValid(isValid);
            return;
        } else {
            const isValid = requiredFields.every(field => {
                // Check value based on type
                let hasValue = false;

                if (jobFairForm[field] === undefined || jobFairForm[field] === null) {
                    hasValue = false;
                } else if (typeof jobFairForm[field] === 'string') {
                    hasValue = jobFairForm[field].trim() !== '';
                } else {
                    // For non-string values (like File objects), just check existence
                    hasValue = !!jobFairForm[field];
                };

                const hasNoErrors = !errors[field];

                return hasValue && hasNoErrors;
            });

            setIsCurrentStepValid(isValid);
        };

    }, [currentStep, errors, jobFairForm, stepRequiredFields]);

    useEffect(() => {
        validateCurrentStep();
    }, [validateCurrentStep]);

    // Determine button styling once to avoit repetition
    const buttonClasses = `w-fit h-10 flex items-center px-4 rounded-md text-white transition-all duration-150 ${dark ? "bg-secondary hover:bg-darkSecondary" : "bg-primary hover:bg-darkPrimary"}`;

    const disabledButtonClasses = `w-fit h-10 flex items-center px-4 rounded-md text-white transition-all duration-150 bg-gray-400 cursor-not-allowed opacity-50`;

    return <Form className={`w-3/5 h-auto flex flex-col gap-12 mx-auto rounded-xl px-6 py-8 ${dark ? "bg-zinc-800" : "bg-white"}`} method='POST' submitForm={handleJobFairSubmit}>
        <FormStepRenderer
            currentStep={currentStep}
            dark={dark}
            jobFairForm={jobFairForm}
            handleJobFair={handleJobFair}
            setJobFairForm={setJobFairForm}
            errors={errors}
            setErrors={setErrors}
            defaultStateValidationRules={defaultStateValidationRules}
        />
        <div className='w-full h-auto flex items-center gap-6'>
            {currentStep > 1 && (
                <button
                    className={buttonClasses}
                    onClick={prevStep}
                    type='button'
                >
                    Prev
                </button>
            )}
            <div className='w-full h-auto flex justify-end items-center gap-4'>
                {currentStep < 5 && (
                    <button
                        className={isCurrentStepValid ? buttonClasses : disabledButtonClasses}
                        onClick={nextStep}
                        type='button'
                        disabled={!isCurrentStepValid}
                    >
                        Next
                    </button>
                )}
                {currentStep === 5 && (
                    <button
                        className={isCurrentStepValid ? buttonClasses : disabledButtonClasses}
                        type='submit'
                        disabled={!isCurrentStepValid}
                    >
                        Submit Application
                    </button>
                )}
            </div>
        </div>
    </Form>
};

JobFairFormDetail.propTypes = {
    dark: PropTypes.bool
};

export default React.memo(JobFairFormDetail);