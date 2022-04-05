// enum Color {
//   Red = 'red',
//   Green = 'green',
//   Blue = 'blue',
// }

// enum Color1 {
//   Red = 2,
//   Green,
//   Blue = 'blue',
//   // White,
// }

// let str: Color1 = Color1.Green;
// let str1: Color1 = Color1.Blue;
// let colorName: string = Color1[2];
// let colorName1: number = Color1.Green;
// // let colorName1: string = Color1['blue'];
// // console.log(str, str1, colorName, colorName1, 3);
// // console.log(typeof Color1.Red);

// const arr: any[] = [Color1.Red, Color1.Green, Color1.Blue];
// // console.log(arr);

// let notSure: any = 4;
// notSure = 'abc';
// // notSure = false

// notSure.toFixed();
// // console.log(notSure);

// // let a: any = 1;
// // let b: unknown;
// // let num: number;
// // b = 'str'; // 任何类型都可以赋值给 unknown
// // b = a; // any 类型也可以赋值给 unknown
// // a = b; // unknown 类型只能赋值给 any 或者他自身

// // let d: unknown = 6.001;
// // d.toFixed(); // error; unknown 类型上不能执行任何操作
// // (d as number).toFixed(); // 可以使用类型断言来操作

// // > 对于`TypeScript`来说，同时存在 `object` 和 `Object` 还有 `{}` 这三种类型。

// // > `object`表示非原始类型，也就是除`number`，`string`，`boolean`，`symbol`，`null`或`undefined`之外的类型。
// let obj: object;
// // 官方文档上说 object 表示非原始类型，但是我试了下 null 和 undefined 也是可以赋值的
// obj = null; // ok ???
// obj = undefined; // ok ???
// obj = {}; // ok
// obj = []; // ok
// obj = () => 1; // ok
// obj = 11; // error
// obj = 'str'; // error
// obj = true; // error

// // > Object类型包含了所有的原始/非原始类型，所以可以给Object类型赋值为原始类型；
// let obj1: Object;
// obj1 = null; // ok
// obj1 = undefined; // ok
// obj1 = {}; // ok
// obj1 = []; // ok
// obj1 = () => 1; // ok
// obj1 = 11; // ok
// obj1 = 'str'; // ok
// obj1 = true; // ok

// let obj2: {};
// obj2 = undefined;

// function f(x: Object): { toString(): string } {
//   return x; // OK
// }

// declare function create(o: object | null): void;

// create({ prop: 0 }); // OK
// create(null); // OK

// create(42); // Error
// create('string'); // Error
// create(false); // Error
// create(undefined); // Error

// 类型注解与类型推断

// 类型注解
let num: number;
num = 123;

// 类型推断
let s = 'string'; // TS 自动推断出 s 为 string 类型
let n; // 定义式没有赋值，TS 会自动推断该变量为 any 类型

// 联合类型
let temp: string | number;
temp = 123;
temp = 'temp';

let arr: (string | number)[];
arr = [1, 2, 3, '4'];

let getName: (name: string | undefined) => string = (name) => {
  return name === undefined ? 'default' : name;
};

console.log(getName('tom'));
console.log(getName(undefined));

let getName1 = (name: string | undefined): string => {
  return name === undefined ? 'default' : name;
};

// 交叉类型
type T1 = { name: string };
type T2 = { age: number };
type T3 = T1 & T2;
let T: T3 = {
  name: 'tom',
  age: 18,
};
// let student1: T3 = {
//   name: 'nico',
// };

// 类型断言

// 类型别名
type customType = number | string;
let getTotal = (total: customType): number => {
  return typeof total === 'number' ? total : parseInt(total, 10);
};

// 字面量类型
let hello: 'hello' = 'hello';
// hello = 1; // error; 不能将类型“1”分配给类型“"hello"”
let flag: true = true;

// 其他类型
let date = new Date();
let sym = Symbol('hello');

// class Teacher {
//   name: string;
//   age: number;
// }

// const objArr: Teacher[] = [
//   new Teacher(),
//   {
//     name: 'tom',
//     age: 18,
//   },
// ];

// console.log(new Teacher());

interface Person {
  name: string;
  age?: number;
}

const getPersonNmae = (obj: Person): string => {
  return obj.name;
};

let person = {
  name: 'tom',
  sex: 'male',
};

getPersonNmae(person); // ok
// getPersonNmae({
//   name: 'job',
//   sex: 'male',
// }); // error; sex 不在 Person 类型中
// // 当以一个字面量的方式直接传递给一个变量的时候，TS 会强校验, 类似下面这种
// let person1: Person = {
//   name: 'tony',
//   sex: 'male',
// }; // error


// 接口
// 可选属性和只读属性
interface Person6 {
  name: string // 接口可以使用 “,” 或者 “;” 结尾，也可以直接换行不写符号
  readonly age: number // 只读属性
  sex?: string // 可选属性
}

