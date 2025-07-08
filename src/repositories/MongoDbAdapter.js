import Validator from "../validators/Validator.js";
import NotFoundException from "../exceptions/NotFoundException.js";
import ClassValidator from "../validators/ClassValidator.js";
import Entity from "../entities/Entity.js";

export default class MongoDbAdapter{
    constructor(application) {
        this.app = application;
        this.db = this.app.db;
        this.compiledModels={};
    }
    _getCompiledModels(){
        return this.compiledModels;
    }

    _addCompiledModel(key,model){
        if(this._getCompiledModels()===undefined){
            this.compiledModels={};
        }
        this.compiledModels[key]=model;
    }
    _getCompiledModel(key){
        return this._getCompiledModels()[key];
    }
    save(entity){
        return new Promise(async(resolve,reject)=>{
            try{
                let result = false;
                if(this.isRecord(entity)){
                    result = await this.update(entity);
                }else{
                    result = await this.create(entity);
                }
                return resolve(result)
            }catch (e) {
                return reject(e)
            }
        })
    }
    create(entity){
        return new Promise(async(resolve,reject)=>{
            try{
                ClassValidator.validateClass(entity,Entity);
                let attributes = entity.getAttributes();
                let model = this.prepareDbModel(entity);
                let newRecord = await model.create(attributes);
                let saved = await newRecord.save();
                let result = this.fromDbModelRecord(entity,saved);
                //console.log("Mongo result",result);
                return resolve(result)
            }catch (e) {
                return reject(e)
            }
        })
    }

    update(entity){
        return new Promise(async(resolve,reject)=>{
            try{
                ClassValidator.validateClass(entity,Entity);
                //console.log("Entity",entity,entity["_id"].toString());
                let id = entity["_id"].toString();
                let filter = this.formatIdFilter(id);
                let newAttributeValues = entity.getAttributes();
                // TODO options always empty
                let options = {};
                let saved = await this.prepareDbModel(entity).findOneAndUpdate(filter,newAttributeValues,options);
                newAttributeValues["_id"] = id;
                if(saved){
                    let result = this.fromDbModelRecord(entity,newAttributeValues);
                    this.verifyRecord(result,filter);
                    return resolve(result)
                }else{
                    return reject(new NotFoundException('Could not find object',e.stack,filter));
                }
            }catch (e) {
                return reject(e)
            }
        })
    }

    findRecord(emptyEntity, filter){
        return new Promise(async(resolve,reject)=>{
            try{
                let result = false;
                Validator.validateObject(filter);
                filter=this.fixId(filter);
                //console.log("filter",filter);
                let dbModel = this.prepareDbModel(emptyEntity);
                let record = false;
                try{
                    record = await dbModel.findOne(filter);
                    //console.log("Mongo Record",record);
                    this.verifyRecord(record,filter);
                    result = this.fromDbModelRecord(emptyEntity,record);
                }catch (e){
                    console.log("MongoDbAdapter findRecord error",e.message,{filter});
                }

                return resolve(result);
            }catch (e) {
                return reject(e);
            }
        })
    }
    getRecords(emptyEntity,filter,page,limit){
        return new Promise(async(resolve,reject)=>{
            try{
                //console.log("Mongo getREcords",filter);
                filter=this.fixId(filter);
                //console.log("Mongo getREcords 2",filter);
                let model = this.prepareDbModel(emptyEntity);
                let rawResult = await model.find(filter,page,limit);
                let result = [];
                for(let result_id in rawResult){
                    let record = rawResult[result_id];
                    result[result_id]= this.fromDbModelRecord(emptyEntity,record);
                }
                this.verifyRecord(result,filter);
                return resolve(result)
            }catch (e) {
                return reject(e);
            }
        })
    }
    deleteRecord(emptyEntity,filter){
        return new Promise(async(resolve,reject)=>{
            try{
                filter=this.fixId(filter);
                let result = await this.prepareDbModel(emptyEntity).deleteOne(filter);
                return resolve(result)
            }catch (e) {
                return reject(e)
            }
        })
    }

    deleteRecords(emptyEntity,filter){
        return new Promise(async(resolve,reject)=>{
            try{
                filter=this.fixId(filter);
                let result = await this.prepareDbModel(emptyEntity).deleteMany(filter);
                return resolve(result);
            }catch(e){
                return reject(e)
            }
        })
    };

    formatIdFilter(id){
        Validator.validateString(id,'_id');
        return {'_id':id}
    }
    verifyRecord(searchResult,filter){
        let result = true;
        if(Array.isArray(searchResult) || typeof searchResult === 'object'){
            if(!this.isRecord(searchResult)){
                for(let index in searchResult){
                    if(!this.isRecord(searchResult[index])){
                        result = false;
                    };
                }
            }
        }else{
            result = false;
        }
        if(!result){
            try{
                throw "Error";
            }catch (e) {
                throw new NotFoundException('Could not find object',e.stack,filter);
            }
        }

    }
    isRecord(record){
        return record && record[this.getIdField()];
    }

    getIdField(){
        return ["_id"];
    }
    fromDbModelRecord(emptyEntity,record){
        ClassValidator.validateClass(emptyEntity,Entity);
        let entity = new (emptyEntity.constructor)();
        entity.setFields(record,false);
        entity["_id"]=record["_id"].toString();
        entity["id"]=record["_id"].toString();
        return entity;
    }

    prepareDbModel(entity){
        let model = false;
        let key = entity.table();
        console.log("prepareDbModel key",key);
        console.log("prepareDbModel this._getCompiledModels()",this._getCompiledModels());
        if(!(key in this._getCompiledModels())){
            model = this.db.convertEntityToDbModel(entity);
            this._addCompiledModel(key,model);
        }else{
            model = this._getCompiledModel(key);
        }
        return model;
    }

    getGreaterThenParameter(value){
        return {$gt: value}
    }

    getLessThenParameter(value){
        return {$lt: value}
    }

    getGreaterEqualsParameter(value){
        return {$gte: value}
    }

    getLessEqualsParameter(value){
        return {$lte: value}
    }

    fixId(filter){
        if(filter["id"]){
            filter["_id"]=filter["id"];
            delete filter["id"];
        }
        return filter;
    }
}