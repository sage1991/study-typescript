import { Constructable, Renderable } from "../typedef/interface";

const _root = document.getElementById("root")!;

export default 
function AutoRender<T extends Constructable<Renderable>>(constructable:T) {
  return class extends constructable {
    constructor(...args:any[]) {
      super(...args);
      _root.innerHTML += this.render();
    }
  }
}


export function AfterRender(methodName: string) {
  return function<T extends Constructable<Renderable>>(constructable:T) {
    return class extends constructable {
      constructor(...args:any[]) {
        super(...args);
        if(methodName in this && typeof (this as any)[methodName] === "function") {
          (this as any)[methodName]();
        } else {
          throw new Error(`cannot execute "${methodName}" method. ${(constructable as any).constructor.name} class does not have that method.`);
        }
      }
    }
  }
}

