import  Repository from '../Repository.js';
import ControlCheck from "../../entities/controls/ControlCheck.js";
export default class ControlCheckRepository extends Repository{
    constructor(app){
        super(app,ControlCheck);
    };

    getControlChecksByGroupKey(group_external_id){
        return new Promise(async(resolve,reject)=>{
            try{
                let filter = {group_external_id:group_external_id};
                let controlChecks = await this.getRecords(filter);
                return resolve(controlChecks);
            }catch (e){
                return reject(e);
            }
        })
    }
}