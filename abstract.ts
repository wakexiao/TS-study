// class Person1 {
//   constructor (private _name: string){}
//   get name () {
//     return 'hi ' + this._name
//   }
// }
// const person = new Person1('tony')
// console.log(person.name)
// person.name = 'hello job' // 只写 get 方法，不写set 方法，相当于这个属性是只读的，不可以修改


// readonly 属性
// class Person1 {
//   public readonly name: string; // 加上 readonly 属性后就不能修改了
//   constructor (name: string) {
//     this.name = name
//   }
// }

// const person = new Person1('tony')
// console.log(person.name)
// // person.name = 'job' // 有readonly属性，name不能被修改
// // console.log(person.name)




// 抽象类 abstract
// abstract class Geom {
//   width: number;
//   abstract getArea(): number;
// }

// // const geom = new Geom; // error 无法创建抽象类的实例,抽象类只能被继承，不能被实例化(new)
// class Circle extends Geom { // 非抽象类“Circle”不会实现继承自“Geom”类的抽象成员“getArea”。
//   // 继承了抽象类，必须要有抽象类里面的抽象属性， getAreat 就是抽象属性
//   getArea() {
//     return 456
//   }
// }


// 接口 interface
interface Obj {
  name: string
}
interface Student extends Obj {
  age: number
}
interface Driver extends Obj {
  age: number
}

const obj = {
  name: 'tony'
}
const student = {
  name: 'job',
  age:16
}
const driver = {
  name: 'job',
  age:16
}
const getUserInfo = (user: Obj | Student | Driver) => {
  console.log(user.name)
}

const getUserInfo1 = (user: Obj) => { // 只需要用到 name, Obj 的 interface 就足够了
  console.log(user.name)
}

getUserInfo(obj)
getUserInfo(student)
getUserInfo(driver)
