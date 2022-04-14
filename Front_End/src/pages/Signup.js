import React from 'react'
import "../App.css";
// https://github.com/ilyaszm/react-login-register-page
import { connect } from 'react-redux';
import {signUpUser} from  '../auth/action/userAction';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {LinkButton} from '../components/Buttons';


const Signup = (signupUser)  => {

    const navigate = useNavigate();

    const initFormData = Object.freeze({
        Name : "",
        Username: "",
        Email : "",
        Password : "",
        B_Date: null
    });

    const [formData, updateFormData] = React.useState(initFormData);


    const handleChange = (e) => {
        updateFormData({
            ...formData,

            [e.target.name]: e.target.value.trim()
        });
        };
    
        const handleSubmit = (e) =>{
            e.preventDefault();
            signUpUser(formData, navigate);
            // console.log(formData);
        };
    
    return (
    <div className="text-center m-5-auto">
    <h1>Sign Up</h1>
    <form action = "/profile" className='display: inline-block' onSubmit = {handleSubmit}>
        <p>
            <label>Name</label><br/>
            <input type="text" name="Name" required onChange={handleChange}/>
        </p>
        
        <p>
            <label>Username</label><br/>
            <input type="text" name="Username" required onChange={handleChange}/>
        </p>
        <p>
            <label>Email Address</label><br/>
            <input type="text" name="Email" required onChange={handleChange}/>
        </p>
        <p>
          <label>Password</label>
          <br/>
          <input type="password" name="Password" required onChange={handleChange}/>
        </p>

        <p>
          <label>Birth Date</label>
          <br/>
          <input type="date" name="B_Date" required onChange={handleChange}/>
        </p>

        {/* <p>
          <label>Confirm Password</label>
          <br/>
          <input type="password" name="password" required />
        </p> */}

        <p>
          <button id="sub_btn" type="submit">Create Account</button>
        </p>
        <LinkButton title={"or Log in"} page={"/login"}/>
  </form>
  </div>
  )
}

export default connect(null, {signUpUser})(Signup);
