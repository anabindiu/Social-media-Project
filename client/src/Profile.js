import { useState } from 'react';
import './Profile.css';

function App() {
  return(
    <div className = "Profile">
       <CreateProfileForm/>
    </div>
  )
}

export default App;

function CreateProfileForm(){
    
  const[Name, setName] = useState("");
  const[Email, setEmail] = useState("");
  const[Username, setUsername] = useState("");
  const[Password, setPwd] = useState("");
  const[Birth_Date, setBDAte] = useState("");
  const[Profile_Pic, setPic] = useState("");
  const[UserEmail, setUserEmail] = useState(""); 

  const addProfile = () => {
    try{
      console.log(Birth_Date);
      console.log(JSON.stringify({"Email": Email, "Username":Username, "Password":Password, "B_Date": Birth_Date , "Name":Name, "Profile_Pic":Profile_Pic, "User_Email": "NULL"}));
      fetch('http://localhost:3001/profile', {
        method: 'POST',
        headers: new Headers({'content-type': 'application/json'}),
        // Need to make sure Useremail is not null.
        body: JSON.stringify({"Email": Email, "Username":Username, "Password":Password, "B_Date": Birth_Date , "Name":Name, "Profile_Pic":Profile_Pic, "User_Email": "NULL"}),
      })
      console.log(Email);
    }
    catch(error){
      console.log(error);
    }
  
  };

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
        <input type = "password" onChange={(event) => {
          setPwd(event.target.value)
        }}/>
        <label>Birth Date: </label>
        <input type = "Date" onChange={(event) => {
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
