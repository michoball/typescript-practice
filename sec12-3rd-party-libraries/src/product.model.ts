// 이전 프로젝트에서 데코레이터로 input 값의 유효성을 검증하는
// validator를 직접 구현햇다.
// 밑의 class-validator는 이를 지원해주는 라이브러리이다.
import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class Product {
  @IsNotEmpty() //"experimentalDecorators" 이거 true로 해야함
  title: string;
  @IsNumber()
  @IsPositive()
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }

  getInformation() {
    return [this.title, `$${this.price}`];
  }
}
