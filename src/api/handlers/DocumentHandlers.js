'use strict';
import Validator from "../../validators/Validator.js";
import AbstractCrudHandlers from "./AbstractCrudHandlers.js";
import DocumentRepository from "../../repositories/document/DocumentRepository.js";
import DocumentRegistrator from "../../registerDocument/DocumentRegistrator.js";
import ExternalIdGenerator from "../../helpers/ExternalIdGenerator.js";
import DocumentFilepathHelper from "../../helpers/DocumentFilepathHelper.js";
export default class DocumentHandlers extends AbstractCrudHandlers {
    constructor(repository){
        Validator.validateClass(repository,DocumentRepository);
        super(repository);
    }

    fullRegisterDocument(document_url, document_name,){
        return new Promise(async(resolve,reject)=>{
            try{
                console.log("DocumentHandlers fullRegisterDocument document_url",document_url);
                console.log("DocumentHandlers fullRegisterDocument document_name",document_name);
                const external_id = ExternalIdGenerator.generateExternalId();
                const filepath = await DocumentFilepathHelper.composeFilepath(document_url,document_name);
                console.log("DocumentHandlers fullRegisterDocument filepath",filepath);
                const uploaded = await DocumentRegistrator.downloadAndPlaceDocument(document_url, filepath);
                if(uploaded){
                    const document = await this.repository.createRecord({
                        "external_id":external_id,
                        "source_url":document_url,
                        "title":document_name,
                        "filepath":filepath,
                        "indexed":false
                    })
                    return resolve(document);
                }else{
                    return reject(new Error("Document not uploaded"));
                }
            }catch(e){
                return reject(e);
            }
        })
    }
}