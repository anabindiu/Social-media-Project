import {Convert_Date_Tasks, Failed_To_Connect} from "../action/helper";

//#region       ######         PROFILE API CALLS         ######
export async function Get_Profile(){
    const ID = await JSON.parse(localStorage.getItem('user')).ID;
    return(fetch(`http://localhost:3001/profile/ID/${ID}`)
        .then(function(response){
            if(!response.ok){
        throw new Error("HTTP error " + response.status);
    }  
            return response.json();
        })
        .then(result => {
            console.log(result[0]);
            return(result[0])
        })
        .catch(e => {
            Failed_To_Connect(e);
            console.log(e);
        })
    );
};

export async function Create_Profile(formData){
    const bcrypt = require("bcryptjs");
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(formData.Password, salt);
    
    return(fetch(`http://localhost:3001/profile`, {
            method: 'POST',
            headers: new Headers({'content-type': 'application/json'}),
            body: JSON.stringify({
                "Email": formData.Email, 
                "Username":formData.Username, 
                "Password": hashedPass, 
                "Name":formData.Name, 
                "B_Date" : formData.B_Date, 
                "Profile_Pic" : 'NULL'}),
            })
        .then(function(response){
            if(!response.ok){
                throw new Error("HTTP error " + response.status);
            } 
            return response.json();
        })
        .catch(e => {
            Failed_To_Connect(e);
            console.log(e);
        })
    );
};

export async function Update_Profile(new_profile, change_password){
    const profile = await JSON.parse(localStorage.getItem('user'));
    const bcrypt = require("bcryptjs");
    const salt = await bcrypt.genSalt(10);
    const hashedPass = (change_password ? await bcrypt.hash(new_profile.Password, salt) : profile.Password);

    const storage_block={
        ID: profile.ID,
        Password: hashedPass
    }
    localStorage.setItem('user', JSON.stringify(storage_block));

    return(fetch(`http://localhost:3001/profile/ID/${profile.ID}`, {
            method: 'PUT',
            headers: new Headers({'content-type': 'application/json'}),
            body: JSON.stringify({
                "Email": new_profile.Email, 
                "Username":new_profile.Username, 
                "Password": hashedPass, 
                "Name":new_profile.Name, 
                "B_Date" : new_profile.B_Date, 
                "Profile_Pic" : 'NULL'
            })
        })
        .then(function(response){
            if(!response.ok){
        throw new Error("HTTP error " + response.status);
    }  
            return response.json();
        })
        .then(result => {
            console.log(result[0]);
            return(result[0])
        })
        .catch(e => {
            Failed_To_Connect(e);
            console.log(e);
        })
    );
};
//#endregion    ###### ###### ###### ##### ###### ###### ######



//#region       ######        HAS_FRIEND API CALLS       ######
export async function Get_Friends(){
    const ID = await JSON.parse(localStorage.getItem('user')).ID;
    return(fetch(`http://localhost:3001/has_friend/ID_1/${ID}`)
        .then(function(response){
            if(!response.ok){
        throw new Error("HTTP error " + response.status);
    }   
            return response.json();
        })
        .then(result => {
            console.log(result);
            return(result)
        })
        .catch(e => {
            Failed_To_Connect(e);
            console.log(e);
        })
    );
};

export async function Create_Friend(friend){
    const ID = await JSON.parse(localStorage.getItem('user')).ID;
    return(fetch(`http://localhost:3001/has_friend`, {
            method: 'POST',
            headers: new Headers({'content-type': 'application/json'}),
            body: JSON.stringify({
                "ID_1":ID, 
                "ID_2":friend.ID,
            }),
        })
        .then(function(response){
            if(!response.ok){
        throw new Error("HTTP error " + response.status);
    }   
            return response.json();
        })
        .catch(e => {
            Failed_To_Connect(e);
            console.log(e);
        })
    );
};

export async function Delete_Friend(friend){
    const ID = await JSON.parse(localStorage.getItem('user')).ID;
    return(fetch(`http://localhost:3001/has_friend/ID_1/${ID}/ID_2/${friend.ID}`, {
            method: 'DELETE',
            headers: new Headers({'content-type': 'application/json'}),
            body: JSON.stringify({}),
        })
        .then(function(response){
            if(!response.ok){
        throw new Error("HTTP error " + response.status);
    }  
            return response.json();
        })
        .catch(e => {
            Failed_To_Connect(e);
            console.log(e);
        })
    );
};

