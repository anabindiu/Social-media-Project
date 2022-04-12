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
            console.log(result.data[0]);
            return(result.data[0])
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
            console.log(result.data[0]);
            return(result.data[0])
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
            console.log(result.data[0]);
            return(result.data[0])
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
            console.log(result.data[0]);
            return(result.data[0])
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
            console.log(result.data[0]);
            return(result.data[0])
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
            console.log(result.data[0]);
            return(result.data[0])
        })
        .catch(e => {
            console.log(e);
        })
    );
};

export async function Create_Profile(formData){
    return(fetch(`http://localhost:3001/profile`, {
            method: 'POST',
            headers: new Headers({'content-type': 'application/json'}),
            body: JSON.stringify({"Email": formData.Email, "Username":formData.Username, "Password":formData.Password, "B_Date" : formData.B_Date, "Profile_Pic" : 'NULL'}),
        })
        .then(function(response){
            if(!response.ok){
                throw new Error("HTTP error " + response.status);
            }   
            return response.json();
        })
        .then(result => {
            console.log(result.data[0]);
            return(result.data[0])
        })
        .catch(e => {
            console.log(e);
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