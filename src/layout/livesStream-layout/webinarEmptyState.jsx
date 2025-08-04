import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const WebinarEmptyState = ({
    onViewAll,
    variant = 'filter', // 'filter', 'no-data', 'live'
    dark
}) => {

    const getEmptyStateConfig = () => {
        switch (variant) {
            case 'filter':
                return {
                    title: "There's no webinar match",
                    description: "Try to change a filter or remove filters to see more webinars.",
                    icon: (
                        <svg className="w-16 h-16 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
                        </svg>
                    ),
                    showButtons: true
                };
            case 'live':
                return {
                    title: "There's no webinar live",
                    description: "Webinar will ready soon. Still connect and don't let your chance to learn!",
                    icon: (
                        <div className="relative">
                            <svg className="w-16 h-16 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            <motion.div
                                className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </div>
                    ),
                    showButtons: false
                };
            default:
                return {
                    title: "There's no selected webinar available",
                    description: "Your searchs will present soon. Check again later to see the new content.",
                    icon: (
                        <svg className="w-16 h-16 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    ),
                    showButtons: false
                };
        }
    };

    const config = getEmptyStateConfig();

    return (
        <motion.div
            className="w-full h-auto flex flex-col items-center justify-center py-20 px-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            <div className="max-w-lg mx-auto text-center">
                {/* Animated icon container */}
                <motion.div
                    className={`w-32 h-32 mx-auto mb-8 ${dark ? 'bg-zinc-800' : 'bg-zinc-100'} rounded-full flex items-center justify-center shadow-sm`}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                >
                    {config.icon}
                </motion.div>

                {/* Title */}
                <motion.h3
                    className={`text-2xl font-semibold ${dark ? 'text-white' : 'text-zinc-900'} mb-4`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                >
                    {config.title}
                </motion.h3>

                {/* Description */}
                <motion.p
                    className={`${dark ? 'text-zinc-300' : 'text-zinc-600'} mb-8 leading-relaxed`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                >
                    {config.description}
                </motion.p>

                {/* Action buttons */}
                {config.showButtons && (
                    <motion.div
                        className="flex gap-4 justify-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.5 }}
                    >
                        <motion.button
                            className={`px-6 py-3 border rounded-lg font-medium ${dark ? 'text-zinc-300 hover:bg-zinc-800 border-zinc-800' : 'text-zinc-600 border-zinc-300 hover:bg-zinc-100'} transition-all duration-200`}
                            onClick={onViewAll}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            View All Webinar
                        </motion.button>
                    </motion.div>
                )}

                {/* Additional info for live variant */}
                {variant === 'live' && (
                    <motion.div
                        className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.6 }}
                    >
                        <p className="text-blue-800 text-sm font-medium">
                            💡 Tip: Activate notification to get information when live webinar started
                        </p>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

WebinarEmptyState.propTypes = {
    onResetFilters: PropTypes.func,
    onViewAll: PropTypes.func,
    variant: PropTypes.oneOf(['filter', 'no-data', 'live']),
    dark: PropTypes.bool
};

export default WebinarEmptyState;