export async function Get_All_Profile_Identifier(){
    return(fetch(`http://localhost:3001/profile`)
        .then(function(response){
            if(!response.ok){
        throw new Error("HTTP error " + response.status);
    }  
            return response.json();
        })
        .then(result => {
            console.log(result);
            return(result)
        })
        .catch(e => {
            Failed_To_Connect(e);
            console.log(e);
        })
    );
};
//#endregion    ###### ###### ###### ##### ###### ###### ######



//#region       ######        SETTINGS API CALLS         ######
export async function Get_Settings(){
    const ID = await JSON.parse(localStorage.getItem('user')).ID;
    return(fetch(`http://localhost:3001/settings/Profile_ID/${ID}`)
        .then(function(response){
            if(!response.ok){
        throw new Error("HTTP error " + response.status);
    }  
            return response.json();
        })
        .then(result => {
            console.log(result[0]);
            return(result[0])
        })
        .catch(e => {
            Failed_To_Connect(e);
            console.log(e);
        })
    );
};

export async function Update_Settings({change, to}){
    const data = await Get_Settings();
    data[change] = to;
    return(fetch(`http://localhost:3001/settings/ID/${data.ID}`, {
            method: 'PUT',
            headers: new Headers({'content-type': 'application/json'}),
            body: JSON.stringify({
                "Profile_ID":data.Profile_ID, 
                "Date_Format":data.Date_Format, 
                "Time_Format":data.Time_Format, 
                "TimeZone":data.TimeZone, 
                "Language":data.Language, 
                "Theme":data.Theme, 
                "Country":data.Country, 
                "Notification":data.Notification
            }),
        })
        .then(function(response){
            if(!response.ok){
        throw new Error("HTTP error " + response.status);
    }   
            return response.json();
        })
        .then(result => {
            console.log(result[0]);
            return(result[0])
        })
        .catch(e => {
            Failed_To_Connect(e);
            console.log(e);
        })
    );
};

export async function Create_Default_Settings(){
    const ID = await JSON.parse(localStorage.getItem('user')).ID;
    return(fetch('http://localhost:3001/settings', {
        method: 'POST',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify({"Profile_ID":ID, "Date_Format":"dd/mm/yyyy", "Time_Format":"12:00", "TimeZone":"MT", "Language":"English", "Theme":"Light", "Country":"NULL", "Notification":"Enabled"}),
        })
        .then(function(response){
            if(!response.ok){
        throw new Error("HTTP error " + response.status);
    }  
            return response.json();
        })
        .catch(e => {
            Failed_To_Connect(e);
            console.log(e);
        })
    );
};
//#endregion    ###### ###### ###### ##### ###### ###### ######



//#region       ######      MONTHLY_STATS API CALLS      ######
export async function Update_Stats(profileID, month, year,  events,tasks, notes, reminders){
    return(fetch(`http://localhost:3001/monthly_stats/Profile_ID/${profileID}/Year/${year}/Month/${month}`, {
        method: 'PUT',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify({
            Profile_ID: profileID,
            Month: month,
            Year: year,
            Total_Events: events,
            Total_Tasks: tasks,
            Total_Notes: notes,
        }),
    })
    .then(function(response){
        if(!response.ok){
    throw new Error("HTTP error " + response.status);
} 
        return response.json();
    })
    .catch(e => {
        Failed_To_Connect(e);
        console.log(e);
    })
);
}

export async function Create_Stats( profileID, month, year, events,tasks, notes){
    return(fetch(`http://localhost:3001/monthly_stats`, {
            method: 'POST',
            headers: new Headers({'content-type': 'application/json'}),
            body: JSON.stringify({
                Profile_ID: profileID,
                Month: month,
                Year: year,
                Total_Events: events,
                Total_Tasks: tasks,
                Total_Notes: notes,
            }),
        })
        .then(function(response){
            if(!response.ok){
        throw new Error("HTTP error " + response.status);
    }  
            return response.json();
        })
        .catch(e => {
            Failed_To_Connect(e);
            console.log(e);
        })
    );
}

export async function Create_Default_Stats(){
    const ID = await JSON.parse(localStorage.getItem('user')).ID;
    return(fetch('http://localhost:3001/monthly_stats', {
        method: 'POST',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify({
            "Profile_ID": ID, 
            "Month": 4, 
            "Year": 2022, 
            "Total_Events": 0, 
            "Total_Tasks": 0, 
            "Total_Notes": 0, 
            "Total_Reminders": 0
        }),
        })
        .then(function(response){
            if(!response.ok){
        throw new Error("HTTP error " + response.status);
    }   
            return response.json();
        })
        .catch(e => {
            Failed_To_Connect(e);
            console.log(e);
        })
    );
}
//#endregion    ###### ###### ###### ##### ###### ###### ######



