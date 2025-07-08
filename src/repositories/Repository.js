import NotFoundException from '../exceptions/NotFoundException.js';
import Entity from '../entities/Entity.js';
import Validator from "../validators/Validator.js";
import ClassValidator from "../validators/ClassValidator.js";
import MongoDbAdapter from "./MongoDbAdapter.js";

export default class Repository{
    constructor(application,EntityClass){
        this.app = application;
        this.setEntityClass(EntityClass);
    }

    installDb(){
        try{
            let dbProvider = false;
            dbProvider = new MongoDbAdapter(this.app);
            this.db = dbProvider;
        }catch (e){
            throw new Error(e.message)
        }
    }
    getDb(){
        if(this.db===undefined){
            this.installDb();
        }
        return this.db;
    }
    // sets descendent of class Entity to be used as main entity of this repository
    setEntityClass(EntityClass){
        Validator.verifyTwoClassesRelation(EntityClass,Entity,'Invalid Entity Class was passed into module constructor');
        this.entityClass = EntityClass;
    }
    getEntityClass(){
        return this.entityClass;
    }



    save(entity){
        return new Promise(async(resolve,reject)=>{
            try{
                ClassValidator.validateClass(entity,Entity);
                let result = false;
                if(this.getDb().isRecord(entity)){
                    result = await this.updateRecord(entity);
                }else{
                    result = await this.getDb().create(entity);
                }
                return resolve(result)
            }catch (e) {
                return reject(e)
            }
        })
    }

    createRecord(attributes){
        return new Promise(async(resolve,reject)=>{
            try{
                Validator.validateObject(attributes,"attributes");
                
                //console.log("Repository createRecord",this.getEntityClass());
                let entity = (this.getEntityClass()).createFromArray(attributes);
                let result = await this.getDb().create(entity);
                //console.log("Repository createRecord result",result);
                return resolve(result)
            }catch (e) {
                return reject(e)
            }
        })
    }

    getByFilterAndUpdateRecord(filter,newAttributes){
        return new Promise(async(resolve,reject)=>{
            try{
                let record = await this.getRecord(filter);
                record.setFields(newAttributes);
                let result = await this.updateRecord(record);
                return resolve(result);
            }catch (e) {
                return reject(e);
            }
        })
    }
    
    findAndUpdateRecord(id,newAttributes){
        return new Promise(async(resolve,reject)=>{
            try{
                //console.log("findAndUpdateRecord id",id,newAttributes)
                let record = await this.getRecordById(id);
                record.setFields(newAttributes);
                let result = await this.updateRecord(record);
                return resolve(result);
            }catch (e) {
                return reject(e);
            }
        })
    }
    updateRecord(entity){
        return new Promise(async(resolve,reject)=>{
            try{
                let result = await this.getDb().update(entity);
                return resolve(result)
            }catch (e) {
                return reject(e)
            }
        })
    }

    getRecordById(id){
        return new Promise(async(resolve,reject)=>{
            try{
                let filter = this.getDb().formatIdFilter(id);
                let result = await this.getRecord(filter);
                return resolve(result);
            }catch (e) {
                return reject(e);
            }
        })
    }
    getRecord(filter){
        return new Promise(async(resolve,reject)=>{
            try{
                Validator.validateObject(filter);
                let result = await this.findRecord(filter);
                if(!result){
                    let tmp = new (this.getEntityClass())();
                    throw new NotFoundException(`Could not find entities of type ${tmp.constructor.name} with filter ${JSON.stringify(filter)}`);
                }
                return resolve(result);
            }catch (e) {
                return reject(e);
            }
        })
    }

    findRecord(filter){
        return new Promise(async(resolve,reject)=>{
            try{
                Validator.validateObject(filter);
                let emptyEntity = this.prepareEmptyEntity();
                let result = await this.getDb().findRecord(emptyEntity,filter);
                return resolve(result);
            }catch (e) {
                return reject(e);
            }
        })
    }
    getRecords(filter,page,limit){
        return new Promise(async(resolve,reject)=>{
            try{
                Validator.validateObject(filter);
                let emptyEntity = this.prepareEmptyEntity();
                let result = await this.getDb().getRecords(emptyEntity,filter,page,limit);
                if(!result){
                    throw new NotFoundException(`Could not find entities of type ${this.getEntityClass()} with filter ${JSON.stringify(filter)}`);
                }
                return resolve(result);
            }catch (e) {
                return reject(e);
            }
        })
    }

    deleteRecord(id){
        return new Promise(async(resolve,reject)=>{
            try{
                Validator.validateId(id,"Id");
                let filter = this.getDb().formatIdFilter(id);
                let emptyEntity = this.prepareEmptyEntity();
                let result = await this.getDb().deleteRecord(emptyEntity,filter);
                return resolve(result)
            }catch (e) {
                return reject(e)
            }
        })
    }
    deleteRecords(filter){
        return new Promise(async(resolve,reject)=>{
            try{
                let emptyEntity = this.prepareEmptyEntity();
                let result = await this.getDb().deleteRecords(emptyEntity,filter);
                return resolve(result);
            }catch(e){
                return reject(e)
            }
        })
    };

    prepareEmptyEntity(){
        return new (this.getEntityClass())();
    }
}
