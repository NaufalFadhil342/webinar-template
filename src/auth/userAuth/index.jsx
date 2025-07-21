import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserAuthForm from './userAuthForm';
import { mdiGoogle, mdiFacebook, mdiApple } from '@mdi/js';
import Icon from '@mdi/react';
import PopupAuth from './popupAuth';

const UserAuth = ({ dark }) => {
    const [login, setLogin] = useState(true);

    return (
        <div className='w-full h-auto flex flex-col gap-12 px-[8%] py-24'>
            <div className='w-full h-auto flex justify-end'>
                <p className={`${dark ? "text-zinc-300" : "text-zinc-600"} flex items-center gap-2`}>
                    {login ? "Don't have an account?" : "Already have an account?"}
                    <Link className='text-sky-500 hover:text-sky-600 transition-colors duration-150' onClick={() => setLogin(!login)}>{login ? "Sign Up" : "Log In"}</Link>
                </p>
            </div>
            <div className='w-1/2 h-auto mx-auto flex flex-col items-center gap-8'>
                <div className='flex flex-col gap-4'>
                    <h1 className={`text-5xl tracking-wide uppercase font-bold text-center ${dark ? "text-white" : "text-zinc-900"}`}>{login ? "Log In" : "Sign Up"}</h1>
                    <p className={dark ? "text-zinc-300 text-center" : "text-zinc-600 text-center"}>{login ? "Log in to continue exploring amazing features." : "Sign up to unlock exclusive features and stay connected."}</p>
                </div>
                <UserAuthForm dark={dark} login={login} />
                <div className='w-full h-auto flex flex-col gap-5'>
                    <PopupAuth dark={dark}>
                        <Icon path={mdiGoogle} size={1} />
                        <>{login ? "Log in with Google" : "Sign Up with Google"}</>
                    </PopupAuth>
                    <PopupAuth dark={dark}>
                        <Icon path={mdiFacebook} size={1} />
                        <>{login ? "Log in with Facebook" : "Sign up with Facebook"}</>
                    </PopupAuth>
                    <PopupAuth dark={dark}>
                        <Icon path={mdiApple} size={1} />
                        <>{login ? "Log in with Apple" : "Sign up with Apple"}</>
                    </PopupAuth>
                </div>
                <div className='w-fit'>
                    <Link className={`underline transition-all duration-150 ${dark ? "text-zinc-300 hover:text-secondary" : "text-zinc-600 hover:text-primary"}`}>Forgot your password?</Link>
                </div>
            </div>
        </div>
    )
};

UserAuth.propTypes = {
    dark: PropTypes.bool
}

export default UserAuth;