//#region       ######          NOTES API CALLS          ######
export async function Get_Notes(){
    const ID = await JSON.parse(localStorage.getItem('user')).ID;
    return(fetch(`http://localhost:3001/notes/Profile_ID/${ID}`)
        .then(function(response){
            if(!response.ok){
        throw new Error("HTTP error " + response.status);
    } 
            return response.json();
        })
        .then(result => {
            console.log(result[0]);
            return(result[0])
        })
        .catch(e => {
            Failed_To_Connect(e);
            console.log(e);
        })
    );
};

export async function Create_Default_Notes(){
    const ID = await JSON.parse(localStorage.getItem('user')).ID;
    return(fetch('http://localhost:3001/notes', {
        method: 'POST',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify({"Profile_ID":ID}),
        })
        .then(function(response){
            if(!response.ok){
        throw new Error("HTTP error " + response.status);
    }  
            return response.json();
        })
        .catch(e => {
            Failed_To_Connect(e);
            console.log(e);
        })
    );
};
//#endregion    ###### ###### ###### ##### ###### ###### ######



//#region       ######          NOTE API CALLS           ######
export async function Get_Note(){
    const notes = await Get_Notes();
    return(fetch(`http://localhost:3001/note/Notes_ID/${notes.ID}`)
        .then(function(response){
            if(!response.ok){
        throw new Error("HTTP error " + response.status);
    } 
            return response.json();
        })
        .then(result => {
            console.log(result);
            return(result)
        })
        .catch(e => {
            Failed_To_Connect(e);
            console.log(e);
        })
    );
};

export async function Create_Note(formData){
    return(fetch(`http://localhost:3001/note`, {
            method: 'POST',
            headers: new Headers({'content-type': 'application/json'}),
            body: JSON.stringify({
                "Notes_ID":formData.Notes_ID, 
                "Date_Created":formData.Date_Created, 
                "Last_Modified":formData.Last_Modified, 
                "Title":formData.Title, 
                "Content":formData.Content
            }),
        })
        .then(function(response){
            if(!response.ok){
        throw new Error("HTTP error " + response.status);
    }   
            return response.json();
        })
        .catch(e => {
            Failed_To_Connect(e);
            console.log(e);
        })
    );
};

export async function Update_Note(note, change, to){
    note[change] = to;

    return(fetch(`http://localhost:3001/note/ID/${note.ID}/Notes_ID/${note.Notes_ID}`, {
            method: 'PUT',
            headers: new Headers({'content-type': 'application/json'}),
            body: JSON.stringify({
                "Notes_ID":note.Notes_ID, 
                "Date_Created":note.Date_Created, 
                "Last_Modified":note.Last_Modified, 
                "Title":note.Title, 
                "Content":note.Content
            }),
        })
        .then(function(response){
            if(!response.ok){
        throw new Error("HTTP error " + response.status);
    } 
            return response.json();
        })
        .catch(e => {
            Failed_To_Connect(e);
            console.log(e);
        })
    );
};

export async function Delete_Note(note){
    return(fetch(`http://localhost:3001/note/ID/${note.ID}/Notes_ID/${note.Notes_ID}`, {
            method: 'DELETE',
            headers: new Headers({'content-type': 'application/json'}),
            body: JSON.stringify({}),
        })
        .then(function(response){
            if(!response.ok){
        throw new Error("HTTP error " + response.status);
    }   
            return response.json();
        })
        .catch(e => {
            Failed_To_Connect(e);
            console.log(e);
        })
    );
};

export async function Delete_All_Note(Schedule_ID){
    return(fetch(`http://localhost:3001/event/Schedule_ID/${Schedule_ID}`, {
            method: 'DELETE',
            headers: new Headers({'content-type': 'application/json'}),
            body: JSON.stringify({}),
        })
        .then(function(response){
            if(!response.ok){
        throw new Error("HTTP error " + response.status);
    }  
            return response.json();
        })
        .catch(e => {
            Failed_To_Connect(e);
            console.log(e);
        })
    );
};
//#endregion    ###### ###### ###### ##### ###### ###### ######



