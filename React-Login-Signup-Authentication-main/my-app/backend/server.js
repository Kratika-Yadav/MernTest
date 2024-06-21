// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

const dir = '../public/uploads';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

const mysqlAdaptor=require('../connectionAdaptor/MysqlAdaptor')
async function getDbConnection(){
    let reportingDbPool= new mysqlAdaptor();
    return reportingDbPool;
}

app.post('/login',async(req,res)=>{
const {email,password}=req.body
  let connection=await getDbConnection()
  let response=await connection.executeQuery('Select * from login where userName=? and pwd=?',[email,password])
  if(response.length!=0){
    res.json(response)
  }
  else{
    res.status(500).json('Invalid Login Details')
  }
 })


 app.post('/addEmployee',async(req,res)=>{
  const {name,
    email,
    designation,
    mobile,
    gender,
    course,image,id}=req.body.data;
    const isUpdate=req.body.isUpdate;
    let connection=await getDbConnection();
    if(isUpdate){
      let response=await connection.executeQuery('UPDATE employee set `email`=?,`designation`=?,`name`=?,`mobile`=?,`gender`=?,`course`=? where id = ?',[email,designation,name,mobile,gender,course,id]);
      res.json({success:true});
    }else{
    let userExists= await connection.executeQuery('Select id from employee where email=?',[email])
    if(userExists && userExists.length==0)
    {
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    const filename = `${Date.now()}.png`;
    fs.writeFile(path.join(dir, filename), base64Data, 'base64', async (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error saving the image' });
      }
      let filePath=`/uploads/${filename}`
      let currentDate= new Date()
     let formattedDate=currentDate.toISOString().slice(0, 19).replace('T', ' ');
    let response=await connection.executeQuery('INSERT INTO employee (`email`,`designation`,`name`,`mobile`,`gender`,`course`,`createdDate`,`image`) values (?,?,?,?,?,?,?,?)',[email,designation,name,mobile,gender,course,formattedDate,filePath]);
    res.json({success:true});
    });
  }
  else{
    return res.status(500).json("User Already Exist");
  }
  }
});

app.post('/deleteEmployee',async(req,res)=>{
  const {id}=req.body
    let connection=await getDbConnection()
    let response=await connection.executeQuery('DELETE from employee where id=?',[id])
      res.json({success:true})
   })

 app.get('/getEmployeeList', async (req, res) => {
  let connection=await getDbConnection()
  let response=await connection.executeQuery('SELECT * from employee')
  res.json(response);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
