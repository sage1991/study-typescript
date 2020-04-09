import { Renderable } from "../typedef/interface";
import AutoRender from "../decorator/ClassDecorator";
import CardTemplete from "../decorator/MethodDecorator";

@AutoRender
export default 
class Header implements Renderable {

  private title:string;

  constructor(title:string) {
    this.title = title;
  }
  
  @CardTemplete
  render() {
    return `
      <header>
        <h1>${this.title}</h1>
        <hr/>
      </header>
    `;
  }
}