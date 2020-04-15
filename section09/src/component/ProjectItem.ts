import Component, { InsertPosition } from "./Component";
import Project from "../state/Project";
import Dragable, { DragTarget } from "./Dragable";
import autoBind from "../decorator/AutoBind";

export default class ProjectItem
  extends Component<HTMLDivElement, HTMLLIElement>
  implements Dragable {
  
  // constructor
  constructor(private project: Project) {
    super(
      "single-project",
      `${project.status}-projects-list`,
      `${project.id}`,
      InsertPosition.beforeEnd
    );
    this.renderContent();
    this.configure();
  }

  // getter
  get persons() {
    if (this.project.people > 1) {
      return `${this.project.people} people`;
    } else {
      return `${this.project.people} person`;
    }
  }
  
  configure() {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }

  renderContent() {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent = `${this.persons}`; // getter
    this.element.querySelector("p")!.textContent = this.project.description;
  }

  @autoBind
  dragStartHandler(e: DragEvent) {
    console.log(e, "dragStartHandler");
    e.dataTransfer!.setData("text/plain", this.project.id.toString());
    e.dataTransfer!.effectAllowed = "move";
  }

  @autoBind
  dragEndHandler(e: DragEvent) {
    console.log(e, "dragEndHandler");
  }

}
