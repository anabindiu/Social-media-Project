import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const pad = function(num){return ('00'+num).slice(-2) };

export const Convert_Date_Notes = (conv_date) =>{
    conv_date = new Date(conv_date);
    if(isNaN(Date.parse(conv_date.toString()))){
        return "NULL";
    }
    console.log(conv_date);
    const date = conv_date.toLocaleDateString().split("/");
    const time = conv_date.toLocaleTimeString(undefined, {hour12:false}).split(":");
    const date_time = `${date[2]}-${pad(date[1])}-${pad(date[0])}T${time[0]}:${pad(time[1])}:${pad(time[2])}`;
    console.log(date_time);
    return `\"${date_time}\"`;
}

export function Failed_To_Connect(e){
    if(e.message == "Failed to fetch"){
        alert("Failed to connect to the database, please try again later...");
        window.location.href = 'http://localhost:3000/';
    }
}

export const Convert_Date_Tasks = (date) =>{
    if(isNaN(Date.parse(date.toString()))){
        return "NULL";
    }
    date = date.getFullYear()        + '-' +
            pad(date.getMonth() + 1) + '-' +
            pad(date.getDate())      + ' ' +
            pad(date.getHours())     + ':' +
            pad(date.getMinutes())   + ':' +
            pad(date.getSeconds());
    return `\"${date}\"`;
}