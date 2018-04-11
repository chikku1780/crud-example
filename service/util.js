const util = {};

util.isUndefinedNullEmptyString = function (obj) {
    return obj === undefined || obj === null || obj === '';
};

util.isArray = function (obj) {
    if (!util.isUndefinedNullEmptyString(obj)) {
        return !!(typeof obj === 'object' && obj && Object.prototype.toString.call(obj) === '[object Array]');
    }
    return false;
};

util.isObject = function (obj) {
    if (!util.isUndefinedNullEmptyString(obj)) {
        return !!(typeof obj === 'object' && obj && Object.prototype.toString.call(obj) === '[object Object]');
    }
    return false;
};

util.isString = function (obj) {
    if (!util.isUndefinedNullEmptyString(obj)) {
        return !!(typeof obj === 'string' && obj);
    }
    return false;
};


util.isNumber = function (obj) {
    if (!util.isUndefinedNullEmptyString(obj)) {
        return !(typeof obj !== 'number' || isNaN(obj));
    }
    return false;
};

util.isEmptyArray = function (obj) {
    return util.isArray(obj) && obj.length === 0;
};

util.isEmptyObject = function (obj) {
    return util.isObject(obj) && Object.keys(obj).length === 0;
};

util.capitalize = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

util.formErrorMessage = function (title, message, error) {
    return {
        status: 400,
        title: title,
        message: message,
        error: error
    };
};

util.formSuccessMessage = function (title, message, data) {
    return {
        status: 400,
        title: title,
        message: message,
        data: data
    };
};

module.exports = util;