const mongoose = require('mongoose');

const isValidEmail = function (value) {
    if (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(value)) { return true }
    else return false
}

const isValidNumber = function (value) {
    if (/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(value)) { return true }
    else return false
}

module.exports.isValidEmail=isValidEmail
module.exports.isValidNumber=isValidNumber