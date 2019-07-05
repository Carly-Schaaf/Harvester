module.exports = {
    validText: (str) => {
        return typeof str === 'string' && str.trim().length > 0;
    },
    validNum: (num) => {
        return typeof num === 'number'
    }

}