import autoBind from "../decorator/AutoBind";
import Validateable, { autoValidate, required, minNumber, maxNumber, minLength, maxLength } from "../decorator/validation";


export default class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.loadTemplate();
    this.bindEvent();
    this.attach();
  }

  private loadTemplate() {
    this.templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("root")! as HTMLDivElement;
    const importedHtmlNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedHtmlNode.firstElementChild as HTMLFormElement;
    this.element.id = "user-input";
    this.titleInputElement = this.element.querySelector(
      "#title"
    )! as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    )! as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    )! as HTMLInputElement;
  }

  private bindEvent() {
    this.element.addEventListener("submit", this.onSubmit);
  }

  @autoBind
  private onSubmit(e: Event) {
    e.preventDefault();
    try {
      const userInput = this.gatherUserInput();
      console.log(userInput.title, userInput.description, userInput.people);
      this.clearInput();
    } catch(err) {
      alert((err as Error).message);
    }
    
  }

  private gatherUserInput(): UserInput {
    const title = this.titleInputElement.value.trim();
    const description = this.descriptionInputElement.value.trim();
    const poeple = +this.peopleInputElement.value.trim();
    return new UserInput(title, description, poeple);
  }

  private clearInput() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}


@autoValidate("invalid input. please try again!!!!")
class UserInput implements Validateable {

  @required
  title:string;

  @required
  @minLength(10)
  @maxLength(50)
  description:string;
  
  @maxNumber(10)
  @minNumber(5)
  people:number;

  constructor(title:string, description:string, people:number) {
    this.title = title;
    this.description = description;
    this.people = people;
  }
  
  validate() {
    return true;
  }
}