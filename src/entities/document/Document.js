import Entity from '../Entity.js';

export default class Document extends Entity{
    table(){
        return "document";
    }

    getTitle(){
        return this.getAttribute("title");
    }

    getSourceUrl(){
        return this.getAttribute("source_url");
    }

    getFilepath(){
        return this.getAttribute("filepath");
    }

    getIndexed(){
        return this.getAttribute("indexed");
    }

    getContext(){
        return this.getAttribute("context");
    }

    getCreatedAt(){
        return this.getAttribute("created_at");
    }

    getUpdatedAt(){
        return this.getAttribute("updated_at");
    }
    
    getExternalId(){
        return this.getAttribute("external_id");
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
            "source_url":{
                type:String,
                required:true
            },
            "filepath":{
                type:String,
                required:true
            },
            "indexed":{
                type:Boolean,
                default:false
            },

            "context":{
                type:String,
                default:"-"
            },

            "created_at":{
                type:Number,
                default:Date.now()
            },

            "updated_at":{
                type:Number,
                default:Date.now()
            }
        }
    }
}