import { autoBind } from "../decorators/autobind";
import { ProjectStatus } from "../enums/project-status";
import { DragTarget } from "../interfaces/drag-target";
import { Project } from "../model/project";
import { projectState } from "../model/project-state";
import { Component } from "./base-component";
import { ProjectItem } from "./project-item";

export class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  private assignedProjects: Project[] = [];

  constructor(private type: ProjectStatus) {
    super(
      "project-list",
      "app",
      "beforeend",
      `${type.toLocaleLowerCase()}-projects`
    );

    projectState.addListener((projects: Project[]) => {
      this.assignedProjects = projects.filter((prj) => {
        return this.type === prj.status;
      });
      this.renderProjects();
    });

    this.configure();
    this.renderContent();
  }

  @autoBind
  dragOverHandler(event: DragEvent): void {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      event.preventDefault();
      this.element.querySelector("ul")!.classList.add("droppable");
    }
  }

  @autoBind
  dropHandler(event: DragEvent): void {
    const projId = event.dataTransfer!.getData("text/plain");
    projectState.moveProject(projId, this.type);
  }

  @autoBind
  dragLeaveHandler(_: DragEvent): void {
    this.element.querySelector("ul")!.classList.remove("droppable");
  }

  renderContent(): void {
    this.element.querySelector("ul")!.id = `${this.type}-projects-list`;
    this.element.querySelector("h2")!.textContent = `${this.type} PROJECTS`;
  }

  configure(): void {
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("drop", this.dropHandler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);
  }

  private renderProjects() {
    this.element.querySelector("ul")!.innerHTML = "";
    for (const project of this.assignedProjects) {
      new ProjectItem(this.element.querySelector("ul")!.id, project);
    }
  }
}
