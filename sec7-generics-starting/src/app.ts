// Built in Generics
// 단일 타입이 아닌 다양한 타입에서 작동하는 컴포넌트를 만들때쓰임
// const names: Array<string> = []; // string[] 을 뜻하는 제네릭 타입
// // names[0].split('') 이렇게 해도 stiring 인걸 알기에 가능하다.

// const promise: Promise<string> = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("This is done!");
//   }, 2000);
// });

// 위와 같은 promise 함수의 경우 promise 타입을 가지지만 정확히 resolve 되는 값의 타입을 설정하지 않으면
// promise.then(data => {
//   data.split('')
// })
// 과 같은 작업을 할때 에러가 날 수 있다.
// 위 예시의 경우 string이라고 명시해줬기 때문에 가능하지 만약 다른 타입이었으면 에러가 났을거다.

// Generic function 만들기

// function merge(objA : object, objB : object) {
//   return Object.assign(objA ,objB)
// }
// 위 함수는 문제가 없는 함수지만

// const mergedObj = merge({name: 'Max'}, {age: 30})
// 이와 같이 변수에 할당하게 되면 typescript는 mergedObj에 우리가 직접 넣었음에도 불과하고
// name과 age가 있는지 모른다. 그래서 mergedObj.name 과 같은 것을 할 수 없다.

// type casting으로 const mergedObj = merge({name: 'Max'}, {age: 30}) 에
// as {name: string, age: number}를 해주면 되지만 변수를 새로 만들때마다 해야하는 번거로움이 있다.

// 다음과 같이 제네릭으로 어떤 타입이 올지는 모르지만 그 타입을 가진다는 의미로
// 다음과 같이 작성할 수 있다.
// function merge<T, U>(objA: T, objB: U) {
//   return Object.assign(objA, objB);
// }

// const mergedObj = merge({ name: "Max" }, { age: 30 });
// 이러면 이제 mergedObj는 내가 merge에 넣은 값의 타입이 할당되게 된다.

// 좀 더 정확히하고 싶으면 merge함수를 불러올 때 제네릭을 넣어도 된다.
// const mergedObj = merge<{name: string, hobbies: string[]}, {age: number}>({ name: "Max", hobbies: ["sports"] }, { age: 30 });
// 하지만 번거롭다. 그냥 제네릭을 써도 된다.

//제약조건
// 위와 같이 <T, U>로 아무 타입이든 올 수 있게하면 되기는 하지만
// 만약 위 처럼 object.assign을 쓰면 값이 무조건 object가 와야하는데
// 이건 object가 아닌 값이 입력되는 상황을 막아주지는 못한다.

// 이때 type constraints를 쓸 수 있다.
// function merge<T extends object, U etends object>(objA: T, objB: U) {
//   return Object.assign(objA, objB);
// }

// 또다른 형식의 제네릭 타입
// 다음과 같이 어떤 타입이 올지 모르는 상황에서 .length를 쓰려면 arguement에 T가 아닌
// length 메서드를 가진 타입을 지정해도 되지만 이처럼 interface에 length를 만들고 타입을 지정해도 된다.
// 이는 argument에  더 많은 자유도를 주면서 제약조건을 성립시키기 때문에 이득이라할 수 잇다.
interface Lengty {
  length: number;
}

function countAndDescribe<T extends Lengty>(ele: T): [T, string] {
  let descriptionText = "Got no value";
  if (ele.length === 1) {
    descriptionText = "Got 1 elements";
  } else if (ele.length > 1) {
    descriptionText = "Got " + ele.length + " elememts.";
  }
  return [ele, descriptionText];
}
console.log(countAndDescribe({ length: 10 }));

// key of 제약조건
// 실제 object의 key 값을 타입으로 사용할 수 있는 방식
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return "Value" + obj[key];
}
extractAndConvert({ name: "max" }, "name");
// 위의 경우 입력된 obj가 name이라는 key를 가지고 있기 때문에 에러가 나지 않는다.

// Generic class

// 클래스에도 제네릭타입을 지정할 수 있다.
// 어떤 타입이 들어올지는 모르나 그 타입값에 대한 일련의 함수들을 만들고
class DataStorage<T> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}
// 실제 값을 만들때 어떤 타입이 들어오는지 다음과 같이 작성하면
// 그에 맞게 맞는 타입의 값만 들어올 수 있도록 해준다.
const textStorage = new DataStorage<string>();
textStorage.addItem("max");
textStorage.addItem("manu");
textStorage.removeItem("max");
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();

// 하지만 참조 값을 다룰때는 removeItem과 같은 일을 하려면 제대로 작동하지 않을 수 있다.
//
const objStorage = new DataStorage<object>();
objStorage.addItem({ name: "max" });
objStorage.addItem({ name: "manu" });
//....
objStorage.removeItem({ name: "max" });
console.log(objStorage.getItems());
// 그래서 이거는 max를 지웠지만 max가 남는다.
// 이를 막으려면

// removeItem(item: T) {
//   if(this.data.indexOf(item) === -1){
//     return
//   }
//   this.data.splice(this.data.indexOf(item), 1);
// }
// 이런식으로 없어지지 않게는 할 수 있다.
// 이런방법말고 진짜로 가능하게 하려면
const maxobj = { name: "max" };
objStorage.addItem(maxobj);
objStorage.removeItem(maxobj);
// 이렇게 하는 수 밖에는 없다.
// 따라서 이렇게 하는 것보다 DataStorage 제네릭 타입을 만들때 원시값만을 가질 수 있다고 표시하는 쪽이 낫다.
// class DataStorage<T extends string | number | boolean>  이렇게
// 또 class 안의 addItem 이나 removeItem에 따로 제네릭 타입을 지정해도 된다.
// generic 타입은 Js의 유연함을 가지며 타입체크를 할 수 있게 해준다..

// Generic Utility type

interface CourseGoal {
  title: string;
  description: string;
  completeUntill: Date;
}

// Partial 은 <> 안에있는 타입을 optional로 만들어준다.
// 그래서 courseGoal의 초기값을  빈 {}로 해도 title, description, completeUntill 같은 값을
// 쓸 수 있는것
function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntill = date;
  // 대신 리턴할 때 Partial이 아닌 진짜 리턴하려는 타입으로 casting해야한다.
  return courseGoal as CourseGoal;
}

// Array나 object에 새로운 값을 추가하거나 제거하는등 값을 다루지 못하게
// 읽기전용 타입을 제네릭으로 지정할 수 있다.
const names: Readonly<string[]> = ["max", "Anna"];
// names.push('Manu')

// Generic vs Union
// 위에 작성한 DataStorage를 union으로 바꿔보자
// class DataStorage{
//   private data: string[] | number[] | boolean[] = [];

//   addItem(item: string | number | boolean) {
//     this.data.push(item);
//   }

//   removeItem(item: string | number | boolean) {
//     this.data.splice(this.data.indexOf(item), 1);
//   }

//   getItems() {
//     return [...this.data];
//   }
// }
// 여기서 문제는 무엇일까?
// union type으로 하면 datStorage를 string으로 했다고 해도
// addItem과 같은 기능에서 number나 boolean을 넣어도 에러가 나지 않는다.
// 이에비해
// Generic은 들어온 타입에 맞는 값만을 addItem과 같은 기능이 사용하도록 알아서 조정해준다.
// 훨씬 간결하고 자유도를 조절해 타입을 체크해주는 방법이다.

// 모든 메서드나 함수에서 다양한 타입을 자유롭게 다루고 싶다면 union
// 그렇지 않고 들어온 타입에 맞게 한가지 타입으로 타입을 좁히고 싶으면 generic 인셈
