//Decorator
// 결국 함수다.

// function Logger(constructor: Function) {
//   //대문자일필요 x
//   console.log("Logging...");
//   console.log(constructor);
// }

// // @는 그다음 바로 나온 함수를 decorator로 쓴다고 표시한다.
// @Logger
// class Person {
//   name = "Max";
//   constructor() {
//     console.log("Creating person object...  ");
//   }
// }

// const pers = new Person();

// console.log(pers);
//데코레이터는 클래스가 실행되기 전에 선언되었을 때 작동한다.
//그래서 위 코드를 실행하면 Logger가 먼저 실행되고 person이 실행된다.

//Decorator Factories
// 데코레이터 함수 안에 리턴함수를 두고 데코레이터가 다른 값을 받아올 수 있도록 해줌

// function Logger(logstring: string) {
//   return function (constructor: Function) {
//     console.log(logstring);
//     console.log(constructor);
//   };
// }

// // logstring 값을 전달해도 Person의 constructor를 전달할 수 있다.
// @Logger("LOGGING - PERSON")
// class Person {
//   name = "Max";
//   constructor() {
//     console.log("Creating person object...  ");
//   }
// }

// const pers = new Person();

// console.log(pers);

//Build more Useful Decorator

function Logger(logstring: string) {
  console.log("Logger FACTORY");
  return function (constructor: Function) {
    console.log(logstring);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  console.log("Template FACTORY");
  return function (constructor: any) {
    // 데코레이터가 받은 id값에 template 집어넣기
    console.log("Rendering template");
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector("h1")!.textContent = p.name;
    }
  };
}

// 유의미한 정보를 데코레이터로 보냄 app 은 html에 있는 div의 id값
// @WithTemplate("<h1>My Person Object</h1>", "app")
// class Person {
//   name = "Max";
//   constructor() {
//     console.log("Creating person object...  ");
//   }
// }

// const pers = new Person();

// console.log(pers);

// 데코레이터는 다른 개발자가 쉽게 간단히 값을 입력하고 결과를 보며
// 함수나 클래스의 성능을 알 수 있게 해준다.

// add more decorator
//여러개의 데코레이터를 연결해도 된다. 테코레이터는 밑에서 위로 실행된다.
// 하지만 factoy는 위에서 아래로 실행된다.
@Logger("LOGGING - PERSON")
@WithTemplate("<h1>My Person Object</h1>", "app")
// 이경우 Logger -> WithTemplate 순으로 일단 함수가 실행되고 그안에
// 리턴되는 함수( 실제 데코레이터) 는 WithTemplate -> Logger 순이다.
class Person {
  name = "Max";
  constructor() {
    console.log("Creating person object...  ");
  }
}

const pers = new Person();

console.log(pers);

// --

// function Log(target: any, propertyName: string | Symbol) {
//   console.log("Property decorator");
//   console.log(target, propertyName);
// }

// class Product {
//   @Log
//   title: string;
//   private _price: number;

//   set price(val: number) {
//     if (val > 0) {
//       this._price = val;
//     } else {
//       throw new Error("Invalid price - should be positive!");
//     }
//   }

//   constructor(t: string, p: number) {
//     this.title = t;
//     this._price = p;
//   }

//   getPriceWithTax(tax: number) {
//     return this._price * (1 + tax);
//   }
// }

// class가 js에서 만들어지면 데코레이터가 실행된다.

// Accessor & Parameter

// function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
//   console.log("Accessor decorator");
//   console.log(target);
//   console.log(name);
//   console.log(descriptor);
// }

// function Log3(
//   target: any,
//   name: string | Symbol,
//   descriptor: PropertyDescriptor
// ) {
//   console.log("Method decorator");
//   console.log(target);
//   console.log(name);
//   console.log(descriptor);
// }

// function Log4(target: any, name: string | Symbol, position: number) {
//   console.log("Parameter decorator");
//   console.log(target);
//   console.log(name);
//   console.log(position);
// }

// class Product {
//   //property decorator
//   @Log
//   title: string;
//   private _price: number;

//   //method decorator
//   @Log2 // -> 이와같이 부르면 target은 Product 클래스의 프로토타입, name은 이 set의 이름,
//   // descriptor는 {get: undefined, enumerable: false, configurable: true, set: ƒ} 이런게 나온다.
//   set price(val: number) {
//     if (val > 0) {
//       this._price = val;
//     } else {
//       throw new Error("Invalid price - should be positive!");
//     }
//   }

//   constructor(t: string, p: number) {
//     this.title = t;
//     this._price = p;
//   }

//   //accessor decorator
//   @Log3
//   getPriceWithTax(@Log4 tax: number) {
//     // parametor decorator
//     return this._price * (1 + tax);
//   }
// }

const p1 = new Product("book", 10);
const p2 = new Product("dask", 40);
// 이렇게 Product class를 불러도 데코레이터는 다시 실행되지 않는다.
// 클래스가 만들어지는 시점에만 작용하기 때문이다.
// 단지 화면이 만들어지기 전에 무언가를 실행하고 싶을때 값이나 함수에 맞게 사용하기위해 있는것이 데코레이터
