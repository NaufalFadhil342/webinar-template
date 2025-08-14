import { useEffect } from 'react';
import Icon from '@mdi/react';
import { mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js';
import PropTypes from 'prop-types';
import PasswordRequirements from './passwordRequirement';

const UserAuthFormDetail = ({ userAuth, handleUserAuth, togglePasswordVisibility, errors, setErrors, authMode, passwordVisible, focusedInput, setFocusedInput, dark }) => {
    const isLoginMode = authMode === 'login';

    const passwordsMatch = userAuth.password && userAuth.confirmPassword && userAuth.password === userAuth.confirmPassword;

    useEffect(() => {
        // Only validate confirm password if both fields have values
        if (userAuth.password && userAuth.confirmPassword) {
            const newErrors = { ...errors };

            if (userAuth.password === userAuth.confirmPassword) {
                // Passwords match - remove any existing error
                delete newErrors.confirmPassword;
            } else {
                // Passwords don't match - add error
                newErrors.confirmPassword = 'Password and confirm password do not match.';
            }

            // Only update if there's a change to prevent infinite loops
            if (JSON.stringify(newErrors) !== JSON.stringify(errors)) {
                setErrors(newErrors);
            }
        } else if (!userAuth.confirmPassword && errors.confirmPassword) {
            // Clear error when confirm password field is empty
            const newErrors = { ...errors };
            delete newErrors.confirmPassword;
            setErrors(newErrors);
        }
    }, [userAuth.password, userAuth.confirmPassword, errors, setErrors]);

    return (
        <section className='w-full h-auto flex flex-col gap-4'>
            {!isLoginMode && (
                <div className='w-full h-auto'>
                    <input
                        type="text"
                        placeholder='Username'
                        name='userName'
                        value={userAuth.userName}
                        onChange={handleUserAuth}
                        className={`w-full h-auto py-3 bg-transparent border-b-2 ${dark ? 'border-zinc-300 focus:border-secondary text-zinc-300' : 'border-zinc-600 focus:border-primary text-zinc-600'} outline-none`}
                    />
                    {errors.userName && <p className='text-sm text-red-500'>{errors.userName}</p>}
                </div>
            )}
            {isLoginMode ? (
                <div className='w-full'>
                    <input
                        type="text"
                        placeholder='Username or Email'
                        name='usernameOrEmail'
                        value={userAuth.usernameOrEmail}
                        onChange={handleUserAuth}
                        className={`w-full h-auto py-3 bg-transparent border-b-2 ${dark ? 'border-zinc-300 focus:border-secondary text-zinc-300' : 'border-zinc-600 focus:border-primary text-zinc-600'} outline-none`}
                    />
                    {errors.usernameOrEmail && <p className='text-sm text-red-500'>{errors.usernameOrEmail}</p>}
                </div>
            ) : (
                <div className='w-full'>
                    <input
                        type="email"
                        placeholder='Email'
                        name='email'
                        value={userAuth.email}
                        onChange={handleUserAuth}
                        className={`w-full h-auto py-3 bg-transparent border-b-2 ${dark ? 'border-zinc-300 focus:border-secondary text-zinc-300' : 'border-zinc-600 focus:border-primary text-zinc-600'} outline-none`}
                    />
                    {errors.email && <p className='text-sm text-red-500'>{errors.email}</p>}
                </div>
            )}
            <div className='w-full relative'>
                <input
                    type={passwordVisible.password ? 'text' : 'password'}
                    placeholder='Password'
                    name='password'
                    value={userAuth.password}
                    onChange={handleUserAuth}
                    onFocus={() => setFocusedInput('password')}
                    className={`w-full h-auto py-3 bg-transparent border-b-2 ${focusedInput === 'password' ? `${dark ? 'border-secondary' : 'border-primary'}` : `${dark ? 'border-zinc-300' : 'border-zinc-600'}`} ${dark ? 'text-zinc-300' : 'text-zinc-600'} outline-none`}
                />
                <button
                    type='button'
                    className={`absolute right-2 top-3 ${dark ? 'text-zinc-300' : 'text-zinc-500'}`}
                    onClick={() => togglePasswordVisibility('password')}
                    aria-label={passwordVisible.password ? "Hide password" : "Show password"}
                >
                    {<Icon path={passwordVisible.password ? mdiEyeOutline : mdiEyeOffOutline} size={1} />}
                </button>
                {(focusedInput === 'password' || userAuth.password.length > 0) && (
                    <PasswordRequirements password={userAuth.password} dark={dark} />
                )}
            </div>
            {!isLoginMode && (
                <div className='w-full relative'>
                    <input
                        type={passwordVisible.confirmPassword ? 'text' : 'password'}
                        placeholder='Confirm Password'
                        name='confirmPassword'
                        value={userAuth.confirmPassword}
                        onChange={handleUserAuth}
                        onFocus={() => setFocusedInput('confirmPassword')}
                        onBlur={() => {
                            if (focusedInput === 'confirmPassword') {
                                setFocusedInput('');
                            }
                        }}
                        className={`w-full h-auto py-3 bg-transparent border-b-2 ${focusedInput === 'confirmPassword'
                            ? `${dark ? 'border-secondary' : 'border-primary'}`
                            : passwordsMatch
                                ? (dark ? 'border-green-400' : 'border-green-500')
                                : `${dark ? 'border-zinc-300' : 'border-zinc-600'}`
                            } ${dark ? 'text-zinc-300' : 'text-zinc-600'} outline-none`}
                    />
                    <button
                        type='button'
                        className={`absolute right-2 top-3 ${dark ? 'text-zinc-300' : 'text-zinc-500'}`}
                        onClick={() => togglePasswordVisibility('confirmPassword')}
                        aria-label={passwordVisible.confirmPassword ? "Hide password" : "Show password"}
                    >
                        {<Icon path={passwordVisible.confirmPassword ? mdiEyeOutline : mdiEyeOffOutline} size={1} />}
                    </button>
                    {userAuth.confirmPassword && (
                        <div className="mt-2">
                            {errors.confirmPassword ? (
                                <p className='text-sm text-red-500 flex items-center gap-1'>
                                    <span className="text-xs">✗</span>
                                    {errors.confirmPassword}
                                </p>
                            ) : passwordsMatch ? (
                                <p className='text-sm text-green-500 flex items-center gap-1'>
                                    <span className="text-xs">✓</span>
                                    Passwords match
                                </p>
                            ) : null}
                        </div>
                    )}
                </div>
            )}
        </section>
    )
};

UserAuthFormDetail.propTypes = {
    userAuth: PropTypes.object.isRequired,
    handleUserAuth: PropTypes.func.isRequired,
    errors: PropTypes.object,
    setErrors: PropTypes.func.isRequired,
    authMode: PropTypes.string.isRequired,
    togglePasswordVisibility: PropTypes.func,
    passwordVisible: PropTypes.object.isRequired,
    setFocusedInput: PropTypes.func,
    focusedInput: PropTypes.string,
    dark: PropTypes.bool.isRequired
};

export default UserAuthFormDetail;