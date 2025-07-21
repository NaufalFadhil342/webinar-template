import { useState, useEffect, useMemo } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { supportFAQ } from "../../../data/supportData";
import {
    handleConfigError,
    validateFAQData,
    getErrorComponent,
    logConfigError
} from '../../../config/configSupport';

const Support = ({ dark }) => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [validFAQData, setValidFAQData] = useState([]);

    const supportLinkAddress = () => window.scrollTo({ top: 0 });

    const memoizedFAQ = useMemo(() => supportFAQ, []);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                // Simulate network delay for demonstration
                await new Promise(resolve => setTimeout(resolve, 500));

                // Validate the FAQ data
                const validationErrors = validateFAQData(memoizedFAQ);

                if (validationErrors.length > 0) {
                    // Use the first error found
                    const errorConfig = handleConfigError(validationErrors[0]);
                    logConfigError(errorConfig, 'Support Component');
                    setError(errorConfig);

                    // Still try to display partial data if possible
                    if (memoizedFAQ && memoizedFAQ.length > 0) {
                        setValidFAQData(memoizedFAQ);
                    }
                } else {
                    setValidFAQData(memoizedFAQ);
                    setError(null);
                }

            } catch (catchError) {
                const errorConfig = handleConfigError(catchError.message || 'UNKNOWN_ERROR');
                logConfigError(errorConfig, 'Support Component');
                setError(errorConfig);
            } finally {
                setIsLoading(false);
            }
        }

        loadData();
    }, [memoizedFAQ]);

    const handleRetry = () => {
        setError(null);
        setIsLoading(true);
        // Trigger reload
        window.location.reload();
    };

    const renderErrorState = () => {
        if (!error) return null;

        const errorStyles = getErrorComponent(error, dark);

        return (
            <div className={errorStyles.containerClass}>
                <div className="flex items-start gap-3">
                    <span className="text-xl">{errorStyles.iconClass}</span>
                    <div className="flex-1">
                        <h3 className={`font-semibold mb-2 ${errorStyles.textClass}`}>
                            {error.severity === 'error' ? 'Error' : error.severity === 'warning' ? 'Warning' : 'Notice'}
                        </h3>
                        <p className={errorStyles.textClass}>
                            {error.message}
                        </p>
                        {error.fallback === 'retry_button' && (
                            <button
                                onClick={handleRetry}
                                className={`mt-3 px-4 py-2 rounded text-white transition-colors ${dark
                                        ? 'bg-blue-600 hover:bg-blue-700'
                                        : 'bg-blue-500 hover:bg-blue-600'
                                    }`}
                            >
                                Try Again
                            </button>
                        )}
                        {error.fallback === 'contact_support' && (
                            <Link
                                to="/contactus"
                                className={`mt-3 inline-block px-4 py-2 rounded text-white transition-colors ${dark
                                        ? 'bg-secondary hover:bg-[#eb4770]'
                                        : 'bg-primary hover:bg-dark'
                                    }`}
                            >
                                Contact Support
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const renderLoadingState = () => (
        <div className="w-full flex justify-center items-center py-12">
            <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${dark ? 'border-white' : 'border-zinc-900'
                }`}></div>
        </div>
    );

    const renderEmptyState = () => (
        <div className={`w-full p-8 text-center rounded-lg border ${dark
                ? 'bg-zinc-800 border-zinc-700 text-zinc-300'
                : 'bg-gray-50 border-gray-200 text-zinc-600'
            }`}>
            <div className="text-4xl mb-4">📋</div>
            <h3 className={`text-xl font-semibold mb-2 ${dark ? 'text-white' : 'text-zinc-900'}`}>
                No FAQ Available
            </h3>
            <p>FAQ content will be available soon. Please check back later.</p>
        </div>
    );

    const renderFAQContent = () => {
        if (validFAQData.length === 0) {
            return renderEmptyState();
        }

        return (
            <ul className="w-full h-auto flex flex-col relative" aria-label="Frequently Asked Questions">
                {validFAQData.flatMap(category =>
                    category.questions?.map(faq => (
                        <li
                            key={faq.id}
                            className={`w-full h-auto p-6 flex flex-col gap-3 border-b-2 ${dark ? "border-zinc-300" : "border-zinc-600"
                                }`}
                            aria-labelledby={`faq-${faq.id}`}
                        >
                            <h3
                                id={`faq-${faq.id}`}
                                className={`text-xl uppercase tracking-wide font-semibold ${dark ? "text-white" : "text-zinc-900"
                                    }`}
                            >
                                {faq.question}
                            </h3>
                            <p
                                className={`w-full md:w-2/3 h-auto ${dark ? "text-zinc-300" : "text-zinc-600"
                                    }`}
                                aria-describedby={`faq-${faq.id}`}
                            >
                                {faq.answer}
                            </p>
                        </li>
                    )) || []
                )}
            </ul>
        );
    };

    return (
        <section className={`w-full h-auto py-24 px-[8%] flex flex-col gap-12 ${dark ? "bg-zinc-900/50" : "bg-white"
            }`}>
            <div className="flex flex-col gap-3">
                <h1 className={`text-4xl uppercase tracking-wide font-bold ${dark ? "text-white" : "text-zinc-900"
                    }`}>
                    Support FAQS
                </h1>
                <p className={dark ? "text-zinc-300" : "text-zinc-700"}>
                    Find answers to your most pressing questions about our webinars right here.
                </p>
            </div>

            {/* Error State */}
            {error && error.severity === 'error' && renderErrorState()}

            {/* Warning State */}
            {error && error.severity === 'warning' && renderErrorState()}

            {/* Loading State */}
            {isLoading && renderLoadingState()}

            {/* Content */}
            {!isLoading && renderFAQContent()}

            <div className="flex flex-col gap-3" aria-label="Additional Support">
                <h2 className={`text-3xl font-semibold ${dark ? "text-white" : "text-zinc-900"}`}>
                    Still have Questions?
                </h2>
                <p className={dark ? "text-zinc-300" : "text-zinc-700"}>
                    We&apos;re here to help you!
                </p>
                <Link
                    to='/contactus'
                    onClick={supportLinkAddress}
                    className={`w-fit h-9 px-4 mt-2 flex items-center rounded ${dark
                            ? "bg-secondary hover:bg-[#eb4770]"
                            : "bg-primary hover:bg-dark"
                        } text-white transition-all duration-150`}
                    aria-label="Contact support team"
                >
                    Contact
                </Link>
            </div>
        </section>
    );
};

Support.propTypes = {
    dark: PropTypes.bool
}

export default Support;
