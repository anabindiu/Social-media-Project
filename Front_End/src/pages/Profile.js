import React, { useState, useEffect } from 'react'
import "../App.css";
import UploadImages from '../components/UploadImages';
import { Button } from "../components/Buttons";
import {trackPromise, usePromiseTracker} from "react-promise-tracker";
import { Update_Profile, Get_Profile } from '../auth/action/API_requests';

export default function Profile() {
  const [profile_info, setProfileInfo] = useState({});
  const [is_editing, setEditing] = useState(false);
  const [Name, setName] = useState("");
  const [Birthday, setBirthday] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");


  useEffect(async () => {
    await Get_Profile().then((profile) => {
      setProfileInfo(profile);
      console.log(profile);
      setName(profile.Name);
      setBirthday(profile.B_Date);
      setEmail(profile.Email);
      setPassword("");
    })
  }, []);

  const update_profile = async () => {
    const new_profile = {
      "Email": Email, 
      "Username":profile_info.Username, 
      "Password": Password, 
      "Name":Name, 
      "B_Date":Birthday, 
    }
    await Update_Profile(new_profile);
    await Get_Profile().then((profile) => {
      setProfileInfo(profile);
      console.log(profile);
      setName(profile.Name);
      setBirthday(profile.B_Date);
      setEmail(profile.Email);
      setPassword("");
    })
    setEditing(false);
  }


 return (
    <div className='App'>
      <div className='containter mt-5'>
        <h1>
          <span>
            <h1 className='form-control mt-2 ml-20'>Profile</h1> 
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
            {is_editing ? 
            <input className='input_detail' placeholder="Enter your name" value={Name} onChange={(e)=>(setName(e.target.value))}></input>
            :
            <h1>{profile_info.Name}</h1>
            }
          </div>
        </div>

        <h3 className='title_border'>Birthday</h3>
        <div className='border_list'>
          <div className='font-weight-bold'>
            {is_editing ? 
            <input type="date" className='input_detail' value={Birthday} onChange={(e)=>(setBirthday(e.target.value))}></input>
            :
            <h1>{profile_info.B_Date}</h1>
            }
          </div>
        </div>

        <h3 className='title_border'>Username</h3>
        <div className='border_list'>
          <div className='font-weight-bold'>
            <h1>{profile_info.Username}</h1>
          </div>
        </div>

        <h3 className='title_border'>Email</h3>
        <div className='border_list'>
          <div className='font-weight-bold'>
            {is_editing ? 
            <input className='input_detail' placeholder='Enter your email' value={Email} onChange={(e)=>(setEmail(e.target.value))}></input>
            :
            <h1>{profile_info.Email}</h1>
            }
          </div>
        </div>

        <h3 className='title_border'>Password</h3>
        <div className='border_list'>
          <div className='font-weight-bold'>
            {is_editing ? 
            <input className='input_detail' placeholder='Enter your password' value={Password} onChange={(e)=>(setPassword(e.target.value))}></input>
            :
            <></>}
          </div>
        </div>
        <Button onClick={setEditing.bind(this, !is_editing)}>{is_editing ? "Cancel" : "Edit Profile"}</Button>
        {is_editing ? <Button onClick={update_profile.bind(this)}>Save Changes</Button> : <></>}
      </div>
    </div>
  );
}
