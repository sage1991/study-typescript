import Project from "./Project";

type ProjectStateListener = (items:Project[]) => void;

class ProjectState {
  
  private listeners: ProjectStateListener[] = [];
  private projects: Project[] = [];
  private static instance:ProjectState;
  
  static getInstance() {
    if(!ProjectState.instance) {
      ProjectState.instance = new ProjectState();
    }
    return ProjectState.instance;
  }

  private constructor() {}

  addProject(project: Project) {
    this.projects.push(project);
    
    for(let i = 0; i < this.listeners.length; i++) {
      this.listeners[i](this.projects.slice());
    }
  }

  subscribe(listener:ProjectStateListener) {
    this.listeners.push(listener);
  }

}

const projectState = ProjectState.getInstance();

export default projectState;