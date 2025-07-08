'use strict';
import dotenv from 'dotenv';
dotenv.config();
console.log('MongoDbWrapper');
console.log(process.env.MONGODB_URL);
console.log(process.env.MONGODB_DB);
console.log(process.env.MONGODB_USER);
console.log(process.env.MONGODB_PASSWORD);
import MongoModelHelper from "./MongoModelHelper.js";

import Mongoose from 'mongoose';
Mongoose.Promise = Promise;

export default class MongoDbWrapper{
    constructor(app){
        this.app = app;
    };

    init(){
        return new Promise(async(resolve,reject)=>{
            try{
                const uri = this.getDbUrl();
                let options = this.getDbOptions();
                let db = await this.connectToDb(uri, options);
                return resolve(this);
            }catch(e){
                return reject(e);
            }
        })
    }

    convertEntityToDbModel(entity){
        try{
            let model = MongoModelHelper.prepareDbModel(entity);
            var schema =  new Mongoose.Schema(model.fields);
            schema.methods = model.methods;
            schema.index(model.indexFields, model.indexOptions);
            let compiledModel = Mongoose.model(model.collectionName,schema);
            return compiledModel;
        }catch (e) {
            console.log(e.message);
            return false;
        }
    }
    getDb(){
        return this.db;
    }
    getDbUrl(){
        let params = {
            protocol:"mongodb://",
            connectUrl: this.getMongoUrl(),
            dbName: this.getDbName(),
            parsedCredentials: this.getParsedCredentials()
        };

        let url = params.protocol+''+params.parsedCredentials+''+params.connectUrl+'/'+params.dbName;
        return url;
    }
    getMongoUrl(){
        return process.env.MONGODB_URL;
    }
    getDbName(){
        return process.env.MONGODB_DB;
    }
    getParsedCredentials(){
        let user = this.getDbUser();
        let password = this.getDbPassword();
        let parsed = '';
        if((user && password) && (user!=='' && password!=='')){
            parsed = user+":"+password+"@";
        }
        return parsed;
    }
    getDbUser(){
        return process.env.MONGODB_USER;
    }
    getDbPassword(){
        return process.env.MONGODB_PASSWORD;
    }
    getDbOptions(){
        return {
            useNewUrlParser: true,
            bufferCommands:false,
        };
    }

    connectToDb(uri, options){
        return new Promise(async(resolve,reject)=>{
            const db = Mongoose.connect(uri, options);
            db.then(()=>{
                    this.db = db;
                    return resolve(this);
                }).catch((error)=>{
                    return reject(error);
                });
        })
    }
};