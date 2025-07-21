import { paymentConfig } from "../../config/configData";

function detectCardTypes(cardNumber) {
    const digitsOnly = cardNumber.replace(/\D/g, '');

    const patterns = {
        visa: /^4/,
        mastercard: /^(5[1-5]|2[2-7])/,
        amex: /^3[47]/,
        discover: /^6(?:011|5)/,
        diners: /^3(?:0[0-5]|[68])/,
        jcb: /^(?:2131|1800|35)/
    };

    for (const [type, pattern] of Object.entries(patterns)) {
        if (pattern.test(digitsOnly)) return type;
    }

    return 'unknown';
};

function formatCardNumber(cardNumber) {
    const digitsOnly = cardNumber.replace(/\D/g, '');
    const cardType = detectCardTypes(digitsOnly);

    if (cardType === 'amex') {
        return digitsOnly.replace(/(\d{4})(\d{6})(\d{5})/, '$1 $2 $3').trim();
    }

    return digitsOnly.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
};

function validateExpiryDate(expiryDate) {
    if (!expiryDate) return false;

    try {
        const [year, month] = expiryDate.split('-').map(part => parseInt(part, 10));

        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;

        if (month < 1 || month > 12) return false;

        if (year < currentYear || (year === currentYear && month < currentMonth)) {
            return false;
        }

        return true;
    } catch (error) {
        console.log("Expiry date validation error:", error);
        return false;
    }
};

function validateCardNumber(cardNumber) {
    if (!cardNumber) return false;

    const digitsOnly = cardNumber.replace(/\D/g, '');

    if (digitsOnly.length < 13 || digitsOnly.length > 19) {
        return false;
    }

    if (!paymentConfig.validation.enableLuhnCheck) {
        return true;
    }

    let sum = 0;
    let shouldDouble = false;

    for (let i = digitsOnly.length - 1; i >= 0; i--) {
        let digit = parseInt(digitsOnly.charAt(i), 10);

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
};

export { validateCardNumber, validateExpiryDate, formatCardNumber, detectCardTypes };