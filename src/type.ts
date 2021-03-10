// 布尔值  boolean

let isDone: boolean = true;
let isString: boolean = false;

// 数字 number

let decLiteral: number = 6; // 十进制 decimal
let hexLiteral: number = 0xf00d  // 十六进制 hexadecimal   0x开头表示十六进制
let binaryLiteral: number = 0b1010 // 二进制 Binary  0b开头表示二进制
let octalLiteral: number = 0o744 // 八进制 octal  0o开头表示八进制

// 字符串 string

let str: string = 'abc'
str = 'name'
let str1: string = `${str}efg`

// 数组 array

  //  1  元素类型后面接上 []  表示由此类型元素组成的一个数组
let list: number[] = [];
list = [1, 2, 3]

  // 2   Array<元素类型>
let list1:Array<number> = [1, 2, 3];


// 元组 Tuple

let x: [string, number];
x = ['abcdefg', 111]
// x = [123, 'abc']  // 报错
// console.log(x[0].substr(2, 3)) // cde  从下标为2开始截取三个
// console.log(x[0].substring(2, 3))// c  从下标为2截取到下标为3,下标为的3的不会截取到

// 枚举  enum

  // 默认情况下枚举从0开始为元素编号。也可以手动的指定
enum Color {Red, Green, Blue}
let c:Color = Color.Green
  // console.log(c) // 1


  // 手动指定元素开始的编号
enum Color1 {Red = 1, Green, Blue}
let g:Color1 = Color1.Green;
// console.log(g)   // 2

  //  全部采用手动赋值

enum Color2 {Red = 1, Green = 3, Blue = 5}
let m:Color2 = Color2.Green
  // console.log(m)  // 3

  // 通过枚举的值来查找这个值在这个枚举里映射的值
let colorName: String = Color2[3]
  // console.log(colorName)  // Green

// Any 任何类型

let notSure: any = 4;
notSure = 'abc'
  // notSure = false

  // console.log(notSure.substr(1, 2))  // 可以调用方法
let prettySure: Object = 4; // Object类型的变量只能允许给它任意赋值，但是不能调用它上面的方法，即便这个值真的有这个方法
  // prettySure.toFixed(); // 报错


// Void
// Void与 any 类型相反，它表示没有任何类型，一般在函数没有任何返回值的时候使用 Void 类型
function warnUser(): void {
  console.log('This is my warning message')
}


// null 和 undefined
// 这两个类型的本身用处不是很大， 默认情况下 null 和 undefined 是所有类型的子类型，例如：可以把 null 和 undefined 赋值给 number 类型的变量
let u: undefined = undefined;
let n: null = null
let nu: number = 4;
nu = null  // strict 为true 开启了严格模式，需要去 tsconfig 里把 strictNullChecks 设置为 false, strictNullChecks 为 true 是只能赋值给 void 和自身


// Never  never类型表示的是那些永不存在的值的类型
// 总是抛出异常或根本没有返回值(死循环)的函数表达式或箭头函数表达式的返回值类型;变量也可以为 never 类型，当它用不为真的类型保护所约束时
// never 类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是 never 的子类型或可以赋值给 never 类型(除了 never 本身)。即使 any 也不可以赋值给 never
function error(message: string): never {
  throw new Error(message);
}
function fail(){
  return error('something failed')
}
function infiniteLoop(): never {
  while(true){}
}

// Object 表示非原始类型(除 number, string, boolean, undefined, null, symbol 之外的类型)

// 类型断言  当你很清楚的知道这里这个变量是这种类型时
// 类型断言的两种写法
// 尖括号写法
let someValue: any = 'this is a string'
let strLength: number = (<string>someValue).length;
// as 语法
let someValue1: any = 'this is a string'
let strLength1: number = (someValue as string).length;

// 这两种方式是等价的，但是，在 TypeScript 里使用 JSX时，只能使用 as 语法断言
