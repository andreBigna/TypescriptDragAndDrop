export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  protected readonly templateElement: HTMLTemplateElement;
  protected readonly hostElement: T;
  protected readonly element: U;

  constructor(
    templateId: string,
    hostId: string,
    insertPosition: InsertPosition,
    newElementId?: string
  ) {
    this.templateElement = document.getElementById(
      templateId
    ) as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostId) as T;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    this.element = importedNode.firstElementChild as U;
    if (newElementId) this.element.id = newElementId;

    this.attach(insertPosition);
  }

  private attach(insertPosition: InsertPosition) {
    this.hostElement.insertAdjacentElement(insertPosition, this.element);
  }

  abstract configure(): void;
  abstract renderContent(): void;
}
