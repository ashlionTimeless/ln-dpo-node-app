'use strict';

import NotImplementedException from "../exceptions/NotImplementedException.js";

export default class Model{

    getMethods(){
        return ["create","update","delete","save"];
    }

    create(...params){
        throw new NotImplementedException(`Method 'create' is not implemented in class ${this.constructor.name}`);
    }
    update(...params){
        throw new NotImplementedException(`Method 'update' is not implemented in class ${this.constructor.name}`);
    }
    save(){
        throw new NotImplementedException(`Method 'save' is not implemented in class ${this.constructor.name}`);
    }

    findOne(filter,options){
        throw new NotImplementedException(`Method 'findOne' is not implemented in class ${this.constructor.name}`);
    }
    find(filter,page,limit){
        throw new NotImplementedException(`Method 'find' is not implemented in class ${this.constructor.name}`);
    }
    findOneAndUpdate(filter,newAttributeValues,options){
        throw new NotImplementedException(`Method 'findOneAndUpdate' is not implemented in class ${this.constructor.name}`);
    }

    delete(filter,options){
        throw new NotImplementedException(`Method 'delete' is not implemented in class ${this.constructor.name}`);
    }

    deleteOne(filter,options){
        throw new NotImplementedException(`Method 'deleteOne' is not implemented in class ${this.constructor.name}`);
    }
    deleteMany(filter){
        throw new NotImplementedException(`Method 'deleteMany' is not implemented in class ${this.constructor.name}`);
    };

    getRules(){
        return {};
    }
}