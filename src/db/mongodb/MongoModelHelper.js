import MongoModel from "./MongoModel.js";
import ClassValidator from "../../validators/ClassValidator.js";
import Entity from "../../entities/Entity.js";
import Validator from "../../validators/Validator.js";

export default class MongoModelHelper{
    static prepareDbModel(entity){
        ClassValidator.validateClass(entity,Entity);
        let entityData = MongoModelHelper.prepareDataForModel(entity);
        let collectionName = entityData["collectionName"];
        let fields = entityData["fields"];
        let indexFields=entityData["indexFields"];
        let indexOptions=entityData["indexOptions"];
        Validator.validateString(entityData["collectionName"],"collectionName");
        Validator.validateObject(entityData["fields"],"fields");
        Validator.validateObject(entityData["indexFields"],"indexFields");
        Validator.validateObject(entityData["indexOptions"],"indexOptions");
        let methods=entityData["methods"];
        let model = new MongoModel(collectionName,fields,indexFields,indexOptions,methods);
        return model;
    }
    
    static prepareDataForModel(entity){
        let rules = entity.getRules();
        let fields = {};
        let indexFields = {};
        let indexOptions = {};
        // TODO: add methods
        let methods = {};
        for(let attribute_key in rules){
            let rule = rules[attribute_key];
            fields[attribute_key]= rule["type"];
            if(rule["index"]){
                indexFields[attribute_key]=1;
            }
            if(rule["unique"]){
                indexOptions[attribute_key]=true;
            }
        }
        return {
            "collectionName":entity.table(),
            "fields":fields,
            "indexFields":indexFields,
            "indexOptions":indexOptions
        }
    }
}