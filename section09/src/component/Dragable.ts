export default interface Dragable {
  dragStartHandler(e:DragEvent): void;
  dragEndHandler(e:DragEvent): void;
}

// drag over -> drop -> dragLeave
export interface DragTarget {
  dragOverHandler(e:DragEvent): void;
  dropHandler(e:DragEvent): void;
  dragLeaveHandler(e:DragEvent): void;
}