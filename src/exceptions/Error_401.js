'use strict';

import HttpError from './HttpError.js';
const CODE = 401;
const MESSAGE = 'Not authorized';
export default class Error_401 extends HttpError{
    constructor(data){
        super(CODE,MESSAGE,data);
    }
}