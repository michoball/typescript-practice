function Logger2(logstring: string) {
  console.log("Logger FACTORY");
  return function (constructor: Function) {
    console.log(logstring);
    console.log(constructor);
  };
}

// 데코레이터는 값을 리턴할 수도 있다
function WithTemplate2(template: string, hookId: string) {
  console.log("Template FACTORY");
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    // 데코레이터가 받아온 constructor를 가져와 새로운 클래스를 반환할 수 있다.
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super();
        console.log("Rendering template");
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          // 이전 클래스에 name값이 있기 때문에 this.name으로 해도 name이 뭔지 안다.
          // 이와 같이 안했으면 this.name이 아니라 const p = new constructor();로 constructor를 실행하고
          // p.name으로 name을 가져와야한다.
          hookEl.querySelector("h1")!.textContent = this.name;
        }
      }
    };
  };
}

//이와같이 데코레이터가 새로운 클래스를 리턴하고
// 클래스가 실행되면 데코레이터에 의해서 리턴된 새로운 클래스의 로직대로 값이 실행된다
@Logger2("LOGGING - PERSON")
@WithTemplate2("<h1>My Person Object</h1>", "app")
class Person2 {
  name = "Max";
  constructor() {
    console.log("Creating person object...  ");
  }
}

const perss = new Person2();

console.log(perss);

//Other decorator return type

function Log(target: any, propertyName: string | Symbol) {
  console.log("Property decorator");
  console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("Accessor decorator");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log("Method decorator");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log4(target: any, name: string | Symbol, position: number) {
  console.log("Parameter decorator");
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @Log
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("Invalid price - should be positive!");
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

//데코레이터로 자동 바인드 기능 만들기
function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

class Printer {
  message = "This works!";

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();

const button = document.querySelector("button")!;
button?.addEventListener("click", p.showMessage);

//-- validation decorator logic
//  ---> ts class validator라고 구글에 치면 남이 만든 validator가 있다.
// 이 라이브러리가 더 정교하니 다운받아서 데코레이터로 class 에 쓰면 된다.
// 밑의 코드는 교육용
interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]; // ['required','positive'] 같은 값이 들어갈 예정
  };
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, porpName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [porpName]: ["required"],
  };
}
// 위 required에 대한 확장코드 다양한 값들이 들어왔을때에 대한 확장이다.
// function Required(target: any, propName: string) {
//   registeredValidators[target.constructor.name] = {
//       ...registeredValidators[target.constructor.name],
//       [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'required']
//   };
// }

function PositiveNumber(target: any, porpName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [porpName]: ["positive"],
  };
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }
  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case "required":
          isValid = isValid && !!obj[prop];
          break;
        case "positive":
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector("form")!;

courseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleEl = document.getElementById("title") as HTMLInputElement;
  const priceEl = document.getElementById("price") as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);

  // 위처럼 만든 validate 함수와 decorator를 이용하여 입력값의 validation을 확인할 수 있다.
  // 따라서 코드를 쳐봤는데 어려우니 3rd-party library를 사용하자
  if (!validate(createdCourse)) {
    alert("Invalid input, please try again");
    return;
  }
  console.log(createdCourse);
});
