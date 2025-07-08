import Validator from './Validator.js';

export default class ClassComparer{
    static compareClassOfObject(object, expectedClass){

        Validator.validateFunction(expectedClass,'expectedClass');
        return (typeof object === 'object') &&
            (object instanceof expectedClass || object.constructor.prototype instanceof expectedClass)
    }

    static compareTwoClasses(firstClass,secondClass){
        Validator.validateFunction(firstClass,'firstClass');
        Validator.validateFunction(secondClass,'secondClass');
        let tmp = firstClass.prototype;
        while (tmp != null) {
            if (tmp == secondClass.prototype)
                return true;
            tmp = tmp.__proto__;
        }
    }
}
