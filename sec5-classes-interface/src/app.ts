// interface
// object 청사진 다음의 interface를 갖는 객체는 interface와 맞는 타입의 값들을 가져야한다.
// interface Person {
//   name: string;
//   age: number;

//   greet(phrase: string): void;
// }

// let user1: Person;

// user1 = {
//   name: "Max",
//   age: 20,
//   greet(phrase: string) {
//     console.log(phrase + "aef" + this.name);
//   },
// };

// user1.greet("HI there ");

// interface와 type의 차이점
// interface에 비해 type은 좀 더 유연하게 타입을 지정하게 해준다.

//차이점

// type names = 'firstName' | 'lastName'

// type NameTypes = {
//   [key in names]: string
// }

// const yc: NameTypes = { firstName: 'hi', lastName: 'yc' }

// interface NameInterface {
//   // error
//   [key in names]: string
// }

// 하지만 interface를 쓰면 더 명확하게 type을 지정할 수가 있어서 type보다 더 많이 쓰인다.
// interface를 쓰는 가장 중요한 이유는 class에서 쓸 수 있어서이다.

// interface with class
// 다음과 같이 interface는 class에 적용되어 쓸 수 있다. (implements 는 하나 이상의 interface를 상속해준다.)
// implements에 사용된 interface는 class내에서 사용되어져야한다.
// class의 abstract랑 비슷하나 class에 적용하는데 잇어서 더 단순히 적용이 가능하다.
// interface Greetable {
//   name: string;
//   greet(phrase: string): void;
// }

// class Person implements Greetable {
//   name: string;
//   age = 30;

//   constructor(n: string) {
//     this.name = n;
//   }
//   greet(phrase: string) {
//     console.log(phrase + "aef" + this.name);
//   }
// }

// let user1: Greetable;

// user1 = new Person("Max");

// interface를 사용함으로써 여러 class에서 똑같은 함수를 사용할때
// 함수를 잘 가져왔는지 안가져오지는 않았는지 확인하기 위해 쓰인다.

// public 이나 private는 안되지만 readonly는 쓸 수 있다.

// class 와 다르게 interface는 여러 interface를 extends할 수 있다.

// type AddFn =(a: number, b : number) => number;
// interface로 function의 type을 정의하는 법
interface AddFn {
  (a: number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
};

interface Named {
  readonly name?: string;
  // ?: => optional parameter
  // 메서드에는 optional! => myMethod?(){...} 이런식으로
  outputName?: string;
}

interface Greetable extends Named {
  greet(phrase: string): void;
}

class Person implements Greetable {
  name?: string;
  age = 30;

  constructor(n?: string) {
    if (n) {
      this.name = n;
    }
  }
  greet(phrase: string) {
    if (this.name) {
      console.log(phrase + "aef" + this.name);
    } else {
      console.log("HI");
    }
  }
}

let user1: Greetable;

user1 = new Person();
