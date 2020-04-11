export interface Renderable {
  render(): string;
}

// interface of constructor function
export interface Constructable<T> {
  new (...args: any[]): T;
}


export interface Validateable {
  validate(obj:any):boolean;
}