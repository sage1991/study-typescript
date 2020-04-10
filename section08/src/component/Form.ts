import { Renderable } from "../typedef/interface";
import AutoRender, { AfterRender } from "../decorator/ClassDecorator";
import CardTemplete, { AutoBind } from "../decorator/MethodDecorator";


export type InputMeta = {
  type:string;
  placeholder:string;
  id:string;
}


@AfterRender("bindEvent")
@AutoRender
export default
class CourseForm implements Renderable {

  private name:string;
  private inputList: [InputMeta, InputMeta];

  constructor(name:string, inputList: [InputMeta, InputMeta]) {
    this.inputList = inputList;
    this.name = name;
  }

  @CardTemplete
  render() {
    return `<form id="${this.name}" method="post">${this.renderInputList()}</form>`;
  }

  renderInputList():string {
    
    let inputTags = "<dl>";
    for(let i = 0; i < this.inputList.length; i++) {
      inputTags += `
        <dt><b>${this.inputList[i].id}</b></dt>
        <dd>
          <input 
            id="${this.inputList[i].id}" 
            name="${this.inputList[i].id}"
            type='${this.inputList[i].type}' 
            placeholder="${this.inputList[i].placeholder}" />
        </dd>
        `;
    }
    inputTags += "<input type='submit' value='save' /><dl>";
    return inputTags;
  }

  bindEvent() {
    (document.getElementById(this.name) as HTMLFormElement).addEventListener("submit", this.onSubmit);
  }

  @AutoBind
  onSubmit(event:Event) {
    
    event.preventDefault();
    
    let [title, price] = this.inputList.map((ele) => {
      return (event.target as HTMLFormElement)[ele.id].value;
    });

    console.log(new Course(title, +price));

  }
  
}

class Course {
  title:string;
  price:number;
  constructor(title:string, price:number) {
    this.title = title;
    this.price = price;
  }
}