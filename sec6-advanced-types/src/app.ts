type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

// 두 type의 특징을 다 가진 type 생성 --> intersection type

// interface ElevatedEmployee extends Employee, Admin {} 와 비슷하다 볼 수 있다.
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: "Max",
  privileges: ["create-server"],
  startDate: new Date(),
};

// type Combinable = string | number;
// type Numeric = number | boolean;

// // 위 두 타입이 겹치는 타입은 number라 Universal의 type 의 number다
// type Universal = Combinable & Numeric;

// // type guards

// function add(a: Combinable, b: Combinable) {
//   if (typeof a === "string" || typeof b === "string") {
//     return a.toString() + b.toString();
//   }
//   return a + b;
// }

type UnSnownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnSnownEmployee) {
  console.log("Name: " + emp.name);
  // 위와 달리 기본 js type이 아닌 경우 typeof 로는 타입체크가 불가하다.
  // 그래서 js기본 문법인 다음을 사용하여 타입체크를 할 수 있다.
  if ("privileges" in emp) {
    console.log("Privilages: " + emp.privileges);
  }
  if ("startDate" in emp) {
    console.log("Start Date: " + emp.startDate);
  }
}

printEmployeeInformation({ name: "Manu", startDate: new Date() });

class Car {
  drive() {
    console.log("Driving....");
  }
}

class Truck {
  drive() {
    console.log("Driving a truck ...");
  }

  loadCargo(amount: number) {
    console.log("loading cargo ..." + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  // class 를 사용할 때 instanceof 를 사용하여 타입체크가 가능하다.
  // interface일 때는 못쓴다.
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}

useVehicle(v1);
useVehicle(v2);

//Discriminated union

// interface에 각각 type 값을 넣어줘서 union 타입의 타입가드 역할을 하게끔 해준다.
interface Bird {
  type: "bird";
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  // 말인지 새인지를 type 값으로 체크한다.
  // switch로 type 값으로 다룰시 case에서 이미 type값이 무엇인지 예시를 준다.
  // 그런 의미에서 type switch 패턴은 안전한 타입 가드이다.
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
  }
  console.log("Moving with speed: " + speed);
}

moveAnimal({ type: "bird", flyingSpeed: 20 });

// type casting

// const paragraph = document.querySelector('p');
// 이렇게 하면 typescript는 paragraph가 HTML의 paragraph element인것을 안다. 하지만

// const paragraph = document.getElementById('message-output')
//이렇게 하면 HTML element인것은 알지만 paragraph인지는 모른다.

// const userInputElement = document.getElementById('user-input')!;
//따라서 이렇게 input 태그에 value값에 접근하려고해도 에러가 나게된다.
// userInputElement.value = 'HI there';

// 해결방법인 type casting ver 1
// const userInputElement = <HTMLInputElement>document.getElementById('user-input')!;

//ver2
// const userInputElement = document.getElementById('user-input') as  HTMLInputElement;

//ver3 type 이 null 일 수도 있는 경우를 생각하고 싶다면
const userInputElement = document.getElementById("user-input");

if (userInputElement) {
  (userInputElement as HTMLInputElement).value = "Hi there";
}

//index properties

// interface에 특정 값의 타입을 지정하고 싶은데 어떤 이름을 가질지 모르겠다면
// 다음과 같이 할 수 있다.
interface ErrorContainer {
  // {email: 'Not a valid email' , username: 'Must start with a character'}
  [prop: string]: string;
}
// 대신 이렇게 하면 안에 id: number와 같이 index에서 정한 타입이 아닌 타입을 쓸 수 없다.
// key 도 마찬가지이다. 만약 [prop: number]면 key값에 숫자가 아닌 것을 쓸 수 없다.
const errorBag: ErrorContainer = {
  email: "Not a valid email",
  username: "Must start with a character",
};

// function overloads

type Combinable = string | number;
type Numeric = number | boolean;

// 위 두 타입이 겹치는 타입은 number라 Universal의 type 의 number다
type Universal = Combinable & Numeric;

// type guards

// function add(a: Combinable, b: Combinable) {
//   if (typeof a === "string" || typeof b === "string") {
//     return a.toString() + b.toString();
//   }
//   return a + b;
// }

// 이와 같이 유니언 타입으로 지정시 add 함수는 값이 들어갈때 string이든 number든 둘다 가능하다.
// 하지만 이는 큰 단점이 있다.
// const result = add(1 , 5);
// 이런 경우 add 함수에 number를 넣었기 때문에 우리는 result에 number내장 함수를 쓸 수 있을 것 같지만
// result는 여전히 string | number 고 number 내장함수를 쓸 수 없다. (string인 경우도 마찬가지)

// type casting을 쓸 수 있지만 add를 부를때마다 계속 써야하는 단점이 있다.
// 이때 function overload를 쓴다.

function add(a: number, b: number): number; // function overload to number
// function add(a: number ) : number  // b 가 옵션일 때( function add(a: Combinable, b?: Combinable)  )는 이렇게도 된다.
function add(a: string, b: string): string; // function overload to string

function add(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

const result = add("MAx", "schwarz");
result.split("");

// optional chaining

const fetchedUserData = {
  id: "u1",
  name: "max",
  job: { title: "CEO", description: "My own company" },
};

console.log(fetchedUserData.job.title);

// 이런 객체에서 만약 job이 없다면 console 은 에러를 낼 것이다.
// 그때는 fetchedUserData.job && fetchedUserData.job.title 식으로 값이 있는지 체크를 해도 되지만
// optional chaining을 써도 된다.

console.log(fetchedUserData?.job?.title);
// ?. 전의 객체가 값이 있어야 다음으로 넘어가는 구조이다.

// Nullish coalescing(합체)

const userInput = ""; // falsy value

// 여기서는 userInput이 falsy값이지만 만약 dom이나 다른 요소를 가져온 값인데
// 그게 null 이라면 다음처럼 || 으로 falsy 값 판단용말고
// const storedData = userInput || 'DEFAULT';

// 다음처럼 ?? 로 판단할 수 있다.
const storedData = userInput ?? "DEFAULT";
