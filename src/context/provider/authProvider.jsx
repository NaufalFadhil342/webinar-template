/**
 * In this component, we provide functionallty for user authentication
 * And the code can be improve with your own style such as: use reducer function to initialize user auth.
 * Or using library such as: Redux or Zustand 
 */

import { useState, useEffect, useMemo } from "react";
import { AuthContext } from "../authContext";
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

    // Storage helper functions
    const userStorageHelpers = useMemo(() => ({
        // For storing all registered users
        getRegisteredUsers: () => {
            const users = localStorage.getItem('registeredUsers');
            return users ? JSON.parse(users) : [];
        },

        saveRegisteredUser: (newUser) => {
            const existingUser = userStorageHelpers.getRegisteredUsers();
            const updatedUser = [...existingUser, newUser];
            localStorage.setItem('registeredUsers', JSON.stringify(updatedUser))
        },

        updateRegisteredUsers: (users) => {
            localStorage.setItem('registeredUser', JSON.stringify(users))
        },

        // For storing the current authenticated user
        getCurrentUser: () => {
            const user = localStorage.getItem('currentUser');
            return user ? JSON.parse(user) : null;
        },

        setCurrentUser: (user) => {
            localStorage.setItem('currentUser', JSON.stringify(user))
        },

        // For auth token
        getAuthToken: () => {
            return localStorage.getItem('authToken')
        },

        setAuthToken: (token) => {
            localStorage.setItem('authToken', token)
        },

        // Clear authentication data
        cleatAuthData: () => {
            localStorage.removeItem('currentUser'),
                localStorage.removeItem('authToken')
        }
    }), [])

    // Check for existing authentication on app load
    useEffect(() => {
        const checkAuthStatus = () => {
            try {
                const storedUser = userStorageHelpers.getCurrentUser();
                const storedToken = userStorageHelpers.getAuthToken();

                if (storedUser && storedToken) {
                    setUser(storedUser);
                    setIsAuthenticated(true);
                };
            } catch (error) {
                console.log('Error checking auth status:', error);
                userStorageHelpers.cleatAuthData();
            } finally {
                setIsLoading(false);
            };
        };

        checkAuthStatus();
    }, [userStorageHelpers]);

    const togglePasswordVisibility = (field) => {
        setPasswordVisible((prevState) => ({
            ...prevState,
            [field]: !passwordVisible[field]
        }));
    };

    const checkPasswordMatch = (password, confirmPassword) => {
        if (!password || !confirmPassword) return { isValid: true, message: '' }

        if (password === confirmPassword) {
            return { isValid: true, message: '' }
        } else {
            return { isValid: false, message: 'Password and confirm password do not match.' }
        }
    }

    // How the website works in the login auth
    const loginAuth = async (formData) => {
        try {
            setIsSubmitting(true);
            setErrors({});

            // Get all registered users from the current storage
            const existingUsers = userStorageHelpers.getRegisteredUsers();

            const usernameOrEmail = formData.usernameOrEmail || formData.username || formData.email

            const user = existingUsers.find(u =>
                u.username === usernameOrEmail ||
                u.email === usernameOrEmail
            );

            const passwordValidation = checkPasswordMatch(formData.password, formData.confirmPassword);
            if (!passwordValidation.isValid) {
                setErrors({
                    confirmPassword: passwordValidation.message
                });
                return { success: false, error: 'Passwords do not match' }
            }

            console.log('Found user:', user);
            console.log('Comparing password:', user?.password, 'vs', formData.password)

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
            userStorageHelpers.setCurrentUser(userForAuth)
            userStorageHelpers.setAuthToken(`mock-jwt-token-${user.id}`)

            setUser(userForAuth);
            setIsAuthenticated(true);
            setUserAuth(initialUserAuth);

            console.log('User logged in successfully:', userForAuth);
            return { success: true, user: userForAuth };
        } catch (error) {
            console.error('Login error:', error.message);
            setErrors({ general: 'Something goes wrong, please try again!' });
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
            const existingUsers = userStorageHelpers.getRegisteredUsers();

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
                username: formData.userName,
                email: formData.email,
                createdAt: new Date().toISOString(),
                password: formData.password
            };

            // Save to registered user array
            userStorageHelpers.saveRegisteredUser(newUser)

            // Create user object without password for auth state
            const userForAuth = {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
            };

            // Store current authenticated user
            userStorageHelpers.setCurrentUser(userForAuth);
            userStorageHelpers.setAuthToken(`mock-jwt-token-${newUser.id}`);

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

    const handleLogin = async (e) => {
        e.preventDefault();

        if (isSubmitting) return { success: false, error: 'Already submitting' };

        console.log('handle login called with:', userAuth)

        try {
            setIsSubmitting(true);

            const validateErrors = formValidation(userAuth, loginValidationRules);

            if (Object.keys(validateErrors).length > 0) {
                setErrors(validateErrors);
                return { success: false, errors: validateErrors };
            }

            const result = await loginAuth(userAuth);
            console.log('loginAuth result:', result);

            if (result.success) {
                setErrors({});
            }

            return result;
        } catch (error) {
            console.error('Login error:', error);
            setErrors({ form: 'Login failed. Please try again.' });
            return { success: false, error: error.message };
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (isSubmitting) return { success: false, error: 'Already submitting' };

        try {
            setIsSubmitting(true);

            const validateErrors = formValidation(userAuth, signUpValidationRules);

            if (Object.keys(validateErrors).length > 0) {
                setErrors(validateErrors);
                return { success: false, errors: validateErrors };
            }

            const result = await signUpAuth(userAuth);

            if (result.success) {
                setErrors({});
            }

            return result;
        } catch (error) {
            console.error('Sign up error:', error);
            setErrors({ form: 'Sign up failed. Please try again.' });
            return { success: false, error: error.message };
        } finally {
            setIsSubmitting(false);
        }
    };

    const logout = () => {
        userStorageHelpers.cleatAuthData();
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
        setErrors,
        isSubmitting,

        handleUserAuth,
        togglePasswordVisibility,
        handleLogin,
        handleSignUp,
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