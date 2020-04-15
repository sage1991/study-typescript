import Renderable from "../core/interface/Renderable"

export default abstract class Component<T extends HTMLElement, U extends HTMLElement> implements Renderable {
  
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;
  insertPosition: InsertPosition;

  constructor(templateId:string, hostElementId:string, newElementId?:string, insertPosition?:InsertPosition) {
    this.insertPosition = insertPosition ? insertPosition : InsertPosition.afterBegin;
    this.loadTemplate(templateId, hostElementId);
    this.importNode(newElementId);
    this.render();
  }

  private loadTemplate(templateId:string, hostElementId:string) {
    this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId)! as T;
  }


  private importNode(newElementId?:string) {
    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as U;
    if(newElementId) {
      this.element.id = newElementId;
    }
  }

  render() {
    let position:globalThis.InsertPosition;
    switch(this.insertPosition) {
      case InsertPosition.afterEnd : 
        position = "afterend";
        break;
      case InsertPosition.beforeEnd : 
        position = "beforeend";
        break;
      case InsertPosition.beforeBegin : 
        position = "beforebegin";
        break;
      case InsertPosition.afterBegin : default : 
        position = "afterbegin";
        break;
    }
    this.hostElement.insertAdjacentElement(position, this.element)
  }

  abstract configure(): void;
  abstract renderContent(): void;
}

export enum InsertPosition {
  beforeBegin = "beforebegin",
  afterBegin = "afterbegin",
  beforeEnd = "beforeend",
  afterEnd = "afterend",
}