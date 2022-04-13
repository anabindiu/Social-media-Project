import auth from "../auth";
import { Create_Default_Features, Create_Default_Notes, Create_Default_Settings, Create_Default_Tasks, Create_Default_Schedule, Create_Profile} from "./API_requests";

export const loginUser = async(credentials, navigate) => {
    //make checks
    try{
        const response = await fetch(`http://localhost:3001/profile/Email/${credentials.Email}`);
        const data = await response.json();

        const storage_block={
            ID: data[0].ID,
            Password: data[0].Password
        }

        if(data.length >= 1){
           if(data[0].Password == credentials.Password){
               auth.login(() => {
                   localStorage.setItem('user', JSON.stringify(storage_block));
                   console.log("Logged in");
                   navigate("/profile");
               })
           }
        }
        else{
            // auth.logout(() => {
            //     localStorage.clear();
            //     console.log("Logged out");
            //     navigate("/welcome");
            // })
            console.log("Credentials not found\n");
        }
    }
    catch(error){
    console.log(error);
    }
}

export const signUpUser = async(formData, navigate) => {
    try{
        Create_Profile(formData);
        
        while(fetch(`http://localhost:3001/profile/Email/${formData.Email}`) <= 0);

        const response = await fetch(`http://localhost:3001/profile/Email/${formData.Email}`);
        const data = await response.json();
        console.log(data);
        const profile = data[0];

        const storage_block={
            ID: profile.ID,
            Password: profile.Password
        }
        
        auth.login(async () => {
            localStorage.setItem('user', JSON.stringify(storage_block));
            console.log(`LOOK HERE ${localStorage.getItem('user')}`);
            await Create_Default_Settings();
            await Create_Default_Notes();
            await Create_Default_Tasks();
            await Create_Default_Schedule();
            await Create_Default_Features({ID: profile.ID, Email:profile.Email, Username:profile.Username});
            console.log("Logged in");
            navigate("/profile");
        })
    }
    catch(error){
    console.log(error);
    }
}

export const logoutUser = () =>{

}
