import PropTypes from 'prop-types';
import csImage from '../../../assets/images/customer-service.jpg';
import Form from '../../../UI/form';
import HelpForm from './helpForm';
import { useState } from 'react';
import { formValidation } from '../../../utils/formValidation';

const initialHelp = {
    name: '',
    email: '',
    message: '',
    userPermit: false
}

const helpValidationRules = {
    name: { required: true, type: 'text' },
    email: { required: true, type: 'email' },
    message: { required: true, minChar: 10 },
    userPermit: { required: true }
};

const Help = ({ dark }) => {
    const [helpState, setHelpState] = useState(initialHelp);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmitHelp = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        const { name, email, message } = helpState;

        const formData = { name, email, message };

        // validate form data
        const validateErrors = formValidation(formData, helpValidationRules);

        if (Object.keys(validateErrors).length === 0) {
            try {
                // Simulate API call - replace with actual endpoint
                // const response = await fetch('https://your-api.com/support', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify(formData)
                // });

                // if (!response.ok) {
                //     throw new Error('Network response was not ok')
                // }

                // success handling
                console.log('fetchHelp', formData);
                alert('Your message has been sent successfully');
                setHelpState(initialHelp);
                setErrors({})
            } catch (e) {
                // error handling
                console.error('Submission error', e);
                alert('Failed to send message, Please try again')
            } finally {
                setIsSubmitting(false);
            }
        } else {
            // validation errors
            setErrors(validateErrors);
            setIsSubmitting(false);
        }
    };

    const formContent = (
        <>
            <HelpForm dark={dark} helpState={helpState} setHelpState={setHelpState} errors={errors} setErrors={setErrors} validation={formValidation} validationRules={helpValidationRules} />
            <button
                type="submit"
                disabled={isSubmitting}
                className={`
                    w-full h-12 mt-4 flex items-center justify-center rounded 
                    ${dark
                        ? 'bg-secondary hover:bg-[#eb4770]'
                        : 'bg-primary hover:bg-darkPrimary'
                    } 
                    text-white transition-all duration-150 
                    disabled:opacity-50 disabled:cursor-not-allowed
                `}
                aria-label="Submit help request"
            >
                {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
        </>
    );

    return (
        <div className="w-full h-auto px-[8%] py-24 grid md:grid-cols-2 gap-12">
            <div className='w-full h-full hidden md:flex flex-col gap-12 pb-20'>
                <div className='flex flex-col items-start gap-3'>
                    <span className={`italic text-[15px] ${dark ? "text-secondary" : "text-primary"}`}>Support</span>
                    <h1 className={`text-4xl uppercase font-bold ${dark ? "text-white" : "text-zinc-900"}`}>Get Help</h1>
                    <p className={dark ? "text-zinc-300" : "text-zinc-600"}>We&apos;re here to assist you with any issues.</p>
                </div>
                <Form className='w-full h-auto flex flex-col gap-4' submitForm={handleSubmitHelp}>
                    {formContent}
                </Form>
            </div>
            <div className={`w-full h-auto border-2 rounded-xl overflow-hidden ${dark ? "border-secondary" : "border-primary"}`}>
                <div className='w-full h-full bg-cover bg-no-repeat bg-center' style={{ backgroundImage: `url(${csImage})` }}>
                    <div className='w-full h-full py-24 px-[8%] flex flex-col gap-12 md:hidden bg-zinc-900/80'>
                        <div className='flex flex-col items-start gap-3'>
                            <span className={`italic text-[15px] ${dark ? "md:text-secondary" : "md:text-primary"} text-zinc-300`}>Support</span>
                            <h1 className={`text-4xl uppercase font-bold ${dark ? "text-white" : "md:text-zinc-900"} text-white`}>Get Help</h1>
                            <p className={`${dark ? "text-zinc-300" : "md:text-zinc-600"} text-zinc-300`}>We&apos;re here to assist you with any issues.</p>
                        </div>
                        <Form className='w-full h-auto flex flex-col gap-4' submitForm={handleSubmitHelp}>
                            {formContent}
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
};

Help.propTypes = {
    dark: PropTypes.bool
}

export default Help;
