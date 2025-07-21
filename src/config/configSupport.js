export const CONFIG_ERRORS = {
  INVALID_DATA: {
    code: 'INVALID_DATA',
    message: 'No FAQ data available. Please check your data source.',
    severity: 'error',
    fallback: 'display_empty_state',
  },
  NETWORK_ERROR: {
    code: 'NETWORK_ERROR',
    message: 'Failed to load FAQ data. Please check your connection.',
    severity: 'error',
    fallback: 'retry_button',
  },
  PARSING_ERROR: {
    code: 'PARSING_ERROR',
    message: 'Error processing FAQ data. Some content may not display correctly.',
    severity: 'warning',
    fallback: 'partial_display',
  },
  MISSING_CATEGORY: {
    code: 'MISSING_CATEGORY',
    message: 'Some FAQ categories are missing required information.',
    severity: 'warning',
    fallback: 'skip_invalid',
  },
  MISSING_QUESTIONS: {
    code: 'MISSING_QUESTIONS',
    message: 'Some FAQ questions are incomplete or missing.',
    severity: 'warning',
    fallback: 'skip_invalid',
  },
  EMPTY_CONTENT: {
    code: 'EMPTY_CONTENT',
    message: 'FAQ content is empty or unavailable.',
    severity: 'info',
    fallback: 'display_placeholder',
  },
  VALIDATION_ERROR: {
    code: 'VALIDATION_ERROR',
    message: 'FAQ data validation failed. Content may be incomplete.',
    severity: 'warning',
    fallback: 'display_partial',
  },
  TIMEOUT_ERROR: {
    code: 'TIMEOUT_ERROR',
    message: 'Request timeout while loading FAQ data.',
    severity: 'error',
    fallback: 'retry_button',
  },
  PERMISSION_ERROR: {
    code: 'PERMISSION_ERROR',
    message: 'Access denied. You may not have permission to view this content.',
    severity: 'error',
    fallback: 'contact_support',
  },
  SERVER_ERROR: {
    code: 'SERVER_ERROR',
    message: 'Server error occurred while loading FAQ data.',
    severity: 'error',
    fallback: 'retry_later',
  },
};

export const handleConfigError = (errorType, customMessage = null) => {
  // If errorType is already an Error object, extract the message
  if (errorType instanceof Error) {
    errorType = errorType.message;
  }

  const error = CONFIG_ERRORS[errorType];

  if (!error) {
    return {
      code: 'UNKNOWN_ERROR',
      message: customMessage || 'An unexpected error occurred.',
      severity: 'error',
      fallback: 'contact_support',
    };
  }

  return {
    code: error.code,
    message: customMessage || error.message,
    severity: error.severity,
    fallback: error.fallback,
    timestamp: new Date().toISOString(),
  };
};

export const validateFAQData = (data) => {
  const errors = [];

  if (!data || !Array.isArray(data)) {
    errors.push('INVALID_DATA');
    return errors;
  }

  if (data.length === 0) {
    errors.push('EMPTY_CONTENT');
    return errors;
  }

  data.forEach((category) => {
    if (!category.category || typeof category.category !== 'string') {
      errors.push('MISSING_CATEGORY');
    }

    if (!category.questions || !Array.isArray(category.questions)) {
      errors.push('MISSING_QUESTIONS');
    } else {
      category.questions.forEach((question) => {
        if (!question.id || !question.question || !question.answer) {
          errors.push('VALIDATION_ERROR');
        }
      });
    }
  });

  return errors;
};

export const getErrorComponent = (error, dark = false) => {
  const baseClasses = `w-full p-6 rounded-lg border ${dark ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-50 border-gray-200'}`;

  const severityClasses = {
    error: dark ? 'border-red-500/50 bg-red-900/20' : 'border-red-200 bg-red-50',
    warning: dark ? 'border-yellow-500/50 bg-yellow-900/20' : 'border-yellow-200 bg-yellow-50',
    info: dark ? 'border-blue-500/50 bg-blue-900/20' : 'border-blue-200 bg-blue-50',
  };

  const textClasses = {
    error: dark ? 'text-red-400' : 'text-red-700',
    warning: dark ? 'text-yellow-400' : 'text-yellow-700',
    info: dark ? 'text-blue-400' : 'text-blue-700',
  };

  return {
    containerClass: `${baseClasses} ${severityClasses[error.severity] || severityClasses.error}`,
    textClass: textClasses[error.severity] || textClasses.error,
    iconClass: error.severity === 'error' ? '⚠️' : error.severity === 'warning' ? '⚠️' : 'ℹ️',
  };
};

// Logger utility for development
export const logConfigError = (error, context = '') => {
  if (import.meta.env.NODE_ENV === 'development') {
    console.group(`🔧 Config Error${context ? ` [${context}]` : ''}`);
    console.error('Code:', error.code);
    console.error('Message:', error.message);
    console.error('Severity:', error.severity);
    console.error('Fallback:', error.fallback);
    console.error('Timestamp:', error.timestamp);
    console.groupEnd();
  }
};
