import React, { useState,useRef } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import axios from 'axios';


export default function Signup() {
  
   let resref = useRef(); 
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
      const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length === 0) {
          // Form submission logic
          console.log('Form submitted successfully ' + JSON.stringify(formData));
          axios.post('http://localhost:3001/appapi', formData)
            .then((res) => {
              console.log("Form data sent successfully");
    
                resref.current.innerHTML = res.data.ok;
                // assuming the response data has an 'ok' property
            })
            .catch((err) => {
              console.error("Error sending form data: ", err);
            });
        } else {
          setErrors(validationErrors);
        }
      };

  const validateForm = (formData) => {
    let errors = {};

    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
      
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
  };

  return (
    <div className='body1'>

     
        <form onSubmit={handleSubmit} method='post'>
        <h1>Gurukul</h1>
        <h2 className='hed'>Welcome, Sign up!</h2>
          <div>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <br /> {errors.username && <span className='error'>{errors.username}</span>}
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <br /> {errors.email && <span className='error'>{errors.email}</span>}
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <br /> {errors.password && <span className='error'>{errors.password}</span>}
          </div>
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <br /> {errors.confirmPassword && <span className='error'>{errors.confirmPassword}</span>}
          </div>
          <button type="submit">Submit</button><br />
          <br />
         <span> if you already have an account, </span>< Link to="/signin"  style={{color:'white'}}> click here  </Link>
         <br /> 
         <br />
          <span ref={resref} style={{fontSize :"2rem"}}></span>
        </form>

        
    </div>
    
  );
}
