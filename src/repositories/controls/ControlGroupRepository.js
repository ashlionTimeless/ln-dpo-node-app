import  Repository from '../Repository.js';
import ControlGroup from "../../entities/controls/ControlGroup.js";
import ControlCheckRepository from "./ControlCheckRepository.js";
export default class ControlGroupRepository extends Repository{
    constructor(app){
        super(app,ControlGroup);
        this.controlCheckRepository = new ControlCheckRepository(app);
    };

    getRecords(filter,page,limit){
        return new Promise(async(resolve,reject)=>{
            try{
                let controlGroups = await super.getRecords(filter,page,limit);
                for(let controlGroup of controlGroups){
                    let controlChecks = await this.controlCheckRepository.getControlChecksByGroupKey(controlGroup.external_id);
                    controlGroup.control_checks = controlChecks;
                }
                return resolve(controlGroups);
            }catch (e) {
                return reject(e);
            }
        })
    }

    getRecord(filter){
        return new Promise(async(resolve,reject)=>{
            try{
                let controlGroup = await super.getRecord(filter);
                let controlChecks = await this.controlCheckRepository.getControlChecksByGroupKey(controlGroup.external_id);
                controlGroup.control_checks = controlChecks;
                return resolve(controlGroup);
            }catch (e){
                return reject(e);
            }
        })
    }
}