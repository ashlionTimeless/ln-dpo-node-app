'use strict';
import Validator from "../../validators/Validator.js";
import AbstractCRUDHandlers from "./AbstractCRUDHandlers.js";
import ControlCheckRepository from "../../repositories/controls/ControlCheckRepository.js";
export default class ControlCheckHandlers extends AbstractCRUDHandlers {
    constructor(repository){
        Validator.validateClass(repository,ControlCheckRepository);
        super(repository);
    }
}