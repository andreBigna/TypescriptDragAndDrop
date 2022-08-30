import { ProjectStatus } from "../enums/project-status";

export class Project {
  public readonly id: string;
  public readonly title: string;
  public readonly description: string;
  public readonly people: number;
  public status: ProjectStatus;

  public get People(): string {
    return this.people.toString() + (this.people > 1 ? " People" : " Person");
  }

  constructor(title: string, description: string, people: number) {
    this.id = title;
    this.title = title;
    this.description = description;
    this.people = people;
    this.status = ProjectStatus.Active;
  }
}