function personInfo(person: Person6): void{
  person.name = 'tom';
  // person.age = 19; // error; age 属性是只读的
  console.log(person.sex)
}

personInfo({name: 'jack', age: 18}) // ok
personInfo({name: 'facker', age: 20, sex: 'amle'}) // ok


// readonlyArray 
let fixedArr: ReadonlyArray<Person6> = [
  {
    name: 'jack',
    age: 18,
  },
  {
    name: 'uzi',
    age: 19,
    sex: 'male',
  }
]

const obj = {name: 'tom', age: 20};
// fixedArr[0] = obj; // error; ReadonlyArray 类型索引签名仅允许读取
// fixedArr.push(obj); // error;  ReadonlyArray 类型上不存在属性“push”
// fixedArr.length = 3; // error; 无法分配到 "length" ，因为它是只读属性
fixedArr = [];
console.log(fixedArr); // []


// 任意属性
interface Person7 {
  name: string,
  age?: number,
  [propsName: string]: any, // key 可以取任何名字
}
const p7: Person7 = {
  name: 'jack',
  sex: 'male',
  like: 'lol',
}

// 一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集
interface Person8 {
  name: string, // error，类型“string”的属性“name”不能赋给“string”索引类型“boolean”
  age?: number, // error, 类型“number | undefined”的属性“age”不能赋给“string”索引类型“boolean”
  // [propsName: string]: boolean,
  // 可以这样改造，任意属性的类型必须包含必须属性和可选属性中的所有类型
  [propsName: string]: string | number | undefined,
}

const p8: Person8 = {
  name: 'jack',
  age: 18,
  sex: 'male'
}

// 函数 function
// 使用 TS 定义函数
function getNum (a: number, b: number): number {
 return a + b
}
const getNum1 = (a: number, b: number): number => a + b

const getNum2: (a: number, b: number) => number = (a, b) => {
  return a + b
}

// 使用 interface 定义一个函数
interface GetNum {
  (a: number, b: number): number
}
const getNum3: GetNum = (a, b) => a + b

interface arr {
  0: number
}

const arr1: arr = [12312313, '2']

// 接口与类型别名的区别

// type 支持基本数据类型
type t = undefined;
// type 支持联合类型
type combineT = number | string;
// interface 支持声明合并;同一作用域下的多个同名接口会自动合并
interface A {
  x: number
}
// 类型 "{ x: number; }" 中缺少属性 "y"，但类型 "A" 中需要该属性
// const numObj: A = { // error
//   x: 1
// }
// 合并之后之前的定义的类型就会报错
interface A {
  y: number
}
const numObj1: A = {
  x: 1,
  y: 2,
}

type B = {
  x: number
}
// error; 标识符“B”重复
// type B = {
//   y: number
// }

// 继承方式
interface Person {
  name: string
}
interface Student extends Person {
  class: number
}
type Person1 = {
  name: string
}
type Person2 = {
  class: number
} & Person1
// interface 类型可以用 extends 继承 type
interface Teacher extends Person1 {
  subject: string
}
// type 也可以用 & 继承 interface 类型
type Person3 = {
  class: number
} & Person

const st: Student = {
  name: '小鱼',
  class: 6,
}
const p1: Person2 = {
  name: '小鱼',
  class: 6,
}
const tech: Teacher = {
  name: '影流之主',
  subject: '瞬狱影杀阵',
}
const p2: Person3 = {
  name: '凯隐',
  class: 5
}

// function identity<T>(arg: T): T {
//   return arg;
// }

// let myIdentity: <T>(arg: T) => T = function (a) {
//   return a
// };

function identity<T>(arg: T): T {
  return arg;
}

let myIdentity: {<T>(arg: T): T} = identity;

// 理解为
type Identity = {
  <T>(arg: T): T
}
let myIdentity1: Identity = <T>(a: T): T => a;
let myIdentity2: Identity = (a) => a;

myIdentity1('1')

interface IInfo< T = string >{
   name: T
}
// 当使用泛型时没有在代码中直接指定类型参数这个默认类型就会起作用。
// const objInfo: IInfo = {
//   name: 123 // error, 不能将类型“number”分配给类型“string”。
// }
const objInfo1: IInfo = {
  name: '影流之主'
}
const objInfo2: IInfo<number> = {
  name: 123
}


function reverseFn(tuple: [string, number]): [number, string] {
  return [tuple[1], tuple[0]]
}

function reverseFn1<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]]
}


reverseFn1(['str', 6])


reverseFn1([[1, 2, 3], 'test'])



interface UserInfo<T, U>{
  name: T,
  age: U
}

function getUserInfo<T, U>(name: T, age: U): UserInfo<T, U> {
  return {
    name,
    age,
  }
}
const userInfo = getUserInfo('tom', 18);

