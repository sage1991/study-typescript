import { Renderable } from "../typedef/interface";
import AutoRender from "../decorator/ClassDecorator";
import CardTemplete from "../decorator/MethodDecorator";

@AutoRender
export default 
class Topic implements Renderable {

  private topicList:string[];

  constructor(topicList:string[]) {
    this.topicList = topicList;
  }

  @CardTemplete
  render() {
    return `
      <nav>
        <h2>Topic List</h2>
        <dl>${this.generateTopicList()}</dl>
      </nav>
    `;
  }
  
  generateTopicList() {
    let items = "";
    for(let i = 0; i < this.topicList.length; i++) {
      items += `
        <li data-id="${i}">
          <a href="#">${this.topicList[i]}</a>
        </li>
      `;
    }
    return items;
  }

}