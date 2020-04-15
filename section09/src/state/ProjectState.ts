import Project from "../models/Project";
import State from "./State";
import ProjectType from "../models/ProjectType";

const defaultState: Project[] = [];

class ProjectState extends State<Project[]> {
  private static instance: ProjectState;

  static getInstance() {
    if (!ProjectState.instance) {
      ProjectState.instance = new ProjectState();
    }
    return ProjectState.instance;
  }

  private constructor() {
    super(defaultState);
  }

  addProject(project: Project) {
    this.setState((oldState: Project[]) => {
      return [...oldState, project];
    });
  }

  removeProject(project: Project) {
    this.setState((oldState: Project[]) => {
      return oldState.filter((prj) => prj.id !== project.id);
    });
  }

  switchProjectStatus(projectId: number, prjState: ProjectType) {
    this.setState((oldState: Project[]) => {
      return oldState
        .map((prj: Project) => {
          if (prj.id === projectId) {
            prj.status = prjState;
          }
          return prj;
        })
        .slice();
    });
  }
}

const projectState = ProjectState.getInstance();

export default projectState;
