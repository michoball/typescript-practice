// typescript에서 쓰는 파일참조 문법
// 여기에 쓰인 타입이나 enum interface등이 어디에 있는지 알려주는 정도만 함
// 이것만 쓰는 걸로는 컴파일에러는 없지만 작동이 되지 않는다.
// /// <reference path="models/drag-drop.ts"/>
// /// <reference path="models/project.ts"/>
// /// <reference path="state/project-state.ts"/>
// /// <reference path="utill/validation.ts"/>
// 여기서 autobind가 project-input과 project-list 보다 먼저 import 되었기 때문에
// project-input과 project-list에서 autobind를 import 안해도 작동되는 것이다
// 하지만 순서를 바꾼다거나 위쪽 import 들을 없앤다고 컴파일에러가 나오지는 않는다 ----> namespace의 맹점
// ----> 밑에 파일에가서 빠진 reference가 없나 확인후 import 해야한다.
// /// <reference path="decorators/autobind.ts"/>
// /// <reference path="components/project-input.ts"/>
// /// <reference path="components/project-list.ts"/>

// tsconfig.json 파일에서 "outFile": "./dist/bundle.js"이 설정을 키고
// "module"을 amd로 바꾸고
// html에서 script 를 dist/bundle.js 로 해야 제대로 작동한다.

// 참조하는 파일의 namespace와 같은 이름으로 namespace를 만들어 그안에 코드를 넣어줘야
// 에러없이 사용가능하다.

// namespace에 쓰인 것들은 그 안에서만 작동이 된다.
// namespace App {
// new ProjectInput();
// new ProjectList("active");
// new ProjectList("finished");
// }

//es2015 구문을 써도 된다.
// 다만 import 된 파일은 dist에서 작동되므로 .js로 해야하고
// namespce를 위한 tsconfig의 설정을 되돌리고 module은 es2015로 해야한다.
// export import 가 es2015이후 문법이기 때문이다.
//html도 <script src="dist/bundle.js" defer/>에서 <script type="module" src="dist/app.js" />로 바꿔야한다.

// namespace와 다르게 import 되지 않는 파일에 대해 에러를 띄워주기 때문에
// 이게 더 나은 방법이다.
// 다만 최신문법을 지원하지 않는 브라우져에서는 사용할 수 없는 단점이 있다.

import { ProjectInput } from "./components/project-input.js";
import { ProjectList } from "./components/project-list.js";

new ProjectInput();
new ProjectList("active");
new ProjectList("finished");
