import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Register.css";
import { useNavigate,useLocation } from "react-router-dom";

const RegisterEmployee = () => {
  const location = useLocation();
  const rowData = location.state || null;
  const [formErrors, setFormErrors] = useState({});
  const navigate=useNavigate()
  const [user, setUser] = useState(rowData?rowData:{
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: "",
    image: null,
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
 if (name === "image") {
      const file = e.target.files[0];
      if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setUser({
              ...user,
              image: reader.result,
            });
          };      
          reader.readAsDataURL(file);
      } else {
        setFormErrors({
          ...formErrors,
          image: "Only JPG/PNG images are allowed",
        });
      }
    } else {
      setUser({
        ...user,
        [name]: value,
      });
    }
  };

  const validateForm = (values) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const mobileRegex = /^[0-9]{10}$/;

    if (!values.name) errors.name = "Username is required";
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Invalid email format";
    }
    if (!values.mobile) {
      errors.mobile = "Mobile number is required";
    } else if (!mobileRegex.test(values.mobile)) {
      errors.mobile = "Invalid mobile number format";
    }
    if (!values.designation) errors.designation = "Designation is required";
    if (!values.gender) errors.gender = "Gender is required";
    if (!values.course) errors.course = "At least one course must be selected";
    if (!rowData && !values.image) errors.image = "Image upload is required";

    return errors;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(user);
    setFormErrors(validationErrors);
    if(validationErrors && Object.keys(validationErrors).length==0){
      const formData = {
        name: user.name,
        email:user.email,
        designation:user.designation,
        mobile:user.mobile,
        gender:user.gender,
        course:user.course,
        image:user.image,
        id:user.id
      }
      let updateData=rowData?true:false;
           // Simulating form submission to the backend
      axios.post("http://localhost:8000/addEmployee", {isUpdate:updateData,data:formData}, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          alert(updateData?"Updated successfully":"Registration successful");
          navigate('/employeetable',{replace:true})
        })
        .catch((err) => {
          alert(err.response?.data);
        });
    }
  };

  return (
    <div className="register">
      <form onSubmit={submitHandler}>
        <h1>Employee Registration</h1>
        
        <label>Username</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your username"
          value={user.name}
          onChange={changeHandler}
        />
        {formErrors.name && <p className="error">{formErrors.name}</p>}

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={user.email}
          onChange={changeHandler}
        />
        {formErrors.email && <p className="error">{formErrors.email}</p>}

        <label>Mobile Number</label>
        <input
          type="text"
          name="mobile"
          placeholder="Enter your mobile number"
          value={user.mobile}
          onChange={changeHandler}
        />
        {formErrors.mobile && <p className="error">{formErrors.mobile}</p>}

        <label>Designation</label>
        <select name="designation" value={user.designation} onChange={changeHandler}>
          <option value="">Select designation</option>
          <option value="HR">HR</option>
          <option value="Sales">Sales</option>
          <option value="Manager">Manager</option>
        </select>
        {formErrors.designation && <p className="error">{formErrors.designation}</p>}

        <label>Gender</label>
        <div>
          <input
            type="radio"
            name="gender"
            value="Male"
            onChange={changeHandler}
            checked={user.gender === "Male"}
          /> Male
          <input
            type="radio"
            name="gender"
            value="Female"
            onChange={changeHandler}
            checked={user.gender === "Female"}
          /> Female
          <input
            type="radio"
            name="gender"
            value="Other"
            onChange={changeHandler}
            checked={user.gender === "Other"}
          /> Other
        </div>
        {formErrors.gender && <p className="error">{formErrors.gender}</p>}

        <label>course</label>
        <div>
          <input
            type="checkbox"
            name="course"
            value="MCA"
            checked={user.course === "MCA"}
            onChange={changeHandler}
          /> MCA
          <input
            type="checkbox"
            name="course"
            value="BSC"
            checked={user.course === "BSC"}
            onChange={changeHandler}
          /> BSC
          <input
            type="checkbox"
            name="course"
            value="BCA"
            checked={user.course === "BCA"}
            onChange={changeHandler}
          />BCA
        </div>
        {formErrors.course && <p className="error">{formErrors.course}</p>}

       {!rowData && <> <label>Upload Image</label>
        <input
          type="file"
          name="image"
          accept="image/jpeg, image/png"
          onChange={changeHandler}
        /></>}
        {formErrors.image && <p className="error">{formErrors.image}</p>}

        <button type="submit">{!rowData ? "Register":"Update"}</button>
      </form>
    </div>
  );
};

export default RegisterEmployee;
