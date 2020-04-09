import { Renderable } from "../typedef/interface";
import AutoRender from "../decorator/ClassDecorator";
import CardTemplete from "../decorator/MethodDecorator";

@AutoRender
export default 
class Article implements Renderable {

  private title:string;
  private contents:string;

  constructor(title:string, contents:string) {
    this.title = title;
    this.contents = contents;
  }

  @CardTemplete
  render() {
    return `
      <article>
        <h3>${this.title}</h3>
        <p>${this.contents}</p>
      </article>
    `;
  }
}