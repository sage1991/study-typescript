import "./style.css";
import Article from "./component/Article";
import Header from "./component/header";
import Topic from "./component/Topic";
import CourseForm from "./component/CourseForm";


const main = () => {
  const header = new Header("Decorators");
  const topics = new Topic([
    "Class Decorator",
    "Property Decorator",
    "Accessor Decorator",
    "Parameter Decorator",
  ]);
  const article = new Article("Decorator", "Decorator is handy!!");
  const form = new CourseForm("create_form", [
    {
      type: "text",
      placeholder: "Course Name",
      id: "title",
    },
    {
      type: "number",
      placeholder: "Cource Price",
      id: "price",
    },
  ]);
};

main();
