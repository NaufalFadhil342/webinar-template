import JobDetail from "../../layout/jobFair-layout/job-Detail";
import PersonalInformation from "../../layout/jobFair-layout/personal-Information";
import WorkExperiences from "../../layout/jobFair-layout/work-experiences";
import Education from "../../layout/jobFair-layout/education";
import SkillQualified from "../../layout/jobFair-layout/skill-qualified";
import AdditionalInfo from "../../layout/jobFair-layout/additional-info";
import DocumentUpload from "../../layout/jobFair-layout/document-upload";
import PropTypes from 'prop-types';

const FormStepRenderer = ({
    currentStep,
    dark,
    jobFairForm,
    handleJobFair,
    setJobFairForm,
    errors,
    setErrors,
    defaultStateValidationRules
}) => {
    const renderPersonalInformation = () => {
        return (
            <>
                <JobDetail dark={dark} />
                <PersonalInformation dark={dark} jobFairForm={jobFairForm} handleJobFair={handleJobFair} errors={errors} />
            </>
        )
    };

    const renderExperiences = () => {
        return (
            <>
                <WorkExperiences
                    dark={dark}
                    jobFairForm={jobFairForm}
                    setJobFairForm={setJobFairForm}
                />
            </>
        )
    };

    const renderEducation = () => {
        return (
            <>
                <Education
                    dark={dark}
                    jobFairForm={jobFairForm}
                    setJobFairForm={setJobFairForm}
                    defaultStateValidationRules={defaultStateValidationRules}
                    errors={errors}
                    setErrors={setErrors}
                />
            </>
        )
    };

    const renderSkills = () => {
        return (
            <>
                <SkillQualified dark={dark} jobFairForm={jobFairForm} handleJobFair={handleJobFair} />
                <AdditionalInfo dark={dark} jobFairForm={jobFairForm} handleJobFair={handleJobFair} />
            </>
        )
    };

    const renderDocument = () => {
        return (
            <>
                <DocumentUpload
                    dark={dark}
                    jobFairForm={jobFairForm}
                    handleJobFair={handleJobFair}
                    errors={errors}
                />
            </>
        )
    };

    switch (currentStep) {
        case 1:
            return renderPersonalInformation();
        case 2:
            return renderExperiences();
        case 3:
            return renderEducation();
        case 4:
            return renderSkills();
        case 5:
            return renderDocument();
        default:
            return null;
    }
};

FormStepRenderer.propTypes = {
    currentStep: PropTypes.number,
    dark: PropTypes.bool,
    jobFairForm: PropTypes.object,
    handleJobFair: PropTypes.func,
    setJobFairForm: PropTypes.func,
    errors: PropTypes.object,
    setErrors: PropTypes.func,
    defaultStateValidationRules: PropTypes.object
}

export default FormStepRenderer;