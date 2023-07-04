import CreateUser from "./components/CreateUser";
import UserList from "./components/UserList";
import EditUser from "./components/EditUser";
import React from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";



function App() {

  return (
   <>
      <div className="container">
        <h1 style={{fontFamily : "cursive",textAlign : "center"}}>User Management System</h1>
        </div>
        <Router>
        <div className="row">
          <div className="col">
          <Routes>
          {/* <Route path="/" element = {<Login/>}></Route> */}
          <Route path="/" element = {<UserList/>}></Route>
          <Route path="/create/user" element = {<CreateUser/>}></Route>
          <Route path="/edit/user/:userid" element = {<EditUser/>}></Route>
          {/* <Route path="/register" element = {<Register/>}></Route> */}
        </Routes>
          </div>
        </div>
        </Router>
   </>
  );
}

export default App;
