import auth from "../auth";

export const loginUser = async(credentials, navigate) => {
    //make checks
    try{
        const response = await fetch(`http://localhost:3001/profile/Email/${credentials.Email}`);
        const data = await response.json();

        console.log(data);

        if(data.data.length >= 1){
           if(data.data[0].Password == credentials.Password){
               auth.login(() => {
                   localStorage.setItem('user', data.data);
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

export const signUpUser = (formData, navigate) => {
    try{
        console.log(JSON.stringify({"Email": formData.Email, "Username": formData.Username, "Password": formData.Password, "B_Date" : formData.B_Date, "Profile_Pic" : "NULL"}));
        fetch('http://localhost:3001/profile', {
          method: 'POST',
          headers: new Headers({'content-type': 'application/json'}),
          // Need to make sure Useremail is not null.
          body: JSON.stringify({"Email": formData.Email, "Username":formData.Username, "Password":formData.Password, "B_Date" : formData.B_Date, "Profile_Pic" : 'NULL'}),
        })
    }
    catch(error){
    console.log(error);
    }
}

export const logoutUser = () =>{

}
