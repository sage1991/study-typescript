import ProjectType from "../types/ProjectType";
import projectState from "../state/ProjectState";
import Project from "../state/Project";
import Component, { InsertPosition } from "./Component";
import ProjectItem from "./ProjectItem"
import { DragTarget } from "./Dragable";
import autoBind from "../decorator/AutoBind";


export default class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {

  listElement:HTMLUListElement;
  projectList:ProjectItem[];
  assignedProject:Project[] = [];
  


  constructor(private type:ProjectType) {
    super("project-list", "root", `${type}-projects`, InsertPosition.beforeEnd);
    this.configure();
    this.renderContent();
  }
  
  renderContent() {
    let listEl = document.getElementById(`${this.type}-projects-list`)!;
    listEl.innerHTML = "";
    this.projectList = [];
    for(const prjItem of this.assignedProject) {
      this.projectList.push(new ProjectItem(prjItem));
    }
  }

  configure() {
    
    this.listElement = (this.element.querySelector("ul")! as HTMLUListElement)
    this.listElement.id = `${this.type}-projects-list`;
    this.element.querySelector("h2")!.textContent = `${this.type.toUpperCase()} Project`;

    projectState.subscribe((projects:Project[]) => {
      this.assignedProject = projects.filter(project => project.status === this.type);
      this.renderContent();
    });

    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);
    this.element.addEventListener("drop", this.dropHandler);
  }

  @autoBind
  dragOverHandler(e: DragEvent) {
    if(e.dataTransfer && e.dataTransfer.types[0] === "text/plain") {
      e.preventDefault();  // this allow drop event
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.add('droppable');
    }
    
  }

  @autoBind
  dropHandler(e: DragEvent) {
    const listEl = this.element.querySelector("ul")!;
    listEl.classList.remove('droppable');
    projectState.switchProjectStatus(+e.dataTransfer!.getData("text/plain"), this.type);
  }

  @autoBind
  dragLeaveHandler(e: DragEvent) {
    const listEl = this.element.querySelector("ul")!;
    listEl.classList.remove('droppable');
  }

}