import Entity from '../Entity.js';
import Validator from '../../../validators/Validator.js';
import Model from "../../mongodb/Model.js";

const TYPE_CLIENT = 100;
const TYPE_MANAGER = 300;

const TYPE_NAMES={
    [TYPE_CLIENT]:"client",
    [TYPE_MANAGER]:"admin",
}
export default class User extends Entity{

    static create(email,external_id,user_type,active,created_by,auth_token,fullname){
        let newAccount = new this();
        let data = {
            email:email,
            external_id:external_id,
            auth_token:auth_token,
            fullname:fullname,
            user_type:user_type,
            active:active,
            created_by:created_by
        }
        newAccount.setAttributes(data);
        return newAccount;
    }



    static fromRecord(record){
        Validator.validateClass(record,Model);
        //console.log("record",record);
        return User.create(
            record.email,
            record.external_id,
            record.user_type,
            record.active,
            record.created_by,
            record.auth_token,
            record.fullname
        );
    }
    getFullName(){
        if(this.fullname){
            return this.fullname;
        }else{
            return this.getEmail();
        }
    }
    getFirstName(){
        let parts = this.getFullName().split(' ');
        return parts[0];
    }

    // it is currently possible that a user has not typed in their name yet, in that case last_name is empty.
    getLastName(){
        let parts = this.getFullName().split(' ');
        if(parts.length>1){
            return parts[1];
        }else{
            return "";
        }
    }
    getInitials(){
        return this.getFirstName().charAt(0).concat(this.getLastName().charAt(0));
    }
    getType(){
        return this.user_type;
    }
    getId(){
        return this.id.toString();
    }

    getEmail(){
        return this.email;
    }
    setEmail(email){
        this.setAttribute("email",email);
    }

    getAuthToken(){
        return this.auth_token;
    }
    setAuthToken(auth_token){
        this.setAttribute("auth_token",auth_token);
    }
    getCreatedBy(){
        return this.created_by;
    }
    setCreatedBy(created_by){
        this.setAttribute("created_by",created_by);
    }

    getActive(){
        return this.active;
    }
    setActive(){
        this.setAttribute("active",User._statusActive());
    }

    table(){
        return "users";
    }
    rules(){
        return {
            "email":{
                type:String,
                index:true,
                unique:true,
                required:true
            },
            "auth_token":{
                type:String,
                required:true
            },
            "fullname":{
                type:String
            },
            "user_type":{
                type:Number,
                required:true
            },
            "active":{
                type:Boolean,
                default:User._statusInactive()
            },
            "created_by":{
                type:String,
                default:"system"
            },
            "external_id":{
                type:String
            }
        }
    }

    setExternalId(value){
        this.setAttribute("external_id",value);
    }
    getExternalId(){
        return this.getAttribute("external_id");
    }
    static _statusActive(){
        return true;
    }

    static _statusInactive(){
        return false;
    }

    static _defaultCreatedBy(){
        return "system";
    }

    static _typeClient(){
        return TYPE_CLIENT;
    }

    static _typeManager(){
        return TYPE_MANAGER;
    }
    getTypeName(){
       return TYPE_NAMES[this.getType()];
    }

    static _typeNames(){
        return TYPE_NAMES;
    }
}