// class Department {
//   //Department class의 field의 type지정
//   name: string;

//   constructor(n: string) {
//     this.name = n;
//   }

//   describe() {
//     console.log("Department: " + this.name);
//   }
// }

// const accounting = new Department("Accounting");

// accounting.describe();
// this 오류 문제
// const accountingCopy = { describe: accounting.describe };
// accountingCopy.describe(); 여기서 describe가 할 console.log에 name 부분은
// accountingCopy 에 없기 때문에 undefined가 나온다.
// accountingCopy.describe();

// class Department {
//   //Department class의 field의 type지정
//   name: string;

//   constructor(n: string) {
//     this.name = n;
//   }
//   // 이렇게 정확히 명시를 하면
//   // 밑에 accountingCopy.describe(); 부분에 에러가 뜬다.
//   describe(this: Department) {
//     console.log("Department: " + this.name);
//   }
// }
// const accounting = new Department("Accounting");

// // const accountingCopy = { describe: accounting.describe };
// //위   describe(this: Department)  때문에 에러가 뜸
// // accountingCopy.describe();
// //
// //
// const accountingCopy = { name : "dummy", describe: accounting.describe };
// //위dp accountingCopy = { name : "dummy", describe: accounting.describe }; 에
// //name을 넣으니 해결된다.
// accountingCopy.describe();

// class Department {
//   public name: string;
//   private employees: string[] = [];

//   constructor(n: string) {
//     this.name = n;
//   }

//   describe(this: Department) {
//     console.log("Department: " + this.name);
//   }

//   addEmployee(employee: string) {
//     this.employees.push(employee);
//   }

//   printEmployeeInformation() {
//     console.log(this.employees.length);
//     console.log(this.employees);
//   }
// }
// 다음과 같은 코드에서 employee를 추가하고 싶다고 하자
// 사용자는 2가지 방법으로 employee를 추가할 수 있다.
// const accounting = new Department("Accounting");

// // 1번째 방법 -- 함수쓰기
// accounting.addEmployee("Max");
// accounting.addEmployee("Manu");
// // 2번재 방법 -- 직접 employees array에 입력
// // accounting.employees[2] = "Anna";

// accounting.describe();
// accounting.printEmployeeInformation();

// 2번째 방법처럼 직접입력을 놔두면 후에 오류를 발생할 수 있다. (add 할 때 다른 정보도 추가하거나 팀으로 일할때)
// 직접입력은 못하게 하고 싶다면?
// Private property
// employees 값을 private 값으로 바꾸면
// 2번째 방식은 못하게 된다.

// Public property
// private과 반대 Public 이라고 안쓰고 냅두면 기본적으로 Public이다.

// shorthand initialization
// 위와 같이 변수에 타입을 지정하고 constructor에 변수를 초기화 하는 작업은
// 번거로움 --> 간결하게 하는 방법이 필요

// constructor(private id: string, public name: string) {
//   this.id = id;
//   this.name = n;
// }

//이런식으로 하면 간결하게 초기화할 수 있다..

abstract class Department {
  static fiscalYear = 2020;
  protected employees: string[] = [];

  constructor(protected readonly id: string, public name: string) {}

  abstract describe(this: Department): void;
  // {
  // console.log(`Department  (${this.id}) : ${this.name}`);
  // }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  static createEmployee(name: string) {
    return { name: name };
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

// const accounting = new Department("ID", "Accounting");

// console.log(accounting.describe());

// readonly 읽기 전용이다는 표시
//ex) constructor(private readonly id: string, public name: string) {}

// 이렇게 쓰면 id를 수정할 수 없다.

// 상속
class ITDepartment extends Department {
  constructor(id: string, public admins: string[]) {
    //super를 해줘야 상속받는 클래스의 값을 쓸 수 있다.
    // 무조건 먼저 써줘야한다.
    super(id, "IT");
    this.admins = admins;
  }

  describe() {
    console.log("asief;lajse;lfja;sleifj" + this.id);
  }
}

const it = new ITDepartment("ID", ["Max"]);

it.addEmployee("Max");
it.addEmployee("Manu");

it.describe();
it.name = "NEW_NAME";
it.printEmployeeInformation();

console.log(it);

class AccountingDepartment extends Department {
  private lastReport: string;
  private static instance: AccountingDepartment;

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("No report found");
  }
  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error("Please pass in a valid value!");
    }
    this.addReport(value);
  }

  private constructor(id: string, private reports: string[]) {
    super(id, "ACC");
    this.lastReport = reports[0];
  }

  static getInstance() {
    if (AccountingDepartment.instance) {
      return this.instance;
    }
    this.instance = new AccountingDepartment("d2", []);
    return this.instance;
  }

  describe() {
    console.log("Accounting Department - ID : " + this.id);
  }

  // employees 는 private 이라 해당 클래스 안에서만 수정이 가능 그래서 여기서는 에러가 뜸
  // private 값은 protected로 바꾸면 상속받는 클래스에서는 접근이 가능해짐
  addEmployee(name: string) {
    if (name === "Max") {
      return;
    }
    this.employees.push(name);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReports() {
    console.log(this.reports);
  }
}

// const accounting = new AccountingDepartment("d2", []);
const accounting = AccountingDepartment.getInstance();
const accouting2 = AccountingDepartment.getInstance();

console.log(accounting, accouting2);

accounting.mostRecentReport = "sss";
accounting.addReport("Something went wrong...");

console.log(accounting.mostRecentReport);

accounting.printReports();

const employee1 = Department.createEmployee("Max");
console.log(employee1, Department.fiscalYear);

//static Method & property
// new 없이 불러올 수 잇는 방법
// static fiscalYear = 2020;
// static createEmployee(name: string) {
//   return { name: name };
// }

// Abstract class
// 부모 class로 부터 함수나 값을 상속 받을 때
//  만들어진 것을 상속 받는게 아니라
// 형식만 정해지고 상속받은 class에서 재창조할 수 있게 하는 기능
// class안에 abstract가 있으면 그 class앞에도 abstract를 써줘야 한다.
// 클라스 앞에 써줘야하기는 하지만 그렇다고 클래스를 조작할 수 있다는 것은 아니다.

// singletons & private constructor
// private constructor를 사용하면 new 키워드로 class를 만들 수 없다.
// 그래서 static 으로 class를 저장하는 변수를 만들어 저장하고
//  private static instance: AccountingDepartment;
// static 으로 instance를 불러오는 함수를 만들어두고 외부에서 함수를 불러
// class를 가져오는 방법을 쓸 수 있다.

// private constructor(id: string, private reports: string[]) {
//   super(id, "ACC");
//   this.lastReport = reports[0];
// } --> 이런게 있는 class에는

// private static instance: AccountingDepartment;
// static getInstance() {
//   if (AccountingDepartment.instance) {
//     return this.instance;
//   }
//   this.instance = new AccountingDepartment("d2", []);
//   return this.instance;
// } --> 이런걸 만들어서  클래스 외부에서 불러올 수 있다.

// const accounting = AccountingDepartment.getInstance();
// const accouting2 = AccountingDepartment.getInstance();
// 이렇게
