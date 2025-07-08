import dotenv from 'dotenv';
dotenv.config();
import DocumentHandlers from "./api/handlers/DocumentHandlers.js";
import ControlGroupHandlers from "./api/handlers/ControlGroupHandlers.js";
import ControlCheckHandlers from "./api/handlers/ControlCheckHandlers.js";
import DocumentRepository from "./repositories/document/DocumentRepository.js";
import ControlGroupRepository from "./repositories/controls/ControlGroupRepository.js";
import ControlCheckRepository from "./repositories/controls/ControlCheckRepository.js";
import MongoDbWrapper from "./db/mongodb/MongoDb.js";
import server from "./server.js";

class Application {
    constructor(){
        this.server = server;
        this.db = new MongoDbWrapper(this);
        this.documentRepository = new DocumentRepository(this);
        this.controlGroupRepository = new ControlGroupRepository(this);
        this.controlCheckRepository = new ControlCheckRepository(this);
        this.documentHandlers = new DocumentHandlers(this.documentRepository);
        this.controlGroupHandlers = new ControlGroupHandlers(this.controlGroupRepository);
        this.controlCheckHandlers = new ControlCheckHandlers(this.controlCheckRepository);
    }

    init(){
        return new Promise(async(resolve,reject)=>{
            try{
                await this.db.init();
                this.setHandlers();
                return resolve(true);
            }catch(e){
                return reject(e);
            }
        })
    }

    getServer(){
        return this.server;
    }

    setHandlers(){
        console.log('setHandlers');
        this.server.post('/document/full-register',async(req,res)=>{
            try{
                const { document_url, title } = req.body;
                const document = await this.documentHandlers.fullRegisterDocument(document_url, title);
                res.status(200).json(document);
            }catch(e){
                res.status(500).json({error: e.message});
            }
        });

        this.server.post('/document',async(req,res)=>{
            try{
                const data = req.body;
                const document = await this.documentHandlers.createEntity(data);
                res.status(200).json(document);
            }catch(e){
                res.status(500).json({error: e.message});
            }
        });

        this.server.get('/document/:key',async(req,res)=>{
            try{
                const { key } = req.params;
                const document = await this.documentHandlers.getEntity(key);
                res.status(200).json(document);
            }catch(e){
                res.status(500).json({error: e.message});
            }
        });

        this.server.get('/document/',async(req,res)=>{
            try{
                const filter = {};
                const documents = await this.documentHandlers.getAllEntities(filter);
                res.status(200).json(documents);
            }catch(e){
                res.status(500).json({error: e.message});
            }
        });

        this.server.put('/document/:external_id',async(req,res)=>{
            try{
                const { external_id } = req.params;
                const data = req.body;
                const document = await this.documentHandlers.updateEntity(external_id, data);
                res.status(200).json(document);
            }catch(e){
                res.status(500).json({error: e.message});   
            }
        });

        this.server.delete('/document/:external_id',async(req,res)=>{
            try{
                const { external_id } = req.params;
                const document = await this.documentHandlers.deleteEntity(external_id);
                res.status(200).json(document);
            }catch(e){
                res.status(500).json({error: e.message});
            }
        });

        this.server.post('/control-group',async(req,res)=>{
            try{
                const data = req.body;
                const controlGroup = await this.controlGroupHandlers.createEntity(data);
                res.status(200).json(controlGroup);
            }catch(e){
                res.status(500).json({error: e.message});
            }
        });

        this.server.get('/control-group/',async(req,res)=>{
            try{
                const filter = {};
                const controlGroups = await this.controlGroupHandlers.getAllEntities(filter);
                res.status(200).json(controlGroups);
            }catch(e){
                res.status(500).json({error: e.message});
            }
        });

        this.server.get('/control-group/:external_id',async(req,res)=>{
            try{
                const { external_id } = req.params;
                const controlGroup = await this.controlGroupHandlers.getEntity(external_id);
                res.status(200).json(controlGroup);
            }catch(e){
                res.status(500).json({error: e.message});
            }
        });

        this.server.put('/control-group/:external_id',async(req,res)=>{
            try{
                const { external_id } = req.params;
                const data = req.body;
                const controlGroup = await this.controlGroupHandlers.updateEntity(external_id, data);
                res.status(200).json(controlGroup);
            }catch(e){
                res.status(500).json({error: e.message});
            }
        });

        this.server.delete('/control-group/:external_id',async(req,res)=>{
            try{
                const { external_id } = req.params;
                const controlGroup = await this.controlGroupHandlers.deleteEntity(external_id);
                res.status(200).json(controlGroup);
            }catch(e){
                res.status(500).json({error: e.message});
            }
        });

        this.server.post('/control-check',async(req,res)=>{
            try{
                const data = req.body;
                const controlCheck = await this.controlCheckHandlers.createEntity(data);
                res.status(200).json(controlCheck);
            }catch(e){
                res.status(500).json({error: e.message});
            }
        });

        this.server.get('/control-check/',async(req,res)=>{
            try{
                const filter = {};
                const controlChecks = await this.controlCheckHandlers.getAllEntities(filter);
                res.status(200).json(controlChecks);
            }catch(e){
                res.status(500).json({error: e.message});
            }
        });

        this.server.get('/control-check/:key',async(req,res)=>{
            try{
                const { key } = req.params;
                const controlCheck = await this.controlCheckHandlers.getEntity(key);
                res.status(200).json(controlCheck);
            }catch(e){
                res.status(500).json({error: e.message});
            }
        });

        this.server.put('/control-check/:external_id',async(req,res)=>{
            try{
                const { external_id } = req.params;
                const data = req.body;
                const controlCheck = await this.controlCheckHandlers.updateEntity(external_id, data);
                res.status(200).json(controlCheck);
            }catch(e){
                res.status(500).json({error: e.message});
            }
        });

        this.server.delete('/control-check/:external_id',async(req,res)=>{
            try{
                const { external_id } = req.params;
                const controlCheck = await this.controlCheckHandlers.deleteEntity(external_id);
                res.status(200).json(controlCheck);
            }catch(e){  
                res.status(500).json({error: e.message});
            }
        });
        console.log('setHandlers done');
    }
}

const app = new Application();
app.init().then(()=>{
    console.log('Application initialized');
}).catch((e)=>{
    console.log('Application initialization failed',e);
});
