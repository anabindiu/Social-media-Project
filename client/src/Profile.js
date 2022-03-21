import { useState } from 'react';
import './Profile.css';

//API which will be replaced with our own
import Axios from 'axios';


/*
Email varchar(255) UNIQUE NOT NULL,
    Username varchar(255) UNIQUE NOT NULL,
    `Password` varchar(255) NOT NULL,
    B_Date DATETIME, 
    `Name` varchar(255),
    Profile_Pic nvarchar(255),
    User_Email varchar(255),
*/


function App() {

  const addProfile = () => {
    console.log(Name);
    Axios.post('http://localhost:3001/create', {
      Name: Name, 
      Email: Email, 
      Username: Username, 
      Password: Password, 
      Birth_Date: Birth_Date, 
      Profile_Pic: Profile_Pic, 
      UserEmail: UserEmail
    }).then(() => {
      console.log("Success");
    });
  };

  const[Name, setName] = useState("");
  const[Email, setEmail] = useState("");
  const[Username, setUsername] = useState("");
  const[Password, setPwd] = useState("");
  const[Birth_Date, setBDAte] = useState(Date);
  const[Profile_Pic, setPic] = useState("");
  const[UserEmail, setUserEmail] = useState("");


  return (
    <div className="Profile">
      <div className= "Information">
        <label>Name:</label>
        <input type = "text" onChange={(event) => {
          setName(event.target.value)
        }}/>
        <label>Email:</label>
        <input type = "text" onChange={(event) => {
          setEmail(event.target.value)
        }}/>
        <label>Username:</label>
        <input type = "text" onChange={(event) => {
          setUsername(event.target.value)
        }}/>
        <label>Password:</label>
        <input type = "text" onChange={(event) => {
          setPwd(event.target.value)
        }}/>
        <label>Birth Date: </label>
        <input type = "date" onChange={(event) => {
          setBDAte(event.target.value)
        }}/>
        <label>Profile_Pic(Ignore) :</label>
        <input type = "text" onChange={(event) => {
          setPic(event.target.value)
        }}/>
        <label> User_Email: </label>
        <input tpye = "text" onChange={(event) => {
          setUserEmail(event.target.value)
        }}/>
        <button onClick={addProfile}> Add Profile</button>
      </div>

            
    </div>
  );
}

export default App;
