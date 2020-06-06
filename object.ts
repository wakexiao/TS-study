// public,protected,private 访问类型，没有在类里定义的属性之前加上访问类型，会默认以 public 的访问类型使用
// public 允许在类的内外被调用
// protected 允许在类内及继承的子类中被调用被调用
// private 允许在类内被调用

// class Person {
//   protected name: string ;
//   public sayHi() {
//     this.name = '小明'
//     console.log('hi', this.name)
//   };
//   private sayBey() {
//     this.sayBey();
//   }
// }

// class Teacher extends Person {
//   public sayName() {
//     console.log(this.name); // protected 允许在继承的子类中使用，但是没赋值
//   }
// }

// const p1 = new Person()
// console.log(p1.sayHi())
// // console.log(p1.name)


// consturctor
// class Person {
//   // public name: string;
//   // constructor(name: string) {
//   //   this.name = name
//   // }
//   // 下面写法相当于上面是简写
//   constructor (public name: string) {}

// }

// const person = new Person('tony')
// console.log(person.name)


class Person {
  constructor (public name: string){}
}

class Teacher extends Person {
  constructor (public age: number){
    // super 相当于就是父类的 constructor
    super('tony');// 调用父类的构造函数，需要把父类的构造函数的参数传递过去,没有参数也需要调用，否则会报错
  }
}

const teacher = new Teacher(23)
console.log(teacher.name)
console.log(teacher.age)
