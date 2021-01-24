import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { createContext, useEffect, useState } from 'react';
import Home from './components/Home/Home/Home';
import Login from './components/Login/Login';
import Department from './components/Department/Department/Department';
import StudentsInfo from './components/StudentsInfo/StudentsInfo/StudentsInfo';
import PrivateRoute from './components/Login/PrivateRoute';
import EnrollStudent from './components/StudentsInfo/EnrollStudent/EnrollStudent';
import AddDepartment from './components/StudentsInfo/AddDepartment/AddDepartment';
import MakeAdmin from './components/StudentsInfo/MakeAdmin/MakeAdmin';
import StudentProfile from './components/StudentsInfo/StudentProfile/StudentProfile';
import StudentByDepartment from './components/StudentsInfo/StudentByDepartment/StudentByDepartment';
import NoMatch from './components/NotAccess/NoMatch/NoMatch';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    setLoggedInUser(JSON.parse(localStorage.getItem("user")) || {});

  }, []);


  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Switch>
          <Route exact path="/" >
            <Home></Home>
          </Route>
          <Route path="/home" >
            <Home></Home>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/department">
            <Department></Department>
          </PrivateRoute>
          <Route path="/student/allstudent">
            <StudentsInfo></StudentsInfo>
          </Route>
          <Route path="/students/allstudent/:department">
            <StudentByDepartment />
          </Route>
          <Route path="/students/enrollment">
            <EnrollStudent />
          </Route>
          <Route path="/students/department">
            <AddDepartment />
          </Route>
          <Route path="/students/admin">
            <MakeAdmin />
          </Route>
          <Route path="/students/profile/:department/:roll">
            <StudentProfile></StudentProfile>
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