//#region       ######          TASKS API CALLS          ######
export async function Get_Tasks(){
    const ID = await JSON.parse(localStorage.getItem('user')).ID;
    return(fetch(`http://localhost:3001/tasks/Profile_ID/${ID}`)
        .then(function(response){
            if(!response.ok){
        throw new Error("HTTP error " + response.status);
    }  
            return response.json();
        })
        .then(result => {
            console.log(result[0]);
            return(result[0])
        })
        .catch(e => {
            Failed_To_Connect(e);
            console.log(e);
        })
    );
};

export async function Create_Default_Tasks(){
    const ID = await JSON.parse(localStorage.getItem('user')).ID;
    return(fetch('http://localhost:3001/tasks', {
        method: 'POST',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify({"Profile_ID":ID, "Header":"Task List"}),
        })
        .then(function(response){
            if(!response.ok){
        throw new Error("HTTP error " + response.status);
    }  
            return response.json();
        })
        .catch(e => {
            Failed_To_Connect(e);
            console.log(e);
        })
    );
};
//#endregion    ###### ###### ###### ##### ###### ###### ######



//#region       ######          TASK API CALLS           ######
export async function Get_Task(){
    const tasks = await Get_Tasks();
    return(fetch(`http://localhost:3001/task/Tasks_ID/${tasks.ID}`)
        .then(function(response){
            if(!response.ok){
        throw new Error("HTTP error " + response.status);
    } 
            return response.json();
        })
        .then(result => {
            console.log(result);
            return(result)
        })
        .catch(e => {
            Failed_To_Connect(e);
            console.log(e);
        })
    );
};

export async function Create_Task(formData){
    return(fetch(`http://localhost:3001/task`, {
            method: 'POST',
            headers: new Headers({'content-type': 'application/json'}),
            body: JSON.stringify({
                "Tasks_ID": formData.Tasks_ID, 
                "Title":formData.Title, 
                "Description":formData.Description, 
                "Location":formData.Location, 
                "Deadline":formData.Deadline,
                "Completion_Status":false
            }),
        })
        .then(function(response){
            if(!response.ok){
        throw new Error("HTTP error " + response.status);
    }  
            return response.json();
        })
        .catch(e => {
            Failed_To_Connect(e);
            console.log(e);
        })
    );
};

export async function Update_Task(new_task){
    const pID = await JSON.parse(localStorage.getItem('user')).ID;
    console.log(new_task.Deadline);
    await fetch(`http://localhost:3001/monthly_stats/Profile_ID/${pID}/Year/2022/Month/4`)
    .then(function(response){
        if(!response.ok){
            throw new Error("HTTP error " + response.status);
        }   
        return response.json();
    })
    .then(result => {
        console.log("RESULT: ", result);
        if (new_task.Completion_Status === 1){
            Update_Stats(pID, 4, 2022, result[0].Total_Events ,result[0].Total_Tasks + 1, result[0].Total_Notes );
        }
        else{
            Update_Stats(pID, 4, 2022, result[0].Total_Events ,result[0].Total_Tasks - 1, result[0].Total_Notes );
        }
        return(result)
    })

    return(fetch(`http://localhost:3001/task/ID/${new_task.ID}/Tasks_ID/${new_task.Tasks_ID}`, {
            method: 'PUT',
            headers: new Headers({'content-type': 'application/json'}),
            body: JSON.stringify({
                "Tasks_ID": new_task.Tasks_ID, 
                "Title":new_task.Title, 
                "Description":new_task.Description, 
                "Location":new_task.Location, 
                "Deadline":new_task.Deadline,
                "Completion_Status":new_task.Completion_Status
            }),
        })
        .then(function(response){
            if(!response.ok){
        throw new Error("HTTP error " + response.status);
    }  
            return response.json();
        })
        .catch(e => {
            Failed_To_Connect(e);
            console.log(e);
        })
    );
};

export async function Delete_Task(task){
    return(fetch(`http://localhost:3001/task/ID/${task.ID}/Tasks_ID/${task.Tasks_ID}`, {
            method: 'DELETE',
            headers: new Headers({'content-type': 'application/json'}),
            body: JSON.stringify({}),
        })
        .then(function(response){
            if(!response.ok){
        throw new Error("HTTP error " + response.status);
    }    
            return response.json();
        })
        .catch(e => {
            Failed_To_Connect(e);
            console.log(e);
        })
    );
};
//#endregion    ###### ###### ###### ##### ###### ###### ######



