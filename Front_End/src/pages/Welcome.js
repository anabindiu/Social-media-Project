import React from 'react'
import "../App.css";
import { useNavigate } from 'react-router-dom';


export default function Welcome() {
    const navigate = useNavigate();

   const routeToLogin = () => {
       navigate('/login');
   } 
   const routeToSignup = () => {
    navigate('/signup');
    } 
  return (
    <div className="text-center m-4-auto">
        <h1>Welcome!</h1>
    
        <button onClick={routeToLogin} className='btn'>
            Login 
        </button>
        {'\t'}
        <button onClick={routeToSignup} className='btn'>
            Signup
        </button>

    
    </div>
  )
}
