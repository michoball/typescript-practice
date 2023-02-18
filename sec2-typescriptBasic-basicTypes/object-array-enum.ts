//object type
// const person = {
//   name: "Max",
//   age: 30
// }
//const person : {} == const person: object
// 하지만 후자는 각 key의 타입을 지정할 수 없다.
// 따라서 person object의 타입은 person : {name: string, age: number} 식으로 쓸 수 있다.
// 안써도 지금 상황에서는 사실 ts가 알아서 입력값을 보고 타입을 지정한다.

//array type
// const person = {
//   name: "Max",
//   age: 30,
//   hobbies: ['sports', 'Cooking']
// }
// hobbies의 경우 string 값이 있는 array로 ts에서는 string[]라고 표시할 수 있다.

// tuple type
// const person = {
//   name: "Max",
//   age: 30,
//   hobbies: ["sports", "Cooking"],
//   role: [2, 'author']
// };
//role 은 항상 첫번째는 number 두번째는 string 을 갖는 타입이라고 할때 그냥 저렇게만 놔두면
// ts는 role은 string[]이거나 number[]이다 라고 인식하여 첫번째 값에 string을 넣는 것도 가능하게 한다.
// 이를 방지하기 위한 타입이 튜플 tuple이다.
// const person = {
//   name: string,
//   age: number,
//   hobbies: string[],
//   role: [number, string]; --> tuple
// };
// 이렇게 하면 각 idx에 다음의 타입만이 가능하다.
// 하지만 push와 같은 method는 방지해주지 못한다.
// -> 이럴때 어차피 지정한 tuple의 length 제한히 있어서 에러가 나기는 한다. 하지만 못막는다.

// person.role.push("admin"); --> 이거는 가능함
// person.role[1] = 10; --> 이거 안됨
// person.role = [0, "admin", "user"]; --> 이거 안됨

//Enum type
// 특정 값에 변하지 않는 특수한 type을 지칭하고 싶을 때
// const ADMIN = 0
// const READ_ONLY = 1;
// const AUTHOR = 2;

// const person = {
//   name: "Max",
//   age: 30,
//   hobbies: ["sports", "Cooking"],
//   role: ADMIN,
// };
// 이처럼 role에 특정 값을 대문자로 지정하고 role을 체크할 수도 있지만 -> 예전 saga 배울 때 type지정한 것처럼
// 결국 role의 타입은 number이기 때문에 지정한 숫자 말고 다른 숫자가 와도 에러가 나지 않는다.
// 이때 enum을 쓸 수 있다.

enum Role {
  ADMIN,
  READ_ONLY,
  AUTHOR,
}
// 대문자로 표시하는 것은  enum의 전형적인 방법이다.

// enum Role {
//   ADMIN = 'ADMIN',
//   READ_ONLY = 100,
//   AUTHOR = 3,
// }
// 이렇게 해도 무관

//any type
// 어떤 타입이든 될 수 있다는 것 매우 유연한 타입-> 뭐 타입 없다랑 비슷한거지
// 진짜 무슨 타입이 올지 모를때나 런타임 에러가 있는지 알고 싶을 때 쓰지 다른경우에는 쓰지말길

const person = {
  name: "Max",
  age: 30,
  hobbies: ["sports", "Cooking"],
  role: Role.ADMIN,
};

let favoriteActivities: any[];
favoriteActivities = ["Sports", 1];

console.log(person.name);

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
}
