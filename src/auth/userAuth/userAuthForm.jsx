import { useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import PropTypes from "prop-types";
import Form from '../../UI/form';
import UserAuthFormDetail from './userAuthFormDetail';
import { useAuth } from '../../hooks/useAuth';

const UserAuthForm = ({ dark, authMode }) => {
    const {
        userAuth,
        passwordVisible,
        focusedInput,
        errors,
        setErrors,
        isSubmitting,
        handleUserAuth,
        togglePasswordVisibility,
        handleLogin,
        handleSignUp,
        setFocusedInput,
    } = useAuth();

    const focusedRef = useRef();
    const navigate = useNavigate();
    const isLoginMode = authMode === 'login'

    const handleOutsideClick = useCallback((event) => {
        if (focusedRef.current && !focusedRef.current.contains(event.target)) {
            setFocusedInput(null);
        }
    }, [setFocusedInput]);

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted!')

        const result = isLoginMode
            ? await handleLogin(e)
            : await handleSignUp(e)

        console.log('Result:', result)

        if (result.success) {
            const actionText = isLoginMode ? 'logged in' : 'signed up';
            console.log(`Successfully ${actionText}:`, result.user);

            // Navigate to home page or intended destination
            navigate('/');
            window.scrollTo(0, 0);

            // Optional: Show success message
            // You can add a toast notification here
        }
    };

    useEffect(() => {
        window.addEventListener('click', handleOutsideClick);

        return () => window.removeEventListener('click', handleOutsideClick)
    }, [handleOutsideClick]);

    return (
        <Form
            method='POST'
            className='w-full h-auto flex flex-col gap-8'
            submitForm={onSubmit}
            focusedRef={focusedRef}
        >
            {errors.general && (
                <div className='w-fit mx-auto text-center'>
                    <p className='text-red-500'>{errors.general}</p>
                </div>
            )}
            <UserAuthFormDetail
                userAuth={userAuth}
                togglePasswordVisibility={togglePasswordVisibility}
                handleUserAuth={handleUserAuth}
                errors={errors}
                setErrors={setErrors}
                authMode={authMode}
                passwordVisible={passwordVisible}
                focusedInput={focusedInput}
                setFocusedInput={setFocusedInput}
                dark={dark}
            />
            <div className='w-full h-auto'>
                <button
                    type='submit'
                    disabled={isSubmitting}
                    className={`w-full h-full py-3 flex items-center justify-center px-4 text-white rounded-md ${dark ? "bg-secondary hover:bg-darkSecondary" : "bg-primary hover:bg-darkPrimary"
                        } ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    {isSubmitting
                        ? (isLoginMode ? 'Logging in...' : 'Signing up...')
                        : (isLoginMode ? 'Log in' : 'Sign up')
                    }
                </button>
            </div>

            <div className={`w-full h-[2px] ${dark ? "bg-white" : "bg-zinc-700"}`} />
        </Form>
    )
};

UserAuthForm.propTypes = {
    dark: PropTypes.bool,
    authMode: PropTypes.string.isRequired
};

export default UserAuthForm;