var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * property decorator
 */
var deprecated = function (target, propertyKey, propertyDescriptor) {
    console.log(propertyKey + " was deprecated. Stop using it please..");
};
/**
 * property decorator factory
 */
// const deprecated: (deprecationVersion: number) => MethodDecorator = (deprecationVersion: number) => {
//     return (target, propertyKey, propertyDescriptor) => {
//         console.log(`${propertyKey} was deprecated from version ${deprecationVersion}. Stop using it please..`);
//     }
// }
/**
 * property decorator factory with "at time of use" deprecation notice
 */
// const deprecated: ((deprecationVersion: number) => (target, propertyKey, propertyDescriptor: TypedPropertyDescriptor<Function>) => {}) = (deprecationVersion: number) => {
//     return (target, propertyKey, propertyDescriptor: TypedPropertyDescriptor<Function>) => {
//         const oldMethod = propertyDescriptor.value;
//         console.log(`Guess what, ${propertyKey} was decorated.`)
//         if (propertyDescriptor && propertyDescriptor.value) {
//             propertyDescriptor.value = function () {
//                 console.log(`${propertyKey} was deprecated from version ${deprecationVersion}. Stop using it please..`);
//                 return oldMethod.call(this);
//             }
//         }
//         return propertyDescriptor;
//     }
// }
var Person = /** @class */ (function () {
    function Person() {
    }
    // @deprecated(1.2)
    Person.prototype.eat = function () {
        console.log('I am eating..');
    };
    //@deprecated()
    // @deprecated(1.5)
    Person.prototype.walk = function () {
        console.log('I am walking..');
    };
    __decorate([
        deprecated
        // @deprecated(1.2)
        ,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Person.prototype, "eat", null);
    return Person;
}());
var person = new Person();
person.eat();
setTimeout(function () {
    person.walk();
}, 2500);
// const deprecatedClass = (target: Function): any => {
//     const original = target;
//     const newClass = (arguments) => {
//         console.log('Deprecated!');
//         return original.apply(this, arguments)
//     }
//     return newClass;
// }
// const deprecatedClass = deprecationVersion => (target: Function): any => {
//     const original = target;
//     const newClass = (arguments) => {
//         console.log(`Deprecated since version ${deprecationVersion}`);
//         return original.apply(this, arguments)
//     }
//     newClass.prototype = original.prototype;
//     return newClass;
// }
// @deprecatedClass('1')
// class Car {
//     constructor() {
//     }
//     @deprecated
//     drive(){
//         console.log('I am driving!');
//     }
// }
// let car = new Car();
// car.drive(); 
