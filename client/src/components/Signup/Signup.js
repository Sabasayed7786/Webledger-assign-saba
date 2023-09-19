import React, { useState } from 'react';

import { useNavigate, Link } from 'react-router-dom';
import "./Signup.css"


const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: ""
  });
  
  let name, value;

  const handleInputs = (e) => {
    const name = e.target.name; // 
    const value = e.target.value; 

    setUser({ ...user, [name]: value });
  }


  const PostData = async (e) => {
    e.preventDefault();
  
    const { name, email, password, cpassword } = user;
  
    if (!name || !email || !password || !cpassword) {
      // Check if any of the fields are empty
      window.alert("Please fill in all fields.");
    } else if (password !== cpassword) {
      // Check if password and confirm password match
      window.alert("Passwords do not match.");
    } else {
      // All checks passed, send the registration request
      const res = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          cpassword,
        }),
      });
      const data = await res.json();
  
      if (data.status === 422 || !data) {
        window.alert("Invalid Registration");
      } else {
        window.alert("Registration successful");
        navigate("/login");
      }
    }
  };
  

  return (
    <div className="signup-container">
      <h2>Register</h2>
      <form method ="POST">
      <div className="input-container">
        <label>Name</label>
        <input className="input-box" type="text" name="name" placeholder="Enter your name" required value={user.name} onChange={handleInputs} />
      </div>
      <div className="input-container">
        <label>Email</label>
        <input className="input-box" type="email" name="email" placeholder="Enter your email" required value={user.email} onChange={handleInputs} />
      </div>
      
      <div className="input-container">
        <label>Password</label>
        <input className="input-box" type="password" name="password" placeholder="Enter your password" required value={user.password} onChange={handleInputs} />
      </div>
      <div className="input-container">
        <label>Confirm Password</label>
        <input className="input-box" type="password" name="cpassword" placeholder="Confirm your password" required value={user.cpassword} onChange={handleInputs} />
      </div>
      <div className="button-container">
      <button  className="button"type="submit" onClick={PostData}>Register</button>
      </div>
      <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>

      
    </div>
  );
}

export default Signup;
