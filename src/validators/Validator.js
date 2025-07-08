'use strict';
import ClassValidator from "./ClassValidator.js";

const _STRING = 'string';
const _NUMBER = 'number';
const _BOOLEAN = 'boolean';
const _URL = 'url';
const _JSON = 'json';
const _OBJECT = 'object';
const _FUNCTION = 'function';
const _ARRAY = 'array';

export default class Validator{
    static validateId(value){
        Validator.validateString(value,"Id");
    }
    static validateEmail(value){
        Validator.validateString(value,"Email");
    }
    static validateString(value,name,silent){
        Validator._validate(value,_STRING,name,silent);
    };
    static validateNumber(value,name,silent){
        Validator._validate(value,_NUMBER,name,silent);
    };
    static validateBoolean(value,name,silent){
        Validator._validate(value,_BOOLEAN,name,silent);
    };
    static validateObject(value,name,silent){
        Validator._validate(value,_OBJECT,name,silent);
    };

    static validateFunction(value,name,silent){
        Validator._validate(value,_FUNCTION,name,silent);
    }

    static validateClass(object,expectedClass){
        ClassValidator.validateClass(object,expectedClass);
    }
    
    static validateObjectNotEmpty(value,name,silent){
        if(Object.keys(value).length === 0){
            throw new Error(`Object ${name} is empty`);
        }
    }
    static validateUrl(value,name,silent){
        Validator._validate(value,_URL,name,silent);
    };
    static validateArray(value,name,silent){
        Validator._validate(value,_ARRAY,name,silent);
    };
    static verifyTwoClassesRelation(childClass,parentClass){
        ClassValidator.verifyTwoClassesRelation(childClass,parentClass);
    };

    static validateJson(value,name,silent){
        Validator._validate(value,_JSON,name,silent);
    };
    static _validate(value, type,field,silent)
    {
        if(silent===undefined){
            silent = false;
        }
        if(value === undefined){
            throw new Error(field+' is '+undefined);
        }
        var msg='';
        if(!field){
            field = 'Some '+ type;
        }
        try{
            switch (type) {
                case _JSON:
                    if(_innerValidateJSON(value)){
                        return true;
                    }else{
                        throw _typeErrorMessage(value,type,field);
                    }
                    break;
                case _OBJECT:
                    if(_innerValidateObject(value)){
                        return true;
                    }else{
                        throw _typeErrorMessage(value,type,field);
                    }
                    break;
                case _URL:
                    if(_innerValidateUrl(value)){
                        return true;
                    }else{
                        throw _typeErrorMessage(value,type,field);
                    }
                    break;
                case _BOOLEAN:
                    if(_innerValidateBoolean(value)){
                        return true;
                    }else{
                        throw _typeErrorMessage(value,type,field);
                    }
                    break;
                case _NUMBER:

                    if(_innerValidateNumber(value)){
                        return true;
                    }else{
                        throw _typeErrorMessage(value,type,field);
                    }
                    break;
                case _STRING:
                    if(_innerValidateString(value)){
                        return true;
                    }else{
                        throw _typeErrorMessage(value,type,field);
                    }
                    break;
                case _FUNCTION:
                    if(_innerValidateFunction(value)){
                        return true;
                    }else{
                        throw _typeErrorMessage(value,type,field);
                    }
                    break;
                case _ARRAY:
                    if(_innerValidateArray(value)){
                        return true;
                    }else{
                        throw _typeErrorMessage(value,type,field);
                    }
                    break;
                default:
                    throw new Error('Unknown datatype "'+type+'"');
            }
        }catch(e){
            if(typeof e === _STRING){
                var error = new Error();
                error.message = e;
                error.data = {type:type,name:field};
                if(!silent){
                    error.data.value = value;
                }
                throw error;
            }
            throw e;
        }

        function _innerValidateString(value){

            return typeof value === _STRING;
        }
        function _innerValidateNumber(value){
            if(isNaN(value)){
                throw new Error('Value is NaN');
            }
            if(parseInt(value)== new Number(value) || parseFloat(value)== new Number(value)){
                return true;
            }
            return false;
        }
        function _innerValidateBoolean(value){
            return typeof value === _BOOLEAN;
        }
        function _innerValidateObject(value){
            return typeof value === _OBJECT;
        }
        function _innerValidateUrl(value){
            if(typeof value === _STRING){
                var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
                return regexp.test(value);
            }
        }
        function _innerValidateFunction(value){
            return typeof value === _FUNCTION;
        }
        function _innerValidateArray(value){
            return Array.isArray(value);//typeof value === _ARRAY;
        }
        function _innerValidateJSON(value){
            _innerValidateString(value);
            try{
                value = JSON.parse(value);
                return _innerValidateObject(value);
            }catch (e) {
                return false;
            }
        }
        function _typeErrorMessage(value,type,field){
            var text = '';
            console.log("Validator _typeErrorMessage value",value,type,field);
            
            if(field){
                if(value == null || value == undefined){
                    text = field+" must be of type "+type+", "+value+" given.";
                }else{
                    text = field+" must be of type "+type+", "+typeof value+" given.";
                }
            }else{
                text = 'Data type "'+type+'" was expected, '+typeof value+' received instead';
            }
            return new Error(text);
        }
        return true;
    };
};