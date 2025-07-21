import PropTypes from 'prop-types';

const HelpForm = ({ dark, helpState, setHelpState, errors, setErrors, validation, validationRules }) => {
    const handleHelpState = event => {
        const { name, value, type, checked } = event.target;

        const newValue = type === 'checkbox' ? checked : value;

        const updateState = {
            ...helpState,
            [name]: newValue
        };

        setHelpState(updateState);

        // perform validaiton for the specific field
        const fieldValidation = validation(updateState, validationRules);

        // update error state
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: fieldValidation[name] || undefined
        }));
    };

    const renderInput = (type, name, label, placeholder, additionalProps = {}) => {
        const isError = errors[name];
        const baseClasses = `w-full h-12 border-b-2 bg-transparent outline-none pl-2 transition-colors duration-200`;

        const darkModeClasses = dark
            ? "border-zinc-300 text-zinc-300 focus:border-secondary"
            : "md:border-zinc-700 md:text-zinc-700 md:focus:border-primary";

        const errorClasses = isError
            ? "border-red-500 focus:border-red-500"
            : "";

        return (
            <section className="w-full h-auto flex flex-col gap-2">
                <label
                    htmlFor={name}
                    className={`
                        ${dark ? "text-white" : "md:text-zinc-900"} 
                        font-medium text-white
                    `}
                >
                    {label}
                </label>
                {type === 'textarea' ? (
                    <input
                        className={`${baseClasses} ${darkModeClasses} ${errorClasses}`}
                        id={name}
                        name={name}
                        value={helpState[name]}
                        onChange={handleHelpState}
                        placeholder={placeholder}
                        {...additionalProps}
                    />
                ) : (
                    <input
                        type={type}
                        id={name}
                        name={name}
                        className={`${baseClasses} ${darkModeClasses} ${errorClasses}`}
                        placeholder={placeholder}
                        value={helpState[name]}
                        onChange={handleHelpState}
                        {...additionalProps}
                    />
                )}
                {isError && <p id={`${name}-error`} className='text-red-500 text-sm mt-1'>{isError}</p>}
            </section>
        )
    }

    return (
        <>
            {renderInput('text', 'name', 'Name', 'Enter your name', {
                required: true,
                'aria-invalid': !!errors.name,
                'aria-describedby': errors.name ? 'name-error' : undefined
            })}

            {renderInput('email', 'email', 'Email', 'Enter your email', {
                required: true,
                'aria-invalid': !!errors.email,
                'aria-describedby': errors.email ? 'email-error' : undefined
            })}

            {renderInput('textarea', 'message', 'Message', 'Enter your message', {
                required: true,
                'aria-invalid': !!errors.message,
                'aria-describedby': errors.message ? 'message-error' : undefined
            })}

            <section className='flex flex-row items-center gap-2'>
                <input
                    type="checkbox"
                    className='size-4'
                    id='userPermit'
                    name='userPermit'
                    onChange={handleHelpState}
                    checked={helpState.userPermit || false}
                    aria-label="Agree to terms"
                />
                <label
                    htmlFor="userPermit"
                    className={`
                        ${dark ? "text-zinc-300" : 'md:text-zinc-700'} 
                        text-zinc-300 cursor-pointer select-none
                    `}
                >
                    I agree to the terms
                </label>
            </section>
        </>
    )
};

HelpForm.propTypes = {
    dark: PropTypes.bool.isRequired,
    helpState: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
        message: PropTypes.string,
        userPermit: PropTypes.bool
    }).isRequired,
    setHelpState: PropTypes.func.isRequired,
    errors: PropTypes.object,
    setErrors: PropTypes.func.isRequired,
    validation: PropTypes.func.isRequired,
    validationRules: PropTypes.object.isRequired
}

export default HelpForm;