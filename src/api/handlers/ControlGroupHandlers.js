'use strict';
import Validator from "../../validators/Validator.js";
import AbstractCRUDHandlers from "./AbstractCRUDHandlers.js";
import ControlGroupRepository from "../../repositories/controls/ControlGroupRepository.js";
export default class ControlGroupHandlers extends AbstractCRUDHandlers {
    constructor(repository){
        Validator.validateClass(repository,ControlGroupRepository);
        super(repository);
    }
}