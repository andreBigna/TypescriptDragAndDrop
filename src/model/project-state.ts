import { ProjectStatus } from "../enums/project-status";
import { Project } from "./project";
import { State } from "./state";

export class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  public addProject(project: Project) {
    this.projects.push(project);
    this.updateListeners();
  }

  public moveProject(projectId: string, status: ProjectStatus) {
    const project = this.projects.find((prj) => {
      return prj.id === projectId;
    });
    if (!project || project.status === status) return;
    project.status = status;
    this.updateListeners();
  }

  public updateListeners() {
    for (const listener of this.listeners) listener(this.projects.slice()); 
  }
}

export const projectState = ProjectState.getInstance();
