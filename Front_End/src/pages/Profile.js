import React, { useState } from 'react'
import "../App.css";
import UploadImages from '../components/UploadImages';
import { Button } from "../components/Buttons";

export default function Profile() {

 return (
    <div className='App'>
      <div className='containter mt-5'>
        <h1>
          <span>
            <h1 className='form-control mt-2 ml-20'>  Profile</h1> 
          </span>
        </h1>
        
        <div>
        <h3 className='title_border'>Profile pic upload </h3>
          <div className='border_list'>
            <div className="font-weight-bold">
              <UploadImages/>
            </div>  
          </div>
        </div>
        
        <h3 className='title_border'>Name </h3>
        <div className='border_list'>
          <div className='font-weight-bold'>
          <input className='input_detail' placeholder="Enter your name"></input>
          </div>
        </div>

        <h3 className='title_border'>Birthday</h3>
        <div className='border_list'>
          <div className='font-weight-bold'>
            <input type="date" className='input_detail'></input>
          </div>
        </div>

        <h3 className='title_border'>Username</h3>
        <div className='border_list'>
          <div className='font-weight-bold'>
            <input className='input_detail' placeholder='Enter your username'></input>
          </div>
        </div>

        <h3 className='title_border'>Email</h3>
        <div className='border_list'>
          <div className='font-weight-bold'>
            <input className='input_detail' placeholder='Enter your email'></input>
          </div>
        </div>

        <h3 className='title_border'>Password</h3>
        <div className='border_list'>
          <div className='font-weight-bold'>
            <input className='input_detail' placeholder='Enter your password'></input>
          </div>
        </div>
        <Button>Edit profile</Button>
      </div>
    </div>
  );

}
