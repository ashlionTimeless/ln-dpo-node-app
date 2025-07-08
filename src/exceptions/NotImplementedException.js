import Exception from './Exception.js';
const message= "Function Not Implemented";
export default class NotImplementedException extends Exception{
    constructor(){
        super(message);
    }
}
