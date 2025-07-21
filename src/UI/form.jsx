import PropTypes from 'prop-types';

const Form = ({ children, className, submitForm, method, focusedRef, autoComplete }) => {

    return (
        <form method={method} className={className} onSubmit={submitForm} ref={focusedRef} autoComplete={autoComplete}>
            {children}
        </form>
    )
}

Form.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    submitForm: PropTypes.func.isRequired,
    method: PropTypes.string,
    focusedRef: PropTypes.object,
    autoComplete: PropTypes.string
}

export default Form