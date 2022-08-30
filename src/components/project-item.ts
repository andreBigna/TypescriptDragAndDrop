import { autoBind } from "../decorators/autobind";
import { Project } from "../model/project";
import { Draggable } from "./../interfaces/draggable";
import { Component } from "./base-component";


export class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  constructor(hostID: string, private project: Project) {
    super("single-project", hostID, "beforeend", project.id);

    this.configure();
    this.renderContent();
  }

  configure(): void {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndtHandler);
  }

  renderContent(): void {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector(
      "h3"
    )!.textContent = `${this.project.People} Assigned`;
    this.element.querySelector("p")!.textContent = this.project.description;
  }

  @autoBind
  dragStartHandler(event: DragEvent): void {
    event.dataTransfer!.setData("text/plain", this.project.id);
    event.dataTransfer!.effectAllowed = "move";
  }

  @autoBind
  dragEndtHandler(event: DragEvent): void {
    console.log(event);
  }
}
