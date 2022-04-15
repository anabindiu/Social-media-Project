import React from 'react'
import "../App.css";
// https://github.com/ilyaszm/react-login-register-page
import { connect } from 'react-redux';
import { loginUser } from  '../auth/action/userAction';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


const Login = (signupUser)  => {

    const [error, setError] = useState("");

    const navigate = useNavigate();

    const initFormData = Object.freeze({
        Email : "",
        Password : "",
    });

    const [formData, updateFormData] = React.useState(initFormData);


    const handleChange = (e) => {
        updateFormData({
            ...formData,

            [e.target.name]: e.target.value.trim()
        });
        };
    
        const handleSubmit = (e) =>{
            setError("");
            e.preventDefault();
            const response = loginUser(formData, navigate).then(response => {
              if(response.length>0){
                setError(response);
              };
            });

        };
    
        return (
      
          <div className="text-center m-5-auto">
          <h1>Login</h1>

          <form action="/profile" className='display: inline-block' onSubmit={handleSubmit}>
              <p>
                <label>Email address</label><br/>
                <input type="text" name="Email" required onChange={handleChange} />
              </p>
              <p>
                <label>Password</label>
                <br/>
                <input type="password" name="Password" required onChange={handleChange}/>
              </p>

              <p>
                <button id="sub_btn" type="submit" >Login</button>
              </p>
        </form>
        <p>
          {error}
        </p>
        </div>
        )
}

export default connect(null, {loginUser})(Login);
