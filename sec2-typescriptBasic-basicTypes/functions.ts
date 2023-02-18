// function return type
// function add(n1: number, n2: number)뒤에 : 와 타입을 넣으면 리턴되는 값의 타입을 지정할 수 있다.

function add(n1: number, n2: number) {
  return n1 + n2;
}
// 여기는 return 하는 값이 없기에 리턴값이 void로 찍힌다.
// 이 함수를 console.log()를 찍으면 undefined가 찍힌다. 리턴 값이 void니까
// 하지만  undefined가 찍힌다고 리턴값을 undefined로 하면 안된다.
// 하려면 return ; 를 함수 내에 넣어야 한다.
// 뭐 대부분의 경우 안쓰는게 좋다고 보면된다.
function printResult(num: number): void {
  console.log("Result : " + num);
}

printResult(add(5, 12));

//functions as type

// let combineValues;

// combineValues = add;
// 여기서 combineValues는 any 타입을 갖게 된다. 그래서 여기에 다른 숫자 같은 것을 넣어도
// 컴파일과정에서는 에러로 인식되지 않는다.
// let combineValues : function; 이라고 하면 문제가 해결 되기는 하지만 완벽하지는 않다.
// 왜냐하면 이렇게하면 combineValues 에 add가 아닌 prinResult를 한 경우도 컴파일 에러가 안나게 되는데
// 런타임에서 오류가 나게 된다.

let combineValues: (a: number, b: number) => number;
// 이러면 정확하게 명시가 된다 어떤 함수의 형태를 받을 것인지

combineValues = add;

console.log(combineValues(8, 8));

//function type & callback
// 다음처럼 callback 함수에 대한 타입을 지정했으면
// 함수를 부를때 callback함수에 또 타입을 지정할 필요가 없다.
function addAdndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  return cb(result);
}

addAdndHandle(10, 20, (result) => {
  console.log(result);
});
