import "./app.css";
import ProjectInput from "./component/ProjectInput";
import ProjectList from "./component/ProjectList";
import ProjectType from "./models/ProjectType";

const main = () => {
  const projectInput = new ProjectInput();
  const activeProjectList = new ProjectList(ProjectType.active);
  const finishedProjectList = new ProjectList(ProjectType.finished);
}
main();