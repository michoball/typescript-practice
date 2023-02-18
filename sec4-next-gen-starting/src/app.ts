//var 말고 let 이나 const 쓰기
// const userName = "max";
// let age = 30;

//arrow function 쌉가능
// const add = (a : number, b: number) =>  a + b

// console.log(add(2,5))
//이렇게 arrow function의 타입 지정도 가능
const printOutput: (a: string | number) => void = (output) =>
  console.log(output);

//button이 있다면
const button = document.querySelector("button");
//button이 존재할 때 다음과 같은 함수를 할 수 있도록 할 수 있다.
if (button) {
  button.addEventListener("click", (event) => console.log(event));
}

// 다음과 같이 b에 default 값을 줄 수 있다.
// default 값을 설정하고 싶은 변수는 뒤쪽에 둬야 먹힌다.
// const add = (a: number, b: number = 1) => a + b;
// printOutput(add(5));

// spread operator 도 먹힌다.
const hobbies = ["sports", "cooking"];
const activeHbbies = ["hiking"];

activeHbbies.push(...hobbies);

const person = {
  firstName: "max",
  age: 30,
};
const copiedPerson = { ...person };

// rest operator도 된다.

const add = (...numbers: number[]) => {
  // (...numbers : [number,number,number,number]) 이런것도 된다.
  numbers.reduce((a, b) => {
    return a + b;
  }, 0);
};

const addedNumbers = add(5, 10, 2, 3.7);
console.log(addedNumbers);

// Array & Object Destructuring
// 분해할당도 됨
const [hobby1, hobby2, ...remainingHobbies] = hobbies;

console.log(hobbies, hobby1, hobby2);

const { firstName: userName, age } = person;

console.log(userName, age);
