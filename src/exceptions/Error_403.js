import HttpError from './HttpError.js';
const CODE = 403;
const MESSAGE = 'Action Forbidden';
export default class Error_403 extends HttpError{
    constructor(data){
        super(CODE,MESSAGE,data);
    }
}
