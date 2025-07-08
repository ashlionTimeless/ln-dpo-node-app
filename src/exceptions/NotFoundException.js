'use strict';
import Exception from './Exception.js';
export default class NotFoundException extends Exception{
    constructor(message,stack,data){
        super(message,stack,data);
    }
}