import { useState } from 'react';
import ctaBgImage from '../../assets/images/recording.jpg';
import { motion } from 'motion/react';
import PropTypes from 'prop-types';

const CallToAction = ({ dark }) => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const handleEmail = (e) => {
        setEmail(e.target.value);
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSubmitted(false);
    };

    return (
        <section
            className='w-full h-full bg-cover bg-no-repeat bg-center bg-fixed'
            style={{ backgroundImage: `url(${ctaBgImage})` }}
            role="img"
            aria-label="Background image of a recording studio"
        >
            <div className='w-full h-full px-[8%] py-24 bg-zinc-900/75'>
                <motion.div
                    className='w-full md:w-3/5 h-auto flex flex-col gap-6'
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                >
                    <div className='flex flex-col gap-3'>
                        <h1 className='text-white text-4xl tracking-wide font-bold uppercase'>
                            Join Our Upcoming Webinar and Gain Insights!
                        </h1>
                        <p className='text-white'>
                            Don&apos;t miss out on valuable insights. Sign up today to secure your spot!
                        </p>
                    </div>
                    <form className='w-full h-auto flex flex-col gap-3' onSubmit={handleSubmit}>
                        <div className='w-auto h-10 flex gap-3'>
                            <input
                                className={`w-full h-full border border-white bg-transparent px-2 outline-none rounded text-white placeholder:text-white text-sm transition-colors duration-300 ${dark ? "focus:border-secondary focus:ring-1 focus:ring-secondary" : "focus:border-primary focus:ring-1 focus:ring-primary"}`}
                                type="email"
                                placeholder='Your email here'
                                value={email}
                                onChange={handleEmail}
                                required
                                aria-label="Enter your email address"
                            />
                            <button
                                className={`min-w-max h-full px-5 rounded bg-white ${dark ? 'text-secondary' : 'text-primary'} font-medium hover:bg-zinc-200 hover:cursor-pointer duration-150 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed`}
                                type="submit"
                                aria-label="Sign up for webinar"
                            >
                                Sign Up
                            </button>
                        </div>
                        <span className='text-white text-sm'>
                            By clicking Sign Up, you agree to Our Terms and Conditions.
                        </span>
                    </form>
                    {submitted && (
                        <p className='text-green-500'>
                            Thank you for signing up! We&apos;ll be in touch soon.
                        </p>
                    )}
                    {error && (
                        <p className='text-red-500'>
                            {error}
                        </p>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

CallToAction.propTypes = {
    dark: PropTypes.bool
}

export default CallToAction;
