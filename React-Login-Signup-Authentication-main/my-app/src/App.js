import "./App.css";
import Profile from "./Components/Profile/Profile";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Dashboard from "./Components/Dashboard/Dashboard";
import EmployeeTable from "./Components/Employeetable/EmployeeTable";

function App() {
  const [userstate, setUserState] = useState({});
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
                <Login setUserState={setUserState} />
            }
          ></Route>
          <Route
            path="/login"
            element={<Login setUserState={setUserState} />}
          ></Route>
          <Route path="/signup" element={<Register />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/employeetable" element={<EmployeeTable />}></Route>
          <Route path="/register" element={<Register/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
