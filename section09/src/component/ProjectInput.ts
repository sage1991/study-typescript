import autoBind from "../decorator/AutoBind";
import Project from "../state/Project";
import projectState from "../state/ProjectState";
import ProjectType from "../types/ProjectType";
import Component, { InsertPosition } from "./Component";

export default class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {

  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super("project-input", "root", "user-input", InsertPosition.afterBegin);
    this.configure();
  }

  configure() {
    this.titleInputElement = this.element.querySelector("#title")! as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector("#description")! as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector("#people")! as HTMLInputElement;
    this.element.addEventListener("submit", this.onSubmitHandler);
  }

  renderContent() {}

  @autoBind
  private onSubmitHandler(e: Event) {
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
}
