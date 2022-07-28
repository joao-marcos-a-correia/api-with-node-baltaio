'use strict';

let errors = [];

class ValidationContract {
    errors = [];
    
    static isRequired = (value, message) => {
        if (!value || value.length <= 0)
        errors.push({ message: message });
    }
    
    static hasMinLen = (value, min, message) => {
        if (!value || value.length < min)
        errors.push({ message: message });
    }
    
    static hasMaxLen = (value, max, message) => {
        if (!value || value.length > max)
        errors.push({ message: message });
    }
    
    static isFixedLen = (value, len, message) => {
        if (value.length != len)
        errors.push({ message: message });
    }
    
    static isEmail = (value, message) => {
        var reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
        if (!reg.test(value))
        errors.push({ message: message });
    }
    
    static errors = () => { 
        return errors; 
    }
    
    static clear = () => {
        errors = [];
    }
    
    static isValid = () => {
        return errors.length == 0;
    }
}

module.exports = ValidationContract;