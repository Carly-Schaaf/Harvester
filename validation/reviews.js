const Validator = require('validator');
const customValidation = require('./valid-text');

module.exports = function reviewValid(data) {
    const errors = {};

    data.accessible = customValidation.validNum(data.accessible) ? (data.accessible).toString() : '';
    data.abundance = customValidation.validNum(data.abundance) ? (data.abundance).toString() : '';
    data.accuracy = customValidation.validNum(data.accuracy) ? (data.accuracy).toString() : '';


    if (Validator.isEmpty(data.accessible)) {
        errors.accessible = "Accessibility field can't be empty";
    }
    if (Validator.isEmpty(data.abundance)) {
        errors.abundance = "Abundance field can't be empty";
    }
    if (Validator.isEmpty(data.accuracy)) {
        errors.accuracy = "Accuracy field can't be empty";
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}