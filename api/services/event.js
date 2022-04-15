const db = require('./db');
const mysql = require('mysql')

async function getAll(){
    const data = await db.query(
        `SELECT ID, Schedule_ID, Title, Description, Location, Day, Start_Time, End_Time, Label
        FROM event`
    );
    return(data);
}

async function getOne(key_type, key_value){
    const data = await db.query(
        `SELECT ID, Schedule_ID, Title, Description, Location, Day, Start_Time, End_Time, Label
        FROM event
        WHERE ${key_type}= ` + (mysql.escape(key_value))
    );
    return(data);
}

async function create(body){
    const result = await db.query(
        `INSERT INTO event 
        (Schedule_ID, Title, Description, Location, Day, Start_Time, End_Time, Label) 
        VALUES 
        (` + mysql.escape(body.Schedule_ID) + `,` + mysql.escape(body.Title) + `, ` + mysql.escape(body.Description) + `, ` + mysql.escape(body.Location) + `, ` + mysql.escape(body.Day) + `, ` + mysql.escape(body.Start_Time) + `, ` + mysql.escape(body.End_Time) + `, ` + mysql.escape(body.Label) +`)`
    );
    
    return result;
}

async function update(key_type, key_value, body){
    const result = await db.query(
        `UPDATE event 
        SET Schedule_ID=${body.Schedule_ID}, Title="${body.Title}", Description="${body.Description}", Location="${body.Location}", Day="${body.Day}", Start_Time=${body.Start_Time}, End_Time=${body.End_Time}, Label="${body.Label}"
        WHERE ${key_type}=` + (mysql.escape(key_value)) 
    );
    
    return result;
}

async function remove(key_type, key_value){
    const result = await db.query(
        `DELETE FROM event WHERE ${key_type}=` + (mysql.escape(key_value))
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