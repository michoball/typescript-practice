// unknown type
// unknown 타입은 기본적으로 어떤 값이 올지 모른다는 의미로 어떤 타입의 값이든 올 수 있다.
// 하지만 특정 타입을 가지는 값에 unknown 타입의 변수를 넣을 수는 없다.
let userInput: unknown;
userInput = 5;
userInput = "max";
// 이렇게 아무거나 되지만

let userName: string;

//userName = userInput;
// 요렇게는 안된다. ---> userInput: any면 됨

if (typeof userInput === "string") {
  userName = userInput;
}
// 아니면 이렇게는 됨
// unknown은 어떤 값이 올지 모른다는 의미에서 any와 같지만 any보다는 유연하지 않은 타입이라
// any를 쓰는 상황에 고려해볼만한 타입이다.

//never type
// 이와 같은 함수의 경우 throw는 함수를 깨고 콘솔에 에러를 던지는 것이라
// 이 함수는 절대 return 값을 가질 수 없다.
// 이럴 경우는 리턴타입으로 never를 쓸 수 있다.
// 이러면 코드의 퀄리티가 상승하고 함수의 타입이 더 분명해진다.
// 마찬가지로 while()과 같은 함수로 infinite loop를 만들어도 똑같다.
function generateError(message: string, code: number): never {
  throw { message: message, errorCode: code };
}

generateError("An error occured", 500);
