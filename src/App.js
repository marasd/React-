import NavigationBar from "./components/NavigationBar/NavigationBar";
import Dashboard from "./components/Dashboard/Dashboard"
import Courses from "./components/Courses/Courses"
import CoursesDetails from "./components/CoursesDetails/CoursesDetails";
import Instructors from "./components/Instructors/Instructors";
import { BrowserRouter as  Router, Switch, Route } from "react-router-dom";
import EditCourse from "./components/EditCourse/EditCourse";
import AddCourse from "./components/AddCourse/AddCourse"
import AddInstructor from "./components/AddInstructor/AddInstructor"

function App() {
  return (
    <Router>
      <div className="App container-fluid">
        <NavigationBar></NavigationBar>
        <Switch>
          <Route path="/" exact component= {Dashboard}/>
          <Route path="/courses"  component= {Courses} />
          <Route path="/courses_details"  component = {CoursesDetails} />
          <Route path="/edit_course" component={EditCourse}/>
          <Route path="/instructors" component={Instructors}/>
          <Route path="/add_course" component={AddCourse}/>
          <Route path="/add_instructor" component={AddInstructor}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
