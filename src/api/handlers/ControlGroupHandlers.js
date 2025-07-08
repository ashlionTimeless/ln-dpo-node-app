'use strict';
import Validator from "../../validators/Validator.js";
import AbstractCrudHandlers from "./AbstractCrudHandlers.js";
import ControlGroupRepository from "../../repositories/controls/ControlGroupRepository.js";
export default class ControlGroupHandlers extends AbstractCrudHandlers {
    constructor(repository){
        Validator.validateClass(repository,ControlGroupRepository);
        super(repository);
    }
}