// import _ from "lodash";
// 그냥 lodash 만 받았으면 에러가 떳을것 -> lodash 는 js 라이브러리이기때문
// ts-lodash 를 받아야 typescript에서도 에러없이 사용할 수 있음
// console.log(_.shuffle([1, 2, 3]));

// declare
// 전역 변수를 타입스크립트에서 사용할 때
// declare를 사용해 해당 변수가 존재하는지 알려줄 수 있다.
// 밑에 코드와 같이 하지 않으면 전역변수인 GLOBAL은 에러가 난다.
// 여기서 GLOBAL은
//<script>var GLOBAL = 'THIS IS SET'</script>으로 html body에 만든 가상의 전역변수이다.
// declare var GLOBAL :any;

// console.log(GLOBAL)
import "reflect-metadata";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

import { Product } from "./product.model";

const p1 = new Product("A Book", 12.99);
// Product class로 만든 p1 의  getInformation실행
console.log(p1.getInformation());

// 이와 같이 백에서 products 데이터를 받아와서

const products = [
  { title: "A Carpet", price: 29.99 },
  { title: "A Book", price: 10.99 },
];

//위와 같이 Product class에 넣고 getInformation을 실행하고 싶을때
// 일반적인 방법은 다음과 같이 배열을 만들고
// const loadedProducts = products.map((prod) => {
//   return new Product(prod.title, prod.price);
// });
// // 루프로 불를 수 있다.
// for (const prod of loadedProducts) {
//   console.log(prod.getInformation());
// }

//이는 복잡하고 번거롭다.
// 이럴때 class-transformer 라이브러리를 쓰면 좋다.

//import "reflect-metadata";
// import { plainToClass} from "class-transformer"
// 이것들을 import 하고

const loadedProducts = plainToClass(Product, products);
for (const prod of loadedProducts) {
  console.log(prod.getInformation());
}
// 이건 바닐라js에서도 잘 작동된다.

// class-validator
const newProd = new Product("", -5.99);
// 다음과 같이 validate 함수로 검증하고 싶은 값을 넣어서 확인해야한다.
// then에는 error로 error가 잇는 경우와 없는 경우로 다룰 수 있다.
// catch는 없다.
validate(newProd).then((errors) => {
  if (errors.length > 0) {
    console.log("VALIDATION ERRORS");
    console.log(errors);
  } else {
    console.log(newProd.getInformation());
  }
});
