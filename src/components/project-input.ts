import { autoBind } from "../decorators/autobind";
import { Project } from "../model/project";
import { projectState } from "../model/project-state";
import { validate } from "../model/validation";
import { Component } from "./base-component";

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  private titleInputElement: HTMLInputElement;
  private descriptionInputElement: HTMLInputElement;
  private peopleInputElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", "afterbegin", "user-input");

    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;

    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;

    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;

    console.log(this.titleInputElement);
    console.log(this.descriptionInputElement);
    console.log(this.peopleInputElement);

    this.configure();
    this.renderContent();
  }

  public configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  renderContent(): void {}

  private getUserInput(): Project {
    const titleValidatable = {
      value: this.titleInputElement.value,
      required: true,
      minLength: 5,
      maxLength: 50,
    };
    const descriptionValidatable = {
      value: this.descriptionInputElement.value,
      required: true,
      minLength: 5,
      maxLength: 100,
    };
    const peopleValidatable = {
      value: this.peopleInputElement.value,
      required: true,
      min: 1,
      max: 10,
    };

    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ) {
      throw new Error("errore validazione");
    }

    return new Project(
      this.titleInputElement.value,
      this.descriptionInputElement.value,
      +this.peopleInputElement.value
    );
  }

  @autoBind
  private submitHandler(event: any) {
    try {
      event?.preventDefault();
      const input = this.getUserInput();
      if (input instanceof Project) {
        projectState.addProject(input);
        this.clearInputs();
      }
    } catch (error: any) {
      alert(error.message);
    }
  }

  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }
}
