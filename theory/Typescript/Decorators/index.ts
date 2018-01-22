// const sayHello = () => {
//     console.log('hello');
// }


// const deprecationDecorator = fnToDecorate => {
//     return () => {
//         console.log('Hey, I was deprecated!');
//         const decoratedFn = fnToDecorate.apply(this, arguments);
//         console.log('Man why did you use me, I was deprecated..');
//         return decoratedFn;
//     }
// }

// deprecationDecorator(sayHello)();

// const deprecated: MethodDecorator = (target, propertyKey, propertyDescriptor) => {
//     console.log(`${propertyKey} was deprecated. Stop using it please..`)
// }


// const deprecated: (version: number) => MethodDecorator = version => (target, propertyKey, propertyDescriptor) => {
//     console.log(`${propertyKey} was deprecated since ${version}. Stop using it please..`)
// }

const deprecated: ((version: number) => (target, propertyKey, propertyDescriptor: TypedPropertyDescriptor<Function>) => {}) = (version: number) => {
    console.log(version)
    return (target, propertyKey, propertyDescriptor: TypedPropertyDescriptor<Function>) => {
        const oldMethod = propertyDescriptor.value;
        console.log(`Guess what, ${propertyKey} was decorated.`)
        if (propertyDescriptor && propertyDescriptor.value) {
            propertyDescriptor.value = function () {
                console.log(`${propertyKey} was deprecated from version ${version}. Stop using it please..`);
                return oldMethod.call(this, arguments);
            }
        }
        return propertyDescriptor;
    }
}

function deprecatedClass(version: number) {
    return function (
        target: Function // The class the decorator is declared on
    ) {
        console.log(`Class ${target.name} has been deprecated since version ${version}` );
    }
}
@deprecatedClass(1.5)
class Person {

    @deprecated(1.5)
    sayHello() {
        console.log('hello');
    }

    @deprecated(0.1)
    squak() {
        console.log('I am a person, I dont squak..');
    }
}

const person = new Person();
person.sayHello();
setTimeout(() => {
    person.squak();
}, 1500);


