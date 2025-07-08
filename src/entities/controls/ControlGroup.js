import Entity from '../Entity.js';

export default class ControlGroup extends Entity{
    table(){
        return "control_group";
    }

    getGroupKey(){
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
            "external_id":{
                type:String,
                required:true
            },
            "title":{
                type:String,
                required:true
            },
            "instructions":{
                type:String,
                required:true
            }
        }
    }

    
}