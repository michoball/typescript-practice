// Drag & Drop Interfaces
// namespace App {
//   export interface Draggable {
//     dragStartHandler(event: DragEvent): void;
//     dragEndHandler(event: DragEvent): void;
//   }

//   export interface DragTarget {
//     dragOverHandler(event: DragEvent): void;
//     dropHandler(event: DragEvent): void;
//     dragLeaveHandler(event: DragEvent): void;
//   }
// }

// 위처럼 해도 되고 es6 문법인 import export 를 써도 된다.
export interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

export interface DragTarget {
  dragOverHandler(event: DragEvent): void;
  dropHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void;
}
