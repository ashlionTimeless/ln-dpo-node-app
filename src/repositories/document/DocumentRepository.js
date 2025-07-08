import  Repository from '../Repository.js';
import Document from "../../entities/document/Document.js";
export default class DocumentRepository extends Repository{
    constructor(app){
        super(app,Document);
    };
}