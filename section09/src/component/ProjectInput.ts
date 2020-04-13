import autoBind from "../decorator/AutoBind";
import Project from "../state/Project";
import projectState from "../state/ProjectState";
import ProjectType from "../types/ProjectType";

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
      projectState.addProject(userInput);
      this.clearInput();
    } catch (err) {
      alert((err as Error).message);
    }
  }

  private gatherUserInput(): Project {
    const title = this.titleInputElement.value.trim();
    const description = this.descriptionInputElement.value.trim();
    const poeple = +this.peopleInputElement.value.trim();
    return new Project(
      Date.now(),
      title,
      description,
      poeple,
      ProjectType.active
    );
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
