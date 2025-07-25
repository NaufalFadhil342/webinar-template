import { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import faqData from "../../data/faqData";
import propTypes from 'prop-types';


const FAQs = ({ dark }) => {
    const [openFAQ, setOpenFAQ] = useState(0);

    const toggleFAQ = (index) => {
        setOpenFAQ(prevIndex => prevIndex === index ? null : index);
    };

    const handleContact = () => {
        window.scrollTo({ top: 0 })
    }

    return (
        <div className={`w-full h-auto py-24 px-[8%] flex flex-col gap-12 ${dark ? "bg-zinc-800" : "bg-white"}`} id="faq">
            <div className="w-full h-auto flex flex-col items-center gap-3 text-center">
                <h1 className={`text-4xl font-bold tracking-wide ${dark ? "text-white" : "text-zinc-900"}`}>FAQ</h1>
                <p className={dark ? "text-zinc-300" : 'text-zinc-600'}>Find answers to common questions about our webinars below.</p>
            </div>
            <div className="w-full sm:w-4/5 h-auto mx-auto">
                <ul className="w-full h-auto flex flex-col gap-8 relative">
                    {faqData.map((faq, index) => (
                        <motion.li
                            key={faq.id}
                            className={`w-full p-4 rounded-lg border-2 flex flex-col items-center gap-3 overflow-y-hidden ${dark ? "border-white" : "border-zinc-700"}`}
                            initial={{ height: '4rem' }}
                            animate={{ height: openFAQ === index ? "auto" : '4rem' }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            <div className="w-full flex gap-4 justify-between items-center">
                                <h3 className={`text-lg font-medium ${dark ? "text-white" : "text-zinc-900"}`}>{faq.question}</h3>
                                <button
                                    className="absolute right-4 focus:outline-none"
                                    onClick={() => toggleFAQ(index)}
                                    aria-expanded={openFAQ === index}
                                    aria-controls={`faq-content-${faq.id}`}
                                >
                                    <span className={`text-3xl leading-none ${dark ? "text-white" : "text-zinc-600"}`}
                                    >
                                        {openFAQ === index ? '-' : '+'}
                                    </span>
                                </button>
                            </div>
                            <p
                                id={`faq-content-${faq.id}`}
                                className={dark ? "text-zinc-300" : "text-zinc-600"}
                            >
                                {faq.answer}
                            </p>
                        </motion.li>

                    ))}
                </ul>
            </div>
            <div className="w-full h-auto flex flex-col items-center text-center">
                <h3 className={`text-xl font-semibold ${dark ? "text-white" : "text-zinc-900"}`}>Still have Questions?</h3>
                <p className={dark ? 'text-zinc-300' : "text-zinc-600"}>We&apos;re here to help!</p>
                <Link to='/contactus' onClick={handleContact} className={`w-auto h-10 px-4 flex items-center rounded mt-4 ${dark ? "bg-secondary text-white hover:bg-darkSecondary" : "bg-primary text-white hover:bg-darkPrimary"}`}>Contact</Link>
            </div>
        </div>
    )
};

FAQs.propTypes = {
    dark: propTypes.bool.isRequired
}

export default FAQs;
