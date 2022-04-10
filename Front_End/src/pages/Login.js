import React from 'react'
import "../App.css";
// https://github.com/ilyaszm/react-login-register-page

export default function Login() {
  return (
    <div className="text-center m-5-auto">
    <h2>Sign in to us</h2>
    <form action="/profile" className='display: inline-block'>
        <p>
            <label>Username or email address</label><br/>
            <input type="text" name="first_name" required />
        </p>
        <p>
          <label>Password</label>
          <br/>
          <input type="password" name="password" required />
        </p>
        <p>
          <button id="sub_btn" type="submit">Login</button>
        </p>
  </form>
  </div>
  )
}
