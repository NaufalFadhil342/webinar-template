import { validateCardNumber, validateExpiryDate } from './helper/getCardNumber';
import { validateUsernameOrEmail } from './helper/getUsernameOrEmail';

const formValidation = (values, rules) => {
    let errors = {};

    // Add null/undefined check for values and rules
    if (!values || !rules) {
        return errors;
    };

    // Validate flat fields
    for (const field in rules) {
        // skip array fields, we'll handle them seperately
        if (field === 'education' || field === 'workExperiences') continue;

        const value = values[field];
        const rule = rules[field];

        // required field check
        if (rule.required) {
            if (value === undefined || value === null ||
                (typeof value === 'string' && value.trim() === '') ||
                (rule.type === 'file' && !value)) {
                errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
            }
        };

        // Only perform string validations if the value is a string
        if (typeof value === 'string') {
            // Email validation
            if (rule.type === 'email' && value && !/^\S+@\S+\.\S+$/.test(value)) {
                errors[field] = 'Invalid email format!'
            };

            // usernameOrEmail field
            if (field === 'usernameOrEmail') {
                const error = validateUsernameOrEmail(value);
                if (error) errors[field] = error;
                continue;
            }

            // Password validation
            if (field === 'password' || rule.passwordValidation) {
                let passwordErrors = [];

                // Check minimum length
                if (rule.minLength && value.length < rule.minLength) {
                    passwordErrors.push(`at least ${rule.minLength} characters`);
                }

                // Check for uppercase letter
                if (rule.requireUppercase && !/[A-Z]/.test(value)) {
                    passwordErrors.push("one uppercase letter");
                }

                // Check for lowercase letter
                if (rule.requireLowercase && !/[a-z]/.test(value)) {
                    passwordErrors.push("one lowercase letter");
                }

                // Check for number
                if (rule.requireNumber && !/[0-9]/.test(value)) {
                    passwordErrors.push("one number");
                }

                // Check for special character
                if (rule.requireSymbol && !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)) {
                    passwordErrors.push("one special character");
                }

                // Compile all password errors
                if (passwordErrors.length > 0) {
                    errors[field] = `Password must contain ${passwordErrors.join(", ")}`;
                }
            };

            // Confirm password validation
            if (rule.matchField && value !== values[rule.matchField]) {
                errors[field] = `Passwords do not match!`
            };

            // Message validation
            if (rule.minChar && value && value.length < rule.minChar) {
                errors[field] = `The message must be at least ${rule.minChar} characters!`
            };
        }

        // File-specific validations 
        if (rule.type === 'file' && value) {
            // Check file type is specified
            if (rule.fileTypes && value.name) {
                const fileExtension = value.name.split('.').pop().toLowerCase();
                if (!rule.fileTypes.includes(fileExtension)) {
                    errors[field] = `File must be one of: ${rule.fileTypes.join(', ')}`
                }
            };

            // Validate file size if needed
            if (rule.maxSize && value.size > rule.maxSize) {
                errors[field] = `File size must be less than ${rule.maxSize / (1024 * 1024)}MB`
            };
        }

        //  Validation education array fields
        if (rules.education && values.education) {
            values.education.forEach((edu, index) => {
                if (rules.education.instituteName && rules.education.instituteName.required) {
                    const value = edu.instituteName?.trim() || '';
                    if (!value) {
                        errors[`education[${index}].instituteName`] = "Institute Name is required!"
                    };
                };

                if (rules.education.gradDate && rules.education.gradDate.required) {
                    const value = edu.gradDate?.trim() || '';
                    if (!value) {
                        errors[`education[${index}].gradDate`] = "Graduation Date is required!"
                    }
                }
            });
        };

        // Payment method validation
        if (values.selectedPayment) {
            console.log('Validating payment method:', values.selectedPayment);

            // For credit/debit card validation
            if (values.selectedPayment === 'debit card') {
                if (!values.cardDetails) {
                    errors.cardDetails = { general: 'Card details are required' };
                } else {
                    // Create nested error structure
                    const cardErrors = {};
                    let hasCardErrors = false;

                    // Card number validation
                    if (!values.cardDetails.cardNumber) {
                        cardErrors.cardNumber = 'Card number is required';
                        hasCardErrors = true;
                    } else if (!validateCardNumber(values.cardDetails.cardNumber)) {
                        cardErrors.cardNumber = 'Please enter a valid card number';
                        hasCardErrors = true;
                    }

                    // Expiration date validation
                    if (!values.cardDetails.expiryDate) {
                        cardErrors.expiryDate = 'Expiration date is required';
                        hasCardErrors = true;
                    } else if (!validateExpiryDate(values.cardDetails.expiryDate)) {
                        cardErrors.expiryDate = 'Please enter a valid expiration date';
                        hasCardErrors = true;
                    }

                    // CVV validation
                    if (!values.cardDetails.cvv) {
                        cardErrors.cvv = 'Security code is required';
                        hasCardErrors = true;
                    } else if (!/^\d{3,4}$/.test(values.cardDetails.cvv.replace(/\D/g, ''))) {
                        cardErrors.cvv = 'Please enter a valid CVV/Security code';
                        hasCardErrors = true;
                    }

                    // Cardholder name validation (optional)
                    if (values.cardDetails.cardholderName && values.cardDetails.cardholderName.trim() === '') {
                        cardErrors.cardholderName = 'Please enter a valid cardholder name';
                        hasCardErrors = true;
                    }

                    if (hasCardErrors) {
                        errors.cardDetails = cardErrors;
                    }
                };

                // For bank transfer validation
                if (values.selectedPayment === 'bank transfer') {
                    if (!values.bankDetails) {
                        errors.bankDetails = { general: 'Bank details are required' };
                    } else {
                        const bankErrors = {};
                        let hasBankErrors = false;

                        // Bank name validation
                        if (!values.bankDetails.bankName || values.bankDetails.bankName.trim() === '') {
                            bankErrors.bankName = 'Bank name is required';
                            hasBankErrors = true;
                        }

                        // Account name validation
                        if (!values.bankDetails.accountName || values.bankDetails.accountName.trim() === '') {
                            bankErrors.accountName = 'Account name is required';
                            hasBankErrors = true;
                        }

                        // Account number validation
                        if (!values.bankDetails.accountNumber) {
                            bankErrors.accountNumber = 'Account number is required';
                            hasBankErrors = true;
                        } else if (!/^\d{8,17}$/.test(values.bankDetails.accountNumber.replace(/\D/g, ''))) {
                            bankErrors.accountNumber = 'Please enter a valid account number';
                            hasBankErrors = true;
                        }

                        // Conditional validation based on transfer type
                        if (values.bankDetails.transferType === 'domestic') {
                            // Routing number validation for domestic transfers
                            if (!values.bankDetails.routingNumber) {
                                bankErrors.routingNumber = 'Routing number is required';
                                hasBankErrors = true;
                            } else if (!/^\d{9}$/.test(values.bankDetails.routingNumber.replace(/\D/g, ''))) {
                                bankErrors.routingNumber = 'Please enter a valid routing number (9 digits)';
                                hasBankErrors = true;
                            }
                        } else if (values.bankDetails.transferType === 'international') {
                            // SWIFT/BIC code validation for international transfers
                            if (!values.bankDetails.swiftCode) {
                                bankErrors.swiftCode = 'SWIFT/BIC code is required';
                                hasBankErrors = true;
                            } else if (!/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(values.bankDetails.swiftCode.replace(/\s/g, ''))) {
                                bankErrors.swiftCode = 'Please enter a valid SWIFT/BIC code (8-11 characters)';
                                hasBankErrors = true;
                            }
                        }

                        // IBAN validation for international transfers
                        if (!values.bankDetails.iban) {
                            bankErrors.iban = 'IBAN is required';
                            hasBankErrors = true;
                        } else if (!/^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/.test(values.bankDetails.iban.replace(/\s/g, ''))) {
                            bankErrors.iban = 'Please enter a valid IBAN';
                            hasBankErrors = true;
                        }

                        // Bank address validation
                        if (!values.bankDetails.bankAddress || values.bankDetails.bankAddress.trim() === '') {
                            bankErrors.bankAddress = 'Bank address is required';
                            hasBankErrors = true;
                        }

                        if (hasBankErrors) {
                            errors.bankDetails = bankErrors;
                        }
                    }
                }
            };
        };

        return errors;
    };
}

export { formValidation };