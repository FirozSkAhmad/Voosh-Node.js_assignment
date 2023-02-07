const isValid = function (value) {
    if (typeof value !== "string" || value.trim().length === 0) {
        return false;
    } else {
        return true;
    }
};

function isValidPhone(value) {
    let phnRegex = /^([9876]{1})([0-9]{9})*$/;
    return phnRegex.test(value);
}

function isValidNumber(value) {
    let numRegex = /^[0-9]+$/;
    return numRegex.test(value);
}

function checkPassword(str) {
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
    return re.test(str);
}

module.exports = { isValid, isValidPhone, isValidNumber, checkPassword }