const db = require('./db');
const mysql = require('mysql');

async function getAll(){
    const data = await db.query(
        `SELECT Profile_ID, Schedule_ID, Notes_ID, Tasks_ID, Setting_ID
        FROM features`
    );
    return(data);
}

async function getOne(key_type, key_value){
    const data = await db.query(
        `SELECT Profile_ID, Schedule_ID, Notes_ID, Tasks_ID, Setting_ID
        FROM features
        WHERE ${key_type}=${key_value}`
    );
    return(data);
}

async function create(body){
    const result = await db.query(
        `INSERT INTO features 
        (Profile_ID, Schedule_ID, Notes_ID, Tasks_ID, Setting_ID) 
        VALUES 
        (`+mysql.escape(body.Profile_ID)+`, ${body.Schedule_ID}, ${body.Notes_ID}, ${body.Tasks_ID}, ${body.Setting_ID})`
    );
    
    return result;
}

async function update(key_type, key_value, body){
    const result = await db.query(
        `UPDATE features 
        SET Profile_ID=${body.Profile_ID}, Schedule_ID=${body.Schedule_ID}, Notes_ID=${body.Notes_ID}, Tasks_ID=${body.Tasks_ID}, Setting_ID=${body.Setting_ID}
        WHERE ${key_type}=${key_value}` 
    );
    
    return result;
}

async function remove(key_type, key_value){
    const result = await db.query(
        `DELETE FROM features WHERE ${key_type}=${key_value}`
    );
    
    return result;
}

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
}