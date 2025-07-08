'use strict';

import HttpError from './HttpError.js';
const CODE = 404;
const MESSAGE = 'Resource Not Found';
export default class Error_404 extends HttpError{
    constructor(data){
        super(CODE,MESSAGE,data);
    }
}