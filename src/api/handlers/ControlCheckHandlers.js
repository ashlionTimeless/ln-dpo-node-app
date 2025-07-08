'use strict';
import Validator from "../../validators/Validator.js";
import AbstractCrudHandlers from "./AbstractCrudHandlers.js";
import ControlCheckRepository from "../../repositories/controls/ControlCheckRepository.js";
export default class ControlCheckHandlers extends AbstractCrudHandlers {
    constructor(repository){
        Validator.validateClass(repository,ControlCheckRepository);
        super(repository);
    }
}