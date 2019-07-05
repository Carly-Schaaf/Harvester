const Validator = require('validator');
const customValidation = require('./valid-text');

module.exports = function produceValid(data) {
    const errors = {};
    
    data.name = customValidation.validText(data.name) ? data.name : '';
    data.type = customValidation.validText(data.type) ? data.type : '';
    data.accessible = customValidation.validNum(data.accessible) ? (data.accessible).toString() : '';
    data.abundance = customValidation.validNum(data.abundance) ? (data.abundance).toString() : '';

    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field can't be empty";
    }
    if (Validator.isEmpty(data.type)) {
        errors.type = "Type field can't be empty";
    }
    if (Validator.isEmpty(data.accessible)) {
        errors.accessible = "Accessibility field can't be empty";
    }
    if (Validator.isEmpty(data.abundance)) {
        errors.abundance = "Abundance field can't be empty";
    }

    if (!Validator.isIn(data.type, ["herb", "fruit", "vegetable"])) {
        errors.type = "The plant must be an herb, fruit, or vegetable";
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}