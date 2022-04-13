import React, { useState, useEffect } from "react";
import { FaTemperatureHigh } from "react-icons/fa";

export async function Update_Settings({change, to}){
    const data = await Get_Settings();
    console.log(change, to);
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
            console.log(e);
        })
    );
};

export async function Get_Profile(){
    const ID = await JSON.parse(localStorage.getItem('user')).ID;
    console.log(ID);
    return(fetch(`http://localhost:3001/profile/Profile_ID/${ID}`)
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
            console.log(e);
        })
    );
};

export async function Get_Settings(){
    const ID = await JSON.parse(localStorage.getItem('user')).ID;
    console.log(ID);
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
            console.log(e);
        })
    );
};

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
            console.log(e);
        })
    );
};

export async function Create_Note(formData){
    const convert_date = (date) =>{
        const pad = function(num){return ('00'+num).slice(-2) };
        date = date.getUTCFullYear()        + '-' +
                pad(date.getMonth() + 1) + '-' +
                pad(date.getDate())      + ' ' +
                pad(date.getHours())     + ':' +
                pad(date.getMinutes())   + ':' +
                pad(date.getSeconds());
        return date;
    }
    formData.Date_Created = convert_date(new Date(formData.Date_Created));
    formData.Last_Modified = convert_date(new Date(formData.Last_Modified));
    console.log("CREATE", formData);
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
            console.log(e);
        })
    );
};

export async function Update_Note(note, change, to){
    const convert_date = (date) =>{
        const pad = function(num){return ('00'+num).slice(-2) };
        date = date.getUTCFullYear()        + '-' +
                pad(date.getMonth() + 1) + '-' +
                pad(date.getDate())      + ' ' +
                pad(date.getHours())     + ':' +
                pad(date.getMinutes())   + ':' +
                pad(date.getSeconds());
        return date;
    }
    console.log("CHANGE", note, change, to);
    note[change] = to;
    note.Date_Created = convert_date(new Date(note.Date_Created));
    note.Last_Modified = convert_date(new Date(note.Last_Modified));
    console.log("TO", note);
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
            console.log(e);
        })
    );
};

export async function Get_Notes(){
    const ID = await JSON.parse(localStorage.getItem('user')).ID;
    console.log(ID);
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
            console.log(e);
        })
    );
};

export async function Get_Tasks(){
    const ID = await JSON.parse(localStorage.getItem('user')).ID;
    console.log(ID);
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
            console.log(e);
        })
    );
};

export async function Get_Schedule(){
    const ID = await JSON.parse(localStorage.getItem('user')).ID;
    console.log(ID);
    return(fetch(`http://localhost:3001/schedule/Profile_ID/${ID}`)
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
            body: JSON.stringify({"Email": formData.Email, "Username":formData.Username, "Password": hashedPass, "Name":formData.Name, "B_Date" : formData.B_Date, "Profile_Pic" : 'NULL'}),
        })
        .then(function(response){
            if(!response.ok){
                throw new Error("HTTP error " + response.status);
            }   
            return response.json();
        })
        .catch(e => {
            console.log("This error: ", e);
        })
    );
};

export async function Create_Default_Settings(){
    const ID = await JSON.parse(localStorage.getItem('user')).ID;
    console.log(ID);
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
            console.log(e);
        })
    );
};

export async function Create_Default_Notes(){
    const ID = await JSON.parse(localStorage.getItem('user')).ID;
    console.log(ID);
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
            console.log(e);
        })
    );
};

export async function Create_Default_Tasks(){
    const ID = await JSON.parse(localStorage.getItem('user')).ID;
    console.log(ID);
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
            console.log(e);
        })
    );
};

export async function Create_Default_Schedule(){
    const ID = await JSON.parse(localStorage.getItem('user')).ID;
    console.log(ID);
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
            console.log(e);
        })
    );
};

export async function Create_Default_Features(profile){
    const data_notes = await Get_Notes();
    const data_tasks = await Get_Tasks();
    const data_schedule = await Get_Schedule();
    const data_settings = await Get_Settings();
    console.log(data_notes);
    console.log(data_tasks);
    console.log(data_schedule);
    console.log(data_settings);
    return(fetch('http://localhost:3001/features', {
        method: 'POST',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify({
            "Profile_ID":profile.ID, 
            "Profile_Email":profile.Email, 
            "Profile_Username":profile.Username, 
            "Schedule_ID":data_schedule.ID, 
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
            console.log(e);
        })
    );
};