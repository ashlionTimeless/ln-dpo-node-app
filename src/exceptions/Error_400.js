'use strict';

import HttpError from './HttpError.js';
const CODE = 400;
const MESSAGE = 'Bad Request';
export default class Error_400 extends HttpError{
    constructor(data){
        super(CODE,MESSAGE,data);
    }
}
