// class Queue{
// private _array = [];

// enqueue(item) {
// this._array.push(item);
// }

// dequeue() {
// return this._array.shift();
// }

// log() {
// console.log(this._array);
// }
// }
// class Package{
// deliver() {
// console.log('Delivering Package...');
// }
// }

// class Cat{
// meow() {
// console.log('I cant be delivered but I surely can meow!')
// }
// }
// let q = new Queue();
// q.enqueue(new Package());
// q.enqueue(new Package());
// q.enqueue(new Package());
// q.enqueue(new Package());
// q.enqueue(new Cat());
// q.log();
// console.log(q.dequeue().deliver());
// console.log(q.dequeue().deliver());
// console.log(q.dequeue().deliver());
// console.log(q.dequeue().deliver());
// console.log(q.dequeue().meow());

class Queue<T>{
    private _array: Array<T> = [];

    enqueue(item: T) {
        this._array.push(item);
    }

    dequeue() {
        return this._array.shift();
    }

    log() {
        console.log(this._array);
    }
}
class Package {
    deliver() {
        console.log('Delivering Package...');
    }
}

class Cat {
    meow() {
        console.log('I cant be delivered but I surely can meow!')
    }
}
let q = new Queue<Package>();
q.enqueue(new Package());
q.enqueue(new Package());
q.enqueue(new Package());
q.log();
q.dequeue().deliver();
q.dequeue().deliver();
q.dequeue().deliver();