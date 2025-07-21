import { useState, useEffect, useMemo } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { supportFAQ } from "../../../data/supportData";
import { handleConfigError } from '../../../config/configData';



const Support = ({ dark }) => {
    const [error, setError] = useState(null);
    const supportLinkAddress = () => window.scrollTo({ top: 0 });

    const memoizedFAQ = useMemo(() => supportFAQ, []);

    useEffect(() => {
        const loadData = async () => {
            try {

                if (!memoizedFAQ || memoizedFAQ.length === 0) {
                    throw new Error('INVALID_DATA');
                }

            } catch {
                const { message } = handleConfigError(error);
                setError(message);
            }
        };

        loadData();
    }, [memoizedFAQ, error]);

    return (
        <section className={`w-full h-auto py-24 px-[8%] flex flex-col gap-12 ${dark ? "bg-zinc-900/50" : "bg-white"}`}>

            <div className="flex flex-col gap-3">
                <h1 className={`text-4xl uppercase tracking-wide font-bold ${dark ? "text-white" : "text-zinc-900"}`}>Support FAQS</h1>
                <p className={dark ? "text-zinc-300" : "text-zinc-700"}>Find answers to your most pressing questions about our webinars right here.</p>
            </div>
            <ul className="w-full h-auto flex flex-col relative" aria-label="Frequently Asked Questions">
                {
                    memoizedFAQ.flatMap(category =>
                        category.questions.map(faq => (


                            <li key={faq.id} className={`w-full h-auto p-6 flex flex-col gap-3 border-b-2 ${dark ? "border-zinc-300" : "border-zinc-600"}`} aria-labelledby={`faq-${faq.id}`}>

                                <h3 id={`faq-${faq.id}`} className={`text-xl uppercase tracking-wide font-semibold ${dark ? "text-white" : "text-zinc-900"}`}>
                                    {faq.question}
                                </h3>
                                <p className={`w-full md:w-2/3 h-auto ${dark ? "text-zinc-300" : "text-zinc-600"}`} aria-describedby={`faq-${faq.id}`}>
                                    {faq.answer}
                                </p>
                            </li>
                        ))
                    )
                }
            </ul>
            <div className="flex flex-col gap-3" aria-label="Additional Support">
                <h2 className={`text-3xl font-semibold ${dark ? "text-white" : "text-zinc-900"}`}>Still have Questions?</h2>
                <p className={dark ? "text-zinc-300" : "text-zinc-700"}>We&apos;re here to help you!</p>
                <Link
                    to='/contactus'
                    onClick={supportLinkAddress}
                    className={`w-fit h-9 px-4 mt-2 flex items-center rounded ${dark ? "bg-secondary hover:bg-[#eb4770]" : "bg-primary hover:bg-dark"} text-white transition-all duration-150`}
                    aria-label="Contact support team"
                >
                    Contact
                </Link>
            </div>

        </section>
    )
};

Support.propTypes = {
    dark: PropTypes.bool
}

export default Support;
