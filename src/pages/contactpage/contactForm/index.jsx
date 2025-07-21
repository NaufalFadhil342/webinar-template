import { useCallback, useState } from 'react';
import Form from '../../../UI/form';
import PropTypes from 'prop-types';
import ContactFormDetail from './contactFormDetail';
import { formValidation } from '../../../utils/formValidation';

const initialContactForm = {
    firstName: '',
    lastName: '',
    email: '',
    selectedCountry: '',
    role: null,
    message: ''
}

const contactFormValidationRules = {
    firstName: { required: true, type: 'text' },
    lastName: { required: true, type: 'text' },
    email: { required: true, type: 'email' },
    selectedCountry: { required: true },
    role: { required: true },
    message: { required: true, minChar: 10 }
};

const ROLES = ['participant', 'speaker', 'organizer', 'sponsor', 'other', 'none'];

const ContactForm = ({ dark }) => {
    const [contactForm, setContactForm] = useState(initialContactForm);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleContactForm = useCallback((event) => {
        const { name, value, type } = event.target;

        const newValue = type === 'radio' ? value : value;

        setContactForm((prev) => ({
            ...prev,
            [name]: newValue
        }));

        const fieldErrors = formValidation({ ...contactForm, [name]: newValue }, contactFormValidationRules);

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: fieldErrors[name] || undefined
        }));

    }, [contactForm]);

    const submitContactForm = useCallback(async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        const allErrors = formValidation(contactForm, contactFormValidationRules);
        setErrors(allErrors);

        const hasErrors = Object.keys(allErrors).length > 0;

        if (!hasErrors) {
            try {
                const formData = {
                    firstName: contactForm.firstName,
                    lastName: contactForm.lastName,
                    email: contactForm.email,
                    selectedCountry: contactForm.selectedCountry,
                    role: contactForm.role,
                    message: contactForm.message
                };

                // Simulate API call (replace with actual API endpoint)
                // const response = await fetch('/api/contact', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify(formData)
                // });

                // if (!response.ok) {
                //     throw new Error('Submission failed!')
                // };

                console.log('contactForm:', formData);
                alert('Form submitted successfully!');
                setContactForm(initialContactForm);
                setErrors({});
            } catch (e) {
                console.error('Submission error:', e);
                alert('Failed to submit form, Please try again');
            } finally {
                setIsSubmitting(false);
            };
        } else {
            setIsSubmitting(false);
        };
    }, [contactForm]);

    return (
        <section className={`w-full h-auto px-[8%] py-24 flex flex-col gap-16 ${dark ? "bg-zinc-800" : "bg-white"}`}>
            <div className='flex flex-col items-center text-center gap-3'>
                <h1 className={`text-4xl font-bold uppercase tracking-wide ${dark ? 'text-white' : 'text-zinc-900'}`}>Contact Us</h1>
                <p className={dark ? "text-zinc-300" : "text-zinc-600"}>We&apos;d love to hear from you about our webinars!</p>
            </div>
            <Form className='flex flex-col gap-5 items-center md:mx-auto w-full md:w-4/5 h-auto' dark={dark} submitForm={submitContactForm}>
                <ContactFormDetail
                    dark={dark}
                    contactForm={contactForm}
                    setContactForm={setContactForm}
                    handleContactForm={handleContactForm}
                    validation={formValidation}
                    validationRules={contactFormValidationRules}
                    errors={errors}
                    isSubmitting={isSubmitting}
                    roles={ROLES}
                />
            </Form>
        </section>
    )
};

ContactForm.propTypes = {
    dark: PropTypes.bool,
}

export default ContactForm;
