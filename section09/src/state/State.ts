
import Project from "../models/Project";

type ChangeNotifyListener<T> = (items: T) => void;
type Reducer<T> = (oldState:T) => T;

export default abstract class State<T> {

  private listeners:ChangeNotifyListener<T>[] = [];
  protected state: T;
 
  protected constructor(defaultState:T) {
    this.state = defaultState;
  }
 
  protected setState(reducer:Reducer<T>) {
    const newState = reducer(this.state);
    this.state = newState;
    this.notify();
  };

  subscribe(listener:ChangeNotifyListener<T>): void{
    this.listeners.push(listener);
  }

  private notify(): void {
    this.listeners.forEach((listener) => {
      listener(this.state);
    })
  }
}
