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