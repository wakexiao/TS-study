import { test } from './test';

function sum(a: number, b: number): number {
  return a + b;
}

const count = sum(1, 2);

console.log(count);
console.log(test);

const obj = {name: 'nico', age: 18};
console.log(obj);
obj.age = 19;
console.log(obj);
console.log(Promise)