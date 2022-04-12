import auth from "../auth";

export const loginUser = async(credentials, navigate) => {
    //make checks
    try{
        const response = await fetch(`http://localhost:3001/profile/Email/${credentials.Email}`);
        const data = await response.json();

        const storage_block={
            ID: data.data[0].ID,
            Password: data.data[0].Password
        }

        if(data.data.length >= 1){
           if(data.data[0].Password == credentials.Password){
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
        console.log(JSON.stringify({"Email": formData.Email, "Username": formData.Username, "Password": formData.Password, "B_Date" : formData.B_Date, "Profile_Pic" : "NULL"}));
        fetch('http://localhost:3001/profile', {
          method: 'POST',
          headers: new Headers({'content-type': 'application/json'}),
          // Need to make sure User email is not null.
          body: JSON.stringify({"Email": formData.Email, "Username":formData.Username, "Password":formData.Password, "B_Date" : formData.B_Date, "Profile_Pic" : 'NULL'}),
        })

        while(fetch(`http://localhost:3001/profile/Email/${formData.Email}`) <= 0);

        const response = await fetch(`http://localhost:3001/profile/Email/${formData.Email}`);
        const data = await response.json();
        console.log(data);
        const ID = data.data[0].ID;
        console.log(ID);
        console.log(JSON.stringify({"Profile_ID":ID, "Date_Format":"dd/mm/yyyy", "Time_Format":"12:00", "TimeZone":"MDT", "Language":"English", "Country":"NULL", "Notification":"Enabled"}),);
        fetch('http://localhost:3001/settings', {
          method: 'POST',
          headers: new Headers({'content-type': 'application/json'}),
          // Need to make sure Useremail is not null.
          body: JSON.stringify({"Profile_ID":ID, "Date_Format":"dd/mm/yyyy", "Time_Format":"12:00", "TimeZone":"MDT", "Language":"English", "Theme":"Light", "Country":"NULL", "Notification":"Enabled"}),
        });

        const storage_block={
            ID: data.data[0].ID,
            Password: data.data[0].Password
        }
        auth.login(() => {
            localStorage.setItem('user', JSON.stringify(storage_block));
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
