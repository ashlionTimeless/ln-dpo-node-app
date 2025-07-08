import Entity from '../Entity.js';

export default class Company extends Entity{
    table(){
        return "companies";
    }

    getExternalId(){
        return this.getAttribute("external_id");
    }

    getAiIntroduced(){
        return this.getAttribute("ai_introduced");
    }

    getProcessingDisabled(){
        return this.getAttribute("processing_disabled");
    }

    getVLOId(){
        return this.getAttribute("vlo_id");
    }

    hasVLO(){
        return this.getVLOId()!=0;
    }
    
    rules(){
        return {
            // thread
            "external_id":{
                type:Number,
                index:true,
                unique:true,
                required:true
            },
            "ai_introduced":{
                type:Boolean,
                default:false
            },
            "processing_disabled":{
                type:Boolean,
                default:false
            },
            "vlo_id":{
                type:Number,
                default:0
            }
        }
    }
}