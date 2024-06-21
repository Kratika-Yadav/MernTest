import React from 'react';
import basestyle from "../../Components/Base.module.css"
import "../Dashboard/dash.css"; // Import the CSS file for styling
import { Link, useNavigate } from 'react-router-dom';
import SearchableTable from './SearchableTable';
 
function EmployeeTable() {
  const userName=localStorage.getItem("userName");
const navigate=useNavigate()
  const logout = ()=>{
    localStorage.clear();
    navigate('/login')
  }
  return (
    <div className="M-div">
    <nav className="navbar">
          <div className="container">
            
            <ul className="nav-links" style={{display:"flex",alignItems:"center"}}>
              <li><a className="navbar-brand" href="/dashboard">Logo</a></li>
            <li><a href="/dashboard">Home</a></li>
            {/* <li><a href="/employeetable" style={{whiteSpace:"nowrap"}}>Employee List</a></li> */}
            <li><Link to="/employeetable">Employee List</Link></li>
            </ul>
          </div>
          <ul className="nav-links" style={{display:"flex",alignItems:"center"}}>
          <li><a href="#" style={{whiteSpace:"nowrap"}}>{userName}</a></li>
              <button className={basestyle.button_common} style={{margin:"0",padding:"10px",fontSize:"15px",letterSpacing:"1px"}} onClick={logout}>Logout</button>
            </ul>
    
        </nav>
       <div style={{padding:"25px"}}>
    <SearchableTable/>
      </div>
       </div>
    
  );
}

export default EmployeeTable