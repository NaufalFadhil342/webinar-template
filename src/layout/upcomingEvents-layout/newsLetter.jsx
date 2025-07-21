import { useCallback, useState } from "react";
import { formValidation } from "../../utils/formValidation";
import Form from "../../UI/form";
import PropTypes from 'prop-types';

const newsLetterValidationRules = {
    email: { required: true, type: 'email' }
};

const NewsLetter = ({ dark }) => {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleNewsLetter = useCallback((e) => {
        e.preventDefault();

        const values = { email: email };

        const validationErrors = formValidation(values, newsLetterValidationRules);
        setErrors(validationErrors);

        const hasError = Object.keys(validationErrors).length > 0;

        if (!hasError) {
            const formData = new FormData();
            formData.append('email', email);

            // Extract data from FormData for logging/sending
            const newsLetterData = { email: email };

            // Log the data (for debugging)
            console.log('Newsletter submission:', newsLetterData);

            // Here you would typically send the data to your API
            // fetch('/api/newsletter', {
            //     method: 'POST',
            //     body: formData
            // })
            //     .then(response => response.json())
            //     .then(data => {
            //         console.log('Success:', data);
            //         setIsSubmitted(true);
            //         setEmail('');
            //     })
            //     .catch(error => {
            //         console.error('Error:', error);
            //     });

            // For demonstration purposes:
            setIsSubmitted(true);
            setTimeout(() => setIsSubmitted(false), 3000);
            setEmail('');
        };
    }, [email]);

    return (
        <section className={`w-full h-auto px-[8%] py-24 flex flex-col items-center gap-6 ${dark ? 'bg-secondary' : 'bg-primary'} mt-10`}>
            <h1 className="text-4xl font-bold text-center text-white uppercase leading-none">Stay Updated</h1>
            <p className="text-zinc-200 text-center">Get notified about upcoming webinars and never miss an opportunity to learn from industry experts.</p>
            {isSubmitted ? (
                <div className="text-white rounded-lg">
                    Thanks for subscribing!
                </div>
            ) : (
                <Form className="w-full md:w-3/5 flex justify-center items-start gap-4" submitForm={handleNewsLetter}>
                    <div className="w-full">
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`h-12 px-4 w-full flex items-center rounded-lg outline-none border-2 border-white ${dark ? 'bg-transparent text-white placeholder:text-zinc-300' : 'bg-white text-zinc-600'}`} placeholder="Your email address" />
                        {errors.email && <p className={` ${dark ? 'text-zinc-800' : 'text-red-300'} text-sm mt-1`}>{errors.email}</p>}
                    </div>
                    <button type="submit" className={`w-fit h-12 px-4 flex items-center bg-white text-zinc-700 hover:bg-[#eee] rounded-md transition-all duration-150`}>Subscribe</button>
                </Form>
            )}
        </section>
    )
};

NewsLetter.propTypes = {
    dark: PropTypes.bool
}

export default NewsLetter;