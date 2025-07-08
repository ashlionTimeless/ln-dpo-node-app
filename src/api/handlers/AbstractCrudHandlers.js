'use strict';
import Validator from "../../validators/Validator.js";
export default class AbstractCrudHandlers {
    constructor(repository){
        this.repository = repository;
    }

    getRepository(){
        return this.repository;
    }

    getAllEntities(filter){
        return new Promise(async(resolve,reject)=>{
            try{
                let entities = await this.getRepository().getRecords(filter);
                return resolve(entities);
            }catch(e){
                return reject(e);
            }
        })  
    }       
    
    getEntity(external_id){
        return new Promise(async(resolve,reject)=>{
            try{
                let filter = {external_id:external_id};
                let entity = await this.getRepository().getRecord(filter);
                return resolve(entity);
            }catch(e){
                return reject(e);
            }
        })
    }

    createEntity(data){
        return new Promise(async(resolve,reject)=>{
            try{
                Validator.validateObject(data,"data");
                let entity = await this.getRepository().createRecord(data);
                return resolve(entity);
            }catch(e){
                return reject(e);
            }
        })
    }

    updateEntity(external_id,data){
        return new Promise(async(resolve,reject)=>{
            try{
                let filter = {external_id:external_id};
                let entity = await this.getRepository().getByFilterAndUpdateRecord(filter,data);
                return resolve(entity);
            }catch(e){
                return reject(e);
            }
        })
    }

    deleteEntity(external_id){
        return new Promise(async(resolve,reject)=>{
            try{
                let filter = {external_id:external_id};
                let result = await this.getRepository().deleteRecords(filter);
                return resolve(result);
            }catch(e){
                return reject(e);
            }
        })
    }
}