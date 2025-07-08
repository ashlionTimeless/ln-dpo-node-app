'use strict';
import HttpError from './HttpError.js';
const CODE = 500;
const MESSAGE = "Internal Server Error";
export default class Error_500 extends HttpError{
    constructor(data){
        super(CODE,MESSAGE,data);
    }
}