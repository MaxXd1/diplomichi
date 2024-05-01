export const validatePassword = (password: string) => {
    return password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password);
};

export const isValidEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
};