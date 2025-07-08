'use strict';
import Validator from "../../validators/Validator.js";
import AbstractCrudHandlers from "./AbstractCrudHandlers.js";
import DocumentRepository from "../../repositories/document/DocumentRepository.js";
import DocumentRegistrator from "../../registerDocument/DocumentRegistrator.js";
export default class DocumentHandlers extends AbstractCrudHandlers {
    constructor(repository){
        Validator.validateClass(repository,DocumentRepository);
        super(repository);
    }

    fullRegisterDocument(document_url, document_name){
        return new Promise(async(resolve,reject)=>{
            try{
                const document = await DocumentRegistrator.downloadAndPlaceDocument(document_url, document_name);
                return resolve(document);
            }catch(e){
                return reject(e);
            }
        })
    }
}