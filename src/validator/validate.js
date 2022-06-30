const mongoose = require('mongoose');
// email
const isValidEmail = function (value) {
    if (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(value)) { return true }
    else return false
}
// number
const isValidNumber = function (value) {
    if (/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(value)) { return true }
    else return false
}
// body/params input
const isValid = function (value) {
    if (typeof (value) === "undefined" || typeof (value) == null) return false;
    if (typeof (value) === "string" && value.trim().length == 0) return false
    return true;
}

// url
const isUrl = function (value) {
    if (/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(value)) { return true }
    else return false
}

module.exports.isValidEmail = isValidEmail
module.exports.isValidNumber = isValidNumber
module.exports.isValid = isValid
module.exports.isUrl = isUrl