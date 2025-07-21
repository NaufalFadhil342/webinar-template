export function validateUsernameOrEmail(value) {
    if (!value || value.trim() === '') {
        return "Username or email is required";
    };

    const trimmedValue = value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmail = emailRegex.test(trimmedValue);

    if (isEmail) {
        return null;
    };

    if (trimmedValue.length < 3) {
        return "Username must be at least 3 characters";
    };

    return null;
};