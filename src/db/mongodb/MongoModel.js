'use strict';

import Model from "../Model.js";
export default class MongoModel extends Model{
    constructor(collectionName,fields,indexFields={}, indexOptions={},methods={}){
        super();
        this.collectionName = collectionName;
        this.fields = fields;
        this.indexFields=indexFields;
        this.indexOptions=indexOptions;
        this.methods = methods;
    }
}