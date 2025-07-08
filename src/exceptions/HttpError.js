'use strict';
export default class HttpError{
    constructor(code=400,message="Http error",data){
        this.code = code;
        this.message = message;
        this.data = data;
    }
}