//#region       ######        SCHEDULE API CALLS         ######
export async function Get_Schedules(){
    const ID = await JSON.parse(localStorage.getItem('user')).ID;
    return(fetch(`http://localhost:3001/schedule/Profile_ID/${ID}`)
        .then(function(response){
            if(!response.ok){
        throw new Error("HTTP error " + response.status);
    } 
            return response.json();
        })
        .then(result => {
            console.log(result);
            return(result)
        })
        .catch(e => {
            Failed_To_Connect(e);
            console.log(e);
        })
    );
};

export async function Create_Schedule(name){
    const ID = await JSON.parse(localStorage.getItem('user')).ID;
    return(fetch('http://localhost:3001/schedule', {
        method: 'POST',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify({"Profile_ID":ID, "Calendar_Name":name}),
        })
        .then(function(response){
            if(!response.ok){
        throw new Error("HTTP error " + response.status);
    }   
            return response.json();
        })
        .catch(e => {
            Failed_To_Connect(e);
            console.log(e);
        })
    );
};

export async function Update_Schedule(schedule){
    return(fetch(`http://localhost:3001/schedule/ID/${schedule.ID}`, {
            method: 'PUT',
            headers: new Headers({'content-type': 'application/json'}),
            body: JSON.stringify({
                "ID":schedule.ID, 
                "Profile_ID":schedule.Profile_ID, 
                "Calendar_Name":schedule.Calendar_Name, 
            }),
        })
        .then(function(response){
            if(!response.ok){
        throw new Error("HTTP error " + response.status);
    }   
            return response.json();
        })
        .catch(e => {
            Failed_To_Connect(e);
            console.log(e);
        })
    );
};

export async function Delete_Schedule(schedule){
    return(fetch(`http://localhost:3001/schedule/ID/${schedule.ID}`, {
        method: 'DELETE',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify({}),
        })
        .then(function(response){
            if(!response.ok){
        throw new Error("HTTP error " + response.status);
    }   
            return response.json();
        })
        .catch(e => {
            Failed_To_Connect(e);
            console.log(e);
        })
    );
};

export async function Create_Default_Schedule(){
    const ID = await JSON.parse(localStorage.getItem('user')).ID;
    return(fetch('http://localhost:3001/schedule', {
        method: 'POST',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify({"Profile_ID":ID, "Calendar_Name":"Calendar"}),
        })
        .then(function(response){
            if(!response.ok){
        throw new Error("HTTP error " + response.status);
    }  
            return response.json();
        })
        .catch(e => {
            Failed_To_Connect(e);
            console.log(e);
        })
    );
};
//#endregion    ###### ###### ###### ##### ###### ###### ######



//#region       ######          EVENT API CALLS          ######
export async function Get_Events(){
    const features = await Get_Features();
    return(fetch(`http://localhost:3001/event/Schedule_ID/${features.Schedule_ID}`)
        .then(function(response){
            if(!response.ok){
        throw new Error("HTTP error " + response.status);
    }  
            return response.json();
        })
        .then(result => {
            console.log(result);
            return(result)
        })
        .catch(e => {
            Failed_To_Connect(e);
            console.log(e);
        })
    );
};

export async function Create_Event(event){

    const features = await Get_Features();
    const eventDate= Convert_Date_Tasks(event.Day);

    const year = eventDate.split("-")[0].replaceAll('"', '');
    const month = eventDate.split("-")[2].split("T")[0];
    const pID = await JSON.parse(localStorage.getItem('user')).ID;

    await fetch(`http://localhost:3001/monthly_stats/Profile_ID/${pID}/Year/${year}/Month/${month}`)
    .then(function(response){
        if(!response.ok){
            throw new Error("HTTP error " + response.status);
        }   
        return response.json();
    })
    .then(result => {
        console.log("RESULT: ", result);
        if(result.length === 0){
            console.log("update ", result);
            Create_Stats(pID, month, year, 1,0,0);
        }
        else{

            Update_Stats(pID, month, year, result[0].Total_Events + 1,result[0].Total_Tasks, result[0].Total_Notes);
        }
        return(result)
    })

    return(fetch(`http://localhost:3001/event`, {
            method: 'POST',
            headers: new Headers({'content-type': 'application/json'}),
            body: JSON.stringify({
                "Schedule_ID":features.Schedule_ID, 
                "Location":event.Location, 
                "Description":event.Description, 
                "Title":event.Title, 
                "Day":event.Day, 
                "Start_Time":event.Start_Time, 
                "End_Time":event.End_Time,
                "Label":event.Label
            }),
        })
        .then(function(response){
            if(!response.ok){
        throw new Error("HTTP error " + response.status);
    }  
            return response.json();
        })
        .catch(e => {
            Failed_To_Connect(e);
            console.log(e);
        })
    );
};

