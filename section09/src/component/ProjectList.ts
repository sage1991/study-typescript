import ProjectType from "../types/ProjectType";
import projectState from "../state/ProjectState";
import Project from "../state/Project";


export default class ProjectList {

  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;
  assignedProject:Project[] = [];

  constructor(private type:ProjectType) {

    this.templateElement = document.getElementById("project-list")! as HTMLTemplateElement;
    this.hostElement = document.getElementById("root")! as HTMLDivElement;
    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = `${this.type}-projects`;
    
    this.attach();
    this.renderContent();

    projectState.subscribe((projects:Project[]) => {
      this.assignedProject = projects.filter(project => project.status === this.type);
      this.renderProject();
    });

  }
  
  private renderProject() {
    let listEl = document.getElementById(`${this.type}-projects-list`)!;
    listEl.innerHTML = "";
    for(const prjItem of this.assignedProject) {
      const listItem = document.createElement("li") as HTMLLIElement;
      listItem.textContent = prjItem.title;
      listEl.appendChild(listItem);
    }
  }

  private renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent = this.type.toUpperCase();
  }

  private attach() {
    this.hostElement.insertAdjacentElement("beforeend", this.element);
  }

}