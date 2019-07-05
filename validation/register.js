const Validator = require('validator');
const customValidation = require('./valid-text');

module.exports = function validateRegisterInput(data) {
    let errors = {};
    data.username = customValidation.validText(data.username) ? data.username : '';
    data.password = customValidation.validText(data.password) ? data.password : '';
    data.password2 = customValidation.validText(data.password2) ? data.password2 : '';

    if (!Validator.isLength(data.username, {min: 2, max: 30})) {
        errors.username = 'Username must be between 2 and 30 characters';
    }

    if (Validator.isEmpty(data.username)) {
        errors.username = 'Username field is required';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm Password field is required';
    }

    if (!Validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password2 = 'Password must be at least 6 characters';
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords must match';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}