// union type
// function combine(input1: number | string, input2: number | string) {
//   let result;

//   if (typeof input1 === "number" && typeof input2 === "number") {
//     // number일때 만 + 가 될 수 있게 체크
//     result = input1 + input2;
//   } else {
//     // string이니 string을 합칠 수 있다.
//     result = input1.toString() + input2.toString();
//   }
//   return result;
// }

// 위 처럼 number와 string 둘다 인수로 가질 수 있는 타입 ==> union

// Literal type
//  내가 지정한 이름의 타입을 써서 타입을 체크하는 방법
// 다음의 resultConversion에 쓰인 타입은 존재하지 않는 타입으로 여기서는
// 출력값을 number 로 할지 string으로 할지를 정해주는 요소가 가지는 타입이다.
// function combine(
//   input1: number | string,
//   input2: number | string,
//   resultConversion: "as-number" | "as-text" // --> literal type
// ) {
//   let result;

//   if (
//     (typeof input1 === "number" && typeof input2 === "number") ||
//     resultConversion === "as-number"
//   ) {
//     result = +input1 + +input2;
//   } else {
//     result = input1.toString() + input2.toString();
//   }
//   return result;
// }

// const combinedAges = combine(30, 26, "as-number");
// console.log(combinedAges);

// const combinedStringAges = combine("30", "26", "as-number");
// console.log(combinedStringAges);

// const combinedNames = combine("Max", "Anna", "as-text");
// console.log(combinedNames);

//type alias
// union type과 같은 타입을 지정할 때 일일이 지정하기 번거로우니
// 내가 타입을 만드는 것
type Combinable = number | string;
type ConversionDescriptor = "as-number" | "as-text";

function combine(
  input1: Combinable,
  input2: Combinable,
  resultConversion: ConversionDescriptor
) {
  let result;

  if (
    (typeof input1 === "number" && typeof input2 === "number") ||
    resultConversion === "as-number"
  ) {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
}