export async function Update_Event(ID, new_event){
    const features = await Get_Features();
    return(fetch(`http://localhost:3001/event/ID/${ID}`, {
            method: 'PUT',
            headers: new Headers({'content-type': 'application/json'}),
            body: JSON.stringify({
                "Schedule_ID":features.Schedule_ID, 
                "Location":new_event.Location, 
                "Description":new_event.Description, 
                "Title":new_event.Title, 
                "Day":new_event.Day, 
                "Start_Time":new_event.Start_Time, 
                "End_Time":new_event.End_Time,
                "Label":new_event.Label
            }),
        })
        .then(function(response){
            if(!response.ok){
        throw new Error("HTTP error " + response.status);
    } 
            return response.json();
        })
        .catch(e => {
            Failed_To_Connect(e);
            console.log(e);
        })
    );
};

export async function Delete_Event(event){
    const eventDate= Convert_Date_Tasks(event.Day);

    const year = eventDate.split("-")[0].replaceAll('"', '');
    const month = eventDate.split("-")[2].split("T")[0];
    const pID = await JSON.parse(localStorage.getItem('user')).ID;

    await fetch(`http://localhost:3001/monthly_stats/Profile_ID/${pID}/Year/${year}/Month/${month}`)
    .then(function(response){
        if(!response.ok){
            throw new Error("HTTP error " + response.status);
        }   
        return response.json();
    })
    .then(result => {
        console.log("RESULT: ", result);

        Update_Stats(pID, month, year, result[0].Total_Events - 1,result[0].Total_Tasks, result[0].Total_Notes);
        return(result)
    })

    return(fetch(`http://localhost:3001/event/ID/${event.ID}`, {
            method: 'DELETE',
            headers: new Headers({'content-type': 'application/json'}),
            body: JSON.stringify({}),
        })
        .then(function(response){
            if(!response.ok){
        throw new Error("HTTP error " + response.status);
    }  
            return response.json();
        })
        .catch(e => {
            console.log(e);
        })
    );
};
//#endregion    ###### ###### ###### ##### ###### ###### ######



//#region       ######        FEATURES API CALLS         ######
export async function Get_Features(){
    const ID = await JSON.parse(localStorage.getItem('user')).ID;
    return(fetch(`http://localhost:3001/features/Profile_ID/${ID}`)
        .then(function(response){
            if(!response.ok){
        throw new Error("HTTP error " + response.status);
    }   
            return response.json();
        })
        .then(result => {
            console.log(result);
            return(result[0])
        })
        .catch(e => {
            Failed_To_Connect(e);
            console.log(e);
        })
    );
};

export async function Update_Features(change, to){
    const ID = await JSON.parse(localStorage.getItem('user')).ID;
    const features = await Get_Features();
    features[change] = to;
    return(fetch(`http://localhost:3001/features/Profile_ID/${ID}`, {
            method: 'PUT',
            headers: new Headers({'content-type': 'application/json'}),
            body: JSON.stringify({
                "Profile_ID":ID, 
                "Schedule_ID":features.Schedule_ID, 
                "Notes_ID":features.Notes_ID, 
                "Tasks_ID":features.Tasks_ID, 
                "Setting_ID":features.Setting_ID
            }),
        })
        .then(function(response){
            if(!response.ok){
        throw new Error("HTTP error " + response.status);
    }  
            return response.json();
        })
        .catch(e => {
            Failed_To_Connect(e);
            console.log(e);
        })
    );
};

export async function Create_Default_Features(profile){
    console.log(profile.ID);
    const data_notes = await Get_Notes();
    const data_tasks = await Get_Tasks();
    const data_schedule = await Get_Schedules();
    const data_settings = await Get_Settings();
    return(fetch('http://localhost:3001/features', {
        method: 'POST',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify({
            "Profile_ID":profile.ID, 
            "Schedule_ID":data_schedule[0].ID, 
            "Notes_ID":data_notes.ID, 
            "Tasks_ID":data_tasks.ID, 
            "Setting_ID":data_settings.ID
        }),
        })
        .then(function(response){
            if(!response.ok){
        throw new Error("HTTP error " + response.status);
    }   
            return response.json();
        })
        .catch(e => {
            Failed_To_Connect(e);
            console.log(e);
        })
    );
};
//#endregion    ###### ###### ###### ##### ###### ###### ######