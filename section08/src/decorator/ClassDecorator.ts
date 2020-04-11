import { Constructable, Renderable, Validateable } from "../typedef/interface";
import { validate, registeredValidators } from "./PropertyDecorator";

const _root = document.getElementById("root")!;


export default function AutoRender<T extends Constructable<Renderable>>(
  constructable: T
) {
  return class extends constructable {
    constructor(...args: any[]) {
      super(...args);
      _root.innerHTML += this.render();
    }
  };
}


export function AfterRender(methodName: string) {
  return function <T extends Constructable<Renderable>>(constructable: T) {
    return class extends constructable {
      constructor(...args: any[]) {
        super(...args);
        if (
          methodName in this &&
          typeof (this as any)[methodName] === "function"
        ) {
          (this as any)[methodName]();
        } else {
          throw new Error(
            `cannot execute "${methodName}" method. ${
              (constructable as any).constructor.name
            } class does not have that method.`
          );
        }
      }
    };
  };
}


export function AutoValidate<T extends Constructable<Validateable>>(
  constructable: T
) {
  const adjClass = class extends constructable {
    constructor(...args: any[]) {
      super(...args);
      if (typeof this.validate === "function") {
        if (!this.validate(this)) {
          throw new Error("invalid input. please try again.");
        }
      }
    }
  };

  let registeredKey = (constructable as any).name;
  if(registeredKey in registeredValidators) {
    registeredValidators[(adjClass as any).name] = registeredValidators[registeredKey];
  }
  
  return adjClass;
}