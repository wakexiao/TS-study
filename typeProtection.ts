// 类型断言和类型保护
interface Bird {
  fly: boolean,
  sing: () => {};
}

interface Dog {
  fly: boolean,
  bark: () => {}
}

// 使用类型断言
function trainAnimal(animal: Bird | Dog) {
  // animal.sing()  // 会报错，如果传入的是 Dog 类型的就不行
  if(animal.fly){
    (animal as Bird).sing(); // 使用类型断言 as 语法
    (<Bird>animal).sing(); // 使用类型断言 <T> 尖括号语法
  }
}

// 使用in方法来做类型保护
function trainAniaml1(animal: Bird | Dog){
  if('sing' in animal){
    animal.sing();
  } else {
    animal.bark(); // ts会在 else 的时候自动推断出 animal 为 Dog 类型
  }
}


// 使用 type of 来做类型保护
function add(first: string | number, second: string | number){
  // return first + second // 会报错
  if(typeof first === 'string' || typeof second === 'string'){
    return `${first}${second}`
  }
  return first + second;
}


// 使用instanceof 来做语法保护
class ObjNumber{
  count: number
}

function addSecond(first: object | ObjNumber, second: object | ObjNumber){
  // return first.count + second.count; // 会报错，如果是object类型可能没有count属性
  if(first instanceof ObjNumber && second instanceof ObjNumber){
    return first.count + second.count
  }
  return 0;
}
