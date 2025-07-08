'use strict';
import ClassComparer from './ClassComparer.js';

export default class ClassValidator{
    static validateClass(object,expectedClass){
        if(!ClassValidator.compareClass(object,expectedClass)){
            throw new Error('Class of passed object is '+object.constructor.name+ ', '+expectedClass.name+' expected');
        }
        return true;
    }
    static compareClass(object,expectedClass){
        return ClassComparer.compareClassOfObject(object,expectedClass);
    }
    static compareTwoClasses(firstClass,secondClass){
        return ClassComparer.compareTwoClasses(firstClass,secondClass);
    }
    static verifyTwoClassesRelation(childClass,parentClass){
        if(!ClassValidator.compareTwoClasses(childClass,parentClass)){
            throw new Error('Class '+childClass.name+ ' does not inherit class '+parentClass.name);
        }
    }
}