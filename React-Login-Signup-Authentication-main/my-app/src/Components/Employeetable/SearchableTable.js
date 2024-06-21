import * as React from 'react';
import { useState,useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import basestyle from "../../Components/Base.module.css";
import Register from '../Register/Register';
import IconButton from '@mui/material/IconButton';
import axios from "axios";
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';

function createData(data) {
  return { id:data.id, image:data.image, name:data.name, email:data.email, mobile:data.mobile, designation:data.designation, gender:data.gender, course:data.course, createData:data.createDate };
}


function SearchableTable() {
  const [searchQuery, setSearchQuery] = useState('');
  const [rows, setRows] = useState([]);
  const [showNewComponent, setShowNewComponent] = useState(false);
  const [editData, setEditData] = useState(null);
  const [editComp, setEditComp] = useState()
  const [filteredRows,setFilteredRows]=useState([]);
  const navigate=useNavigate();
  useEffect(()=>{
    getRows();
  },[]);

const getRows =()=>{
  axios.get("http://localhost:8000/getEmployeeList").then((res) => {
    if(res?.data){
      let data=res.data.map((e)=>{
        return createData(e)});
      setRows(data);
      setFilteredRows(data);
    }
  })
} 
  useEffect(()=>{
setFilteredRows(rows?.filter(row =>
  row?.name?.toLowerCase().includes(searchQuery.toLowerCase())
));
  },[searchQuery])

  const handleButtonClick = () => {
    navigate('/register');
  };
  const handleEdit = (row) => {
    navigate('/register',{ state: row });
  };

  const handleDelete = (id) => {
    // Delete logic here
    axios.post("http://localhost:8000/deleteEmployee",{id}).then((res) => {
      if(res?.data?.success){
        getRows();
        setTimeout(() => {
          alert('Deleted successfully')
        }, 10);
      }
    })
    // setRows(rows.filter(row => row.id !== id.id));
  };


  return (
  <>
      <Box sx={{ width: '49%', borderRadius: '5px', float: 'right', margin: 0, border: 'none' }}>
        <div style={{ display: "flex", gap: "10px", alignItems: "center", justifyContent: "flex-end" }}>Total Results: {filteredRows.length}
          <button className={basestyle.button_common} style={{ margin: "0", padding: "10px", fontSize: "15px", letterSpacing: "1px", width: "max-content" }} onClick={handleButtonClick}>Create Employee</button></div>
        <TextField
          label="Search by Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: '100%', backgroundColor: 'white', borderRadius: "5px" }} // Ensures the TextField takes the full width of the Box
        />
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Unique Id</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="right">Image</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="right">Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="right">Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="right">Mobile</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="right">Designation</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="right">Gender</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="right">Course</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="right">Create Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">{row.id}</TableCell>
                <TableCell align="right"><img src={process.env.PUBLIC_URL+row.image} alt={row.id} style={{ width: 50, height: 50 }} /></TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.mobile}</TableCell>
                <TableCell align="right">{row.designation}</TableCell>
                <TableCell align="right">{row.gender}</TableCell>
                <TableCell align="right">{row.course}</TableCell>
                <TableCell align="right">{row.createDate}</TableCell>
                <TableCell align="right">
                  <Link style={{cursor:"pointer"}} onClick={() => handleEdit(row)}>
                    Edit 
                  </Link>
                  {" "}-{" "}
                  <Link style={{cursor:"pointer"}} onClick={() => handleDelete(row.id)}>
                    Delete
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default SearchableTable