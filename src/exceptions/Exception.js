'use strict';

export default class Exception{
    constructor(message,stack,data){
        this.message = message;
        this.stack = unescape(stack);
        this.data = data;
    }
    getStack(){
        return this.stack;
    }
    getMessage(){
        return this.message;
    }
    getData(){
        return this.data;
    }
}