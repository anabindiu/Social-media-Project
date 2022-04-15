import React, { useState, useEffect } from 'react'
import "../App.css";
import UploadImages from '../components/UploadImages';
import { Button } from "../components/Buttons";
import {trackPromise, usePromiseTracker} from "react-promise-tracker";
import { Get_Profile } from '../auth/action/API_requests';
import {Create_Profile, Get_Task, Get_Tasks, Create_Task, Delete_Task, Update_Task} from "../auth/action/API_requests";
import ProfileForm from '../components/ProfileForm';
import Profile_edits from '../components/Profile_edits';
import * as comp from "../components/Tasks_Components";

export default function Profile() {
  const [profile_info, setProfileInfo] = useState({});
  //const [isDisabled, setDisabled] = useState(false);
  useEffect(async () => {
    trackPromise(
      Get_Profile().then((profile) => {
        setProfileInfo(profile);
      })
    );
  }, []);

  console.log(profile_info);
  // console.log(profile_info.Name, profile_info.Username);

  /*
  const onAddTask = async (profile) => {
    const profiles = await Get_Tasks();
    const profile_data = {
      "ID": profiles.ID,
      "Name": profile.Name, 
      "Birthday":profile.Birthday, 
      "Username":profile.Username, 
      "Email":profile.Email, 
      "Password":profile.password,
      "Completion_Status":false
    };
    console.log(profile_data);
    await Create_Profile(profile_data);
      
    await Get_Task().then((profile_info) => {
      setProfileInfo([...profile_info]);
    })
  };
  */


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
            <h1>{profile_info.Name}</h1>
          <input className='input_detail' placeholder="Enter your name"></input>
          </div>
        </div>

        <h3 className='title_border'>Birthday</h3>
        <div className='border_list'>
          <div className='font-weight-bold'>
            <h1>{profile_info.B_Date}</h1>
            <input type="date" className='input_detail'></input>
          </div>
        </div>

        <h3 className='title_border'>Username</h3>
        <div className='border_list'>
          <div className='font-weight-bold'>
            <h1>{profile_info.Username}</h1>
            <input className='input_detail' placeholder='Enter your username'></input>
          </div>
        </div>

        <h3 className='title_border'>Email</h3>
        <div className='border_list'>
          <div className='font-weight-bold'>
            <h1>{profile_info.Email}</h1>
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
