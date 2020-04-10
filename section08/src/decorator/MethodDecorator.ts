import { Renderable } from "../typedef/interface";

const d = "a"

export default
function CardTemplete<T extends Renderable> (target:T, methodName:"render", descriptor:PropertyDescriptor) {
  
  const adjDescriptor:PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const renderedTemplete = descriptor.value.call(this);
      return function() {
        return `<div class="card">${renderedTemplete}</div>`;
      };
    }
  }
  return adjDescriptor;
}


export function AutoBind(target:any, methodName:string|symbol, descriptor:PropertyDescriptor) {
  const adjDescriptor:PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      return descriptor.value.bind(this);
    }
  }
  return adjDescriptor;
}