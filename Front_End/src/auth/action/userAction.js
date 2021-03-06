import auth from "../auth";
import { Create_Default_Features, Create_Default_Notes, Create_Default_Settings, Create_Default_Tasks, Create_Default_Schedule, Create_Profile, Create_Default_Stats} from "./API_requests";
import {Failed_To_Connect} from "./helper";


export const loginUser = async(credentials, navigate) => {
    //make checks
    try{
        const response = await fetch(`http://localhost:3001/profile/Email/${credentials.Email}`);
        if(!response.ok){
            throw new Error("HTTP error " + response.status);
        } 
        const data = await response.json();
        const bcrypt = require("bcryptjs");

        if(data.length >= 1){
            const response = "Incorrect Password! Please try again\n";
           if(await bcrypt.compare(credentials.Password, data[0].Password)){
                const storage_block={
                    ID: data[0].ID,
                    Password: data[0].Password
                }
               auth.login(() => {
                   localStorage.setItem('user', JSON.stringify(storage_block));
                   console.log("Logged in");
                   navigate("/profile");

               })
           }
           return response;
        }
        else{
            const response = "Email does not exist! Please try again";
            
            console.log("Credentials not found\n");
            return response;
        }
    }
    catch(error){
        Failed_To_Connect(error);
        console.log(error);
    }
}

export const signUpUser = async(formData, navigate) => {
    try{
        try{
            const response = await fetch(`http://localhost:3001/profile/Email/${formData.Email}`);
            if(!response.ok){
                throw new Error("HTTP error " + response.status);
            } 
            const data = await response.json();
            if(data.length >= 1){
                return "Email already exists!";
            }

            const response2 = await fetch(`http://localhost:3001/profile/Username/${formData.Username}`);
            if(!response2.ok){
                throw new Error("HTTP error " + response.status);
            } 
            const data2 = await response2.json();
            if(data2.length >= 1){
                return "Username already exists!";
            }

        }catch(error){
            console.log(error);
        }

        
        await Create_Profile(formData);
        console.log(formData.Username);
        const response = await fetch(`http://localhost:3001/profile/Username/${formData.Username}`);
        const data = await response.json();
        const profile=data[0];

        const bcrypt = require("bcryptjs");
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(profile.Password, salt);

        const storage_block={
            ID: profile.ID,
            Password: hashedPass
        }

        console.log("PROFILE", storage_block);
        
        auth.login(async () => {
            localStorage.setItem('user', JSON.stringify(storage_block));
            console.log(`LOOK HERE ${localStorage.getItem('user')}`);
            await Create_Default_Settings();
            await Create_Default_Notes();
            await Create_Default_Tasks();
            await Create_Default_Schedule();
            await Create_Default_Features(profile);
            await Create_Default_Stats();
            console.log("Logged in");
            navigate("/profile");
        })
    }
    catch(error){
        Failed_To_Connect(error);
        console.log(error);
    }
}

export const logoutUser = () =>{
    auth.logout(() => {
        localStorage.clear();
    });

    auth.logout(() =>{
        localStorage.clear();
    })

}
