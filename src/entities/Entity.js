'use strict';

import Model from "../db/Model.js";
import Validator from "../validators/Validator.js";
import NotImplementedException from "../exceptions/NotImplementedException.js";
export default class Entity extends Model{

    static create(data){
        let newEntity = new this();
        newEntity.setAttributes(data);
        return newEntity;
    }

    setId(id){
        Validator.validateId(id);
        this._id=id;
    }

    getId(){
        return String(this._id) ;
    }

    setAttribute(attribute_key,attribute_value,validate=true){
        Validator.validateString(attribute_key);
        if(attribute_value == null || attribute_value == undefined){
            attribute_value = this._getDefaultValue(attribute_key);
        }
        this[attribute_key]=attribute_value;
        this.fields[attribute_key]=attribute_value;
        if(validate){
            this.validateAttribute(attribute_key,attribute_value);
        }
    }

    getAttribute(attribute_key) {
        return this.getAttributes()[attribute_key];
    }

    static getAttributesList(){
        return Object.keys((new this()).getRules());
    }
    getAttributesList(){
        //console.log("getAttributesList",Object.keys(this.getRules()),this.getRules());
        return Object.keys(this.getRules());
    }

    getAttributes(){
        return this.getFields();
    }

    getFields(){
        return this.fields;
    }

    setAttributes(attributes){
        return this.setFields(attributes);
    }

    setFields(attributes,validate=true){
        Validator.validateObject(attributes,"attributes");
        for(let attribute_index in this.getAttributesList()){
            if(this.fields===false || this.fields===undefined){
                this.fields = {};
            }
            let attribute_key = this.getAttributesList()[attribute_index];
            let attribute_value = attributes[attribute_key];
            if(attribute_key in attributes){
                this.setAttribute(attribute_key,attribute_value,validate);
            }
        }
        if(validate){
            return this.validate();
        }
        return true;
    }

    static getRules(){
        return (new this()).getRules();
    }

    // combine and parental _rules() and current rules()
    getRules(){
        let allRules = this._parentRules();
        for(let key in this.rules()){
            let rule = this.rules()[key];
            allRules[key]=rule;
        }
        return allRules;
    }

    // method be overriden when needed
    _parentRules(){
        return super.getRules();
    }

    // used to set attribute validation rules. Not for direct calling
    rules(){
        return {};
        //throw new NotImplementedException("Method 'rules()' not implemented");
    }

    static table(){
        return (new Entity()).table();
    }

    table(){
        throw new NotImplementedException("Method 'table()' not implemented");
    }

    static createFromArray(attributes){
        let newRecord = new this();
        let newAttributes = newRecord._populateEmptyWithDefaults(attributes);
        newRecord.setFields(newAttributes);
        return newRecord;
    }

    validateAttribute(attribute_key,attribute_value){
        let rule = this.getRules()[attribute_key];
        switch (rule["type"]){
            case Boolean:
                Validator.validateBoolean(attribute_value,attribute_key);
                break;
            case String:
                Validator.validateString(attribute_value,attribute_key);
                break;
            case Number:
                Validator.validateNumber(attribute_value,attribute_key);
                break;
            default:
                throw new Error(`Unknown rule data type in rule ${this.constructor.name}.${attribute_key}`);
        }
        return true;
    }

    validate(){
        try{
            this.preValidate();
            for(let attribute_index in this.getAttributesList()){
                let attribute_key = this.getAttributesList()[attribute_index];
                let attribute_value = this.getAttribute(attribute_key);
                this.validateAttribute(attribute_key,attribute_value);
            }
            this.postValidate();
            return true;
        }catch (e){
            throw new Error(e.message,e.stack);
        }
    }

    preValidate(){
        return false;
    }

    postValidate(){
        return false;
    }

    getAttributeNames(){
        return Object.keys(this.rules());
    }

    static getAttributeNames(){
        return Object.keys((new this()).rules());
    }

    _populateEmptyWithDefaults(oldAttributes){
        let newAttributes = {};
        for(let attribute_name of this.getAttributeNames()){
            if(oldAttributes[attribute_name]===undefined){
                newAttributes[attribute_name]=this._getDefaultValue(attribute_name)
            }else{
                newAttributes[attribute_name] = oldAttributes[attribute_name];
            }
        }
        return newAttributes;
    }

    _getDefaultValue(attribute_name){
        if(this.getRules()[attribute_name]["default"]){
            return this.getRules()[attribute_name]["default"];
        }
        return null;
    }
}