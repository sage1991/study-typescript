import Validateable, { autoValidate, required, minLength, maxLength, maxNumber, minNumber } from "../core/decorator/validation";
import ProjectType from "./ProjectType";

@autoValidate("invalid input. please try again!!!!")
export default class Project implements Validateable {

  @required
  readonly id:number;

  @required
  title:string;

  @required
  @minLength(10)
  @maxLength(50)
  description:string;
  
  @maxNumber(5)
  @minNumber(1)
  people:number;

  @required
  status:ProjectType;

  constructor(id:number, title:string, description:string, people:number, status:ProjectType) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.people = people;
    this.status = status;
  }
  
  validate() {
    return true;
  }
}