interface Length {
  length: number
}

function identity6<T extends Length>(arg: T): T {
  console.log(arg.length);
  return arg;
}
identity6([1, 2]);
identity6('str');
identity6({length: 6});
// identity6(6); // error, 类型“number”的参数不能赋给类型“Length”的参数。

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K]{
  return obj[key]
}

const info = {
  name: '影流之主',
  age: 18,
  desc: '我会影分身'
}
getProperty(info, 'name');
// getProperty(info, 'sex'); // error, 类型“"sex"”的参数不能赋给类型“"age" | "name" | "desc"”的参数。

// typeof
interface Info {
  name: string,
  age: number
}

const info6: Info = {
  name: '影流之主',
  age: 18,
}

type Info1 = typeof info6; // type Info1 = Info;
const info1: Info = {
  name: '凯隐',
  age: 16,
}

//  keyof 用法
interface Student1 {
  name: string,
  id: number
}
type Property = keyof Student1; // 'name' | 'id'
type Property1 = keyof Student1[] // 'length' | 'push' | 'pop' | 'concat' ...

function getArrayProperty <T, K extends keyof T>(arr: T, key: K ): T[K] {
  return arr[key]
}
const arr3: Student1[] = [
  {
    name: 'yy',
    id: 1
  }
]

const arrFnName = getArrayProperty(arr3, 'push');
function getProperty1<T, K extends keyof T>(arr: T, key: K): T[K]{
  return arr[key];
}
const arrPush = getProperty1([1,2,3], 'push');
console.log(arrPush.toString)

// in
type Keys = 'name' | 'skill' | 'desc';
type Obj = {
  [key in Keys]: string
}// {name: string, skill: string, desc: string}

// infer
type TReturnType<T> = T extends (...arg: any[]) => infer R ? R : any 
type ReturnTypeCustom<T extends (...arg: any[]) => any> = T extends (...arg: any[]) => infer R ? R : any; 


type Flatten<T> = T extends Array<any> ? T[number] : T;
type Str = Flatten<Array<string>> // string;返回 string[] 用 number 下标获取值，所以是 string
type Str1 = Array<string> extends Array<any> ? number : string // number


// 当我们想获取一个数组或元组里的类型时
type PickType<T> = T extends Names ? 'string' : T extends Ids ? 'number' : T;
type Ids = number[];
type Names = string[];
type Flags = boolean[];
type RandomTuple = [string, number, boolean];

type idType = PickType<Ids>; // 类型推断为 number
type nameType = PickType<Names>; // 类型推断为 string
type flagType = PickType<Flags>; // 类型推断为 boolean[];
// 使用 infer 之后
type PickType1<T>  = T extends Array<infer R> ? R : T
type flagType1 = PickType1<Flags>; // 类型推断为 boolean
type randomType = PickType1<RandomTuple>; // 类型推断为 string | number | boolean


// Partial  部分的;不完全的;
type Partial1<T> = {
  [K in keyof T]?: T[K]
}

// 举例
interface Todo {
  title: string,
  desc: string,
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return {
    ...todo,
    ...fieldsToUpdate,
  }
}

const todo1 = {
  title: 'study TS',
  desc: '卷起来',
}

const newTodo = updateTodo(todo1, {desc: '太难了，窝布响学辣'});
console.log(newTodo); // { title: 'study TS', desc: '太难了，窝布响学辣' }

interface PersonInfo {
  name: string,
  age: number,
}
type PersonInfo1 =  Partial<PersonInfo>;
// type PersonInfo1 = {
//   name?: string | undefined;
//   age?: number | undefined;
// }


// Record
interface PageInfo {
  title: string;
}
type page = 'home' | 'about' | 'contact';

const p: Record<page, PageInfo> = {
  home: {title: 'homeTitle'},
  about: {title: 'aboutTitle'},
  contact: {title: 'contactTitle'},
}
// p 的类型得是 
// {
//   home: {title: string},
//   about: {title: string},
//   contact: {title: string},
// }


// Pick
type Pick1<T, K extends keyof T> = {
  [P in K]: T[P];
};

// 用法
const personInfo1: Pick<PersonInfo, 'name'> = {
  name: '劫'
}
// personInfo1 类型就是 {name: string}

type PersonProperty = 'name' | 'age';
const personInfo2: Pick<PersonInfo, PersonProperty> = {
  name: '小鱼',
  age: 8
}

// Exclude 
type ArrayMethod = 'push' | 'pop' | 'concat' | 'shift' | 'unshift';
type ExcludePushAndPop = Exclude<ArrayMethod, 'push' | 'pop'>;
// "concat" | "shift" | "unshift"

// Omit
type ExcludePushAndPop1 = Omit<ArrayMethod, 'push' | 'pop'>;