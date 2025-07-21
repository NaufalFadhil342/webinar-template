/**
 * In this component, we provide functionallty for user authentication
 * And the code can be improve with your own style such as: use reducer function to initialize user auth.
 * Or using library such as: Redux or Zustand 
 */

import { AuthContext } from "../authContext";
import { useState, useEffect } from "react";
import { validateUsernameOrEmail } from "../../utils/helper/getUsernameOrEmail";
import { formValidation } from "../../utils/formValidation";
import PropTypes from 'prop-types';

const initialUserAuth = {
    userName: '',
    email: '',
    usernameOrEmail: '',
    password: '',
    confirmPassword: ''
};

const signUpValidationRules = {
    userName: { required: true, type: 'text', minLength: 3, maxLength: 20 },
    email: { required: true, type: "email" },
    password: {
        required: true,
        minLength: 8,
        requireUppercase: true,
        requireLowercase: true,
        requireNumber: true,
        requireSymbol: true,
        passwordValidation: true
    },
    confirmPassword: { required: true, matchField: "password" },
};

const loginValidationRules = {
    usernameOrEmail: { required: true },
    password: {
        required: true,
        minLength: 8,
        requireUppercase: true,
        requireLowercase: true,
        requireNumber: true,
        requireSymbol: true,
        passwordValidation: true
    }
};

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [userAuth, setUserAuth] = useState(initialUserAuth);
    const [passwordVisible, setPasswordVisible] = useState({ password: false, confirmPassword: false });
    const [focusedInput, setFocusedInput] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    // Check for existing authentication on app load
    useEffect(() => {
        const checkAuthStatus = () => {
            try {
                const storedUser = localStorage.getItem('authenticatedUsers');
                const storedToken = localStorage.getItem('authToken');

                if (storedUser && storedToken) {
                    const userdata = JSON.parse(storedUser);
                    setUser(userdata);
                    setIsAuthenticated(true);
                };
            } catch (error) {
                console.log('Error checking auth status:', error);
                localStorage.removeItem('authenticatedUsers');
                localStorage.removeItem('authToken');
            } finally {
                setIsLoading(false);
            };
        };

        checkAuthStatus();
    }, []);

    const togglePasswordVisibility = (field) => {
        setPasswordVisible((prevState) => ({
            ...prevState,
            [field]: !passwordVisible[field]
        }));
    };

    // Helper function to get existing users from localStorage
    const getStoredUsers = () => {
        const users = localStorage.getItem('authenticatedUsers');
        return users ? JSON.parse(users) : [];
    };

    // Helper function to save users to localStorage
    const saveUsers = (users) => {
        localStorage.setItem('authenticatedUsers', JSON.stringify(users));
    };

    // How the website works in the login auth
    const loginAuth = async (formData) => {
        try {
            setIsSubmitting(true);
            setErrors({});

            const existingUsers = getStoredUsers();

            const user = existingUsers.find(u =>
                u.username === formData.usernameOrEmail ||
                u.email === formData.usernameOrEmail
            );

            if (!user) {
                setErrors({
                    usernameOrEmail: 'User not found, please sign up first!'
                });
                return { success: false, error: 'User not found' }
            };

            if (user.password !== formData.password) {
                setErrors({
                    password: 'Password is not valid. Please input a correct password!'
                })
                return { success: false, error: 'Invalid password' }
            };

            // Create user object without password for auth state
            const userForAuth = {
                id: user.id,
                usernameOrEmail: formData.usernameOrEmail,
            };

            // Store authentication data
            localStorage.setItem('authenticatedUsers', JSON.stringify(userForAuth));
            localStorage.setItem('authToken', `mock-jwt-token-${user.id}`);

            setUser(userForAuth);
            setIsAuthenticated(true);
            setUserAuth(initialUserAuth);

            console.log('User logged in successfully:', userForAuth);
            return { success: true, user: userForAuth };
        } catch (error) {
            console.error('Login error:', error.message);
            setErrors({ general: 'Something wrong when you login, please try again.' });
            return { success: false, error: error.message };
        } finally {
            setIsSubmitting(false);
        }
    };

    // How the website works in the sign up / sign in auth
    const signUpAuth = async (formData) => {
        try {
            setIsSubmitting(true);
            setErrors({});

            // Validate passwords match
            if (formData.password !== formData.confirmPassword) {
                setErrors({
                    confirmPassword: 'Password and confirm password are not match.'
                });
                return { success: false, error: 'Passwords do not match' }
            }

            // Get existing users
            const existingUsers = getStoredUsers();

            // Check if user already exists
            const userExists = existingUsers.some(user =>
                user.username === formData.userName || user.email === formData.email
            );

            if (userExists) {
                setErrors({
                    username: 'Username already exist, please input other names'
                });
                return { success: false, error: 'Username already exist' }
            };

            // Check if email already exists
            const emailExists = existingUsers.some(user =>
                user.email === formData.email
            );

            if (emailExists) {
                setErrors({
                    email: 'Email already exist, try input other emails'
                });
                return { success: false, error: 'Email already exists' };
            };

            // Create new user
            const newUser = {
                id: Date.now(),
                username: formData.username,
                email: formData.email,
                password: formData.password, // In real app, this would be hashed
                createdAt: new Date().toISOString()
            };

            // Add to users array and save
            existingUsers.push(newUser);
            saveUsers(existingUsers);

            // Create user object without password for auth state
            const userForAuth = {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
            };

            // Store authentication data
            localStorage.setItem('authenticatedUsers', JSON.stringify(userForAuth));
            localStorage.setItem('authToken', `mock-jwt-token-${newUser.id}`);

            setUser(userForAuth);
            setIsAuthenticated(true);
            setUserAuth(initialUserAuth);

            console.log('User registered successfully:', userForAuth);
            return { success: true, user: userForAuth };
        } catch (error) {
            console.error('Registration error:', error.message);
            setErrors({ general: 'Something wrong when you sign up. Please try again' });
            return { success: false, error: error.message };
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUserAuth = (e) => {
        const { name, value } = e.target;

        setUserAuth((prevState) => ({
            ...prevState,
            [name]: value
        }));

        // Clear previous error for this field
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: null
        }));

        try {
            if (name === 'usernameOrEmail') {
                const fieldError = validateUsernameOrEmail(value);
                if (fieldError) {
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        [name]: fieldError
                    }));
                }
            } else {
                // For other fields, use the regular validation
                const isInLoginMode = userAuth.usernameOrEmail !== undefined && userAuth.usernameOrEmail !== '';
                const validationRules = isInLoginMode ? loginValidationRules : signUpValidationRules;

                if (validationRules[name]) {
                    const fieldError = formValidation({ [name]: value }, { [name]: validationRules[name] })[name];
                    if (fieldError) {
                        setErrors(prevErrors => ({
                            ...prevErrors,
                            [name]: fieldError
                        }));
                    }
                }
            }
        } catch (error) {
            console.error('Validation error:', error);
        }
    };

    const handleUserSubmit = async (e, isLogin) => {
        e.preventDefault();

        if (isSubmitting) return { success: false, error: 'Already submitting' };

        try {
            const validationRules = isLogin ? loginValidationRules : signUpValidationRules;
            const validateErrors = formValidation(userAuth, validationRules);

            if (Object.keys(validateErrors).length > 0) {
                setErrors(validateErrors);
                return { success: false, errors: validateErrors };
            }

            const result = isLogin
                ? await loginAuth(userAuth)
                : await signUpAuth(userAuth);

            return result;
        } catch (error) {
            console.error('Submit error:', error);
            setErrors({ form: 'An unexpected error occurred' });
            return { success: false, error: error.message };
        }
    };

    const logout = () => {
        localStorage.removeItem('authenticatedUser');
        localStorage.removeItem('authToken');
        setUser(null);
        setIsAuthenticated(false);
        setUserAuth(initialUserAuth);
        setErrors({});
    };

    const resetForm = () => {
        setUserAuth(initialUserAuth);
        setErrors({});
        setPasswordVisible({ password: false, confirmPassword: false });
        setFocusedInput(null);
    };

    const value = {
        user,
        isAuthenticated,
        isLoading,

        userAuth,
        passwordVisible,
        focusedInput,
        errors,
        isSubmitting,

        handleUserAuth,
        togglePasswordVisibility,
        handleUserSubmit,
        setFocusedInput,
        resetForm,

        loginAuth,
        signUpAuth,
        logout,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default AuthProvider;