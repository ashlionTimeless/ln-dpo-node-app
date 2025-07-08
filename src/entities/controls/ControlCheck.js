import Entity from '../Entity.js';

export default class ControlCheck extends Entity{
    table(){
        return "control_check";
    }

    getGroupKey(){
        return this.getAttribute("group_external_id");
    }

    getCheckKey(){
        return this.getAttribute("external_id");
    }

    getTitle(){
        return this.getAttribute("title");
    }   

    getInstructions(){
        return this.getAttribute("instructions");
    }       

    rules(){
        return {
            // group_key
            "group_external_id":{
                type:String,
                required:true
            },
            // check_key
            "external_id":{
                type:String,
                required:true
            },
            // title
            "title":{
                type:String,
                required:true
            },
            // instructions
            "instructions":{
                type:String,
                required:true
            }
        }
    }
}