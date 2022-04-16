const db = require('./db');
const mysql = require('mysql')

async function getAll(){
    const data = await db.query(
        `SELECT ID, Profile_ID, Date_Format, Time_Format, TimeZone, Language, Theme, Country, Notification
        FROM settings`
    );
    return(data);
}

async function getOne(key_type, key_value){
    const data = await db.query(
        `SELECT ID, Profile_ID, Date_Format, Time_Format, TimeZone, Language, Theme, Country, Notification
        FROM settings
        WHERE ${key_type}=`+mysql.escape(key_value)+``
    );
    return(data);
}

async function create(body){
    const result = await db.query(
        `INSERT INTO settings 
        (Profile_ID, Date_Format, Time_Format, TimeZone, Language, Theme, Country, Notification) 
        VALUES 
        (`+mysql.escape(body.Profile_ID)+`, `+mysql.escape(body.Date_Format)+`, `+mysql.escape(body.Time_Format)+`, `+mysql.escape(body.TimeZone)+`, `+mysql.escape(body.Language)+`, `+mysql.escape(body.Theme)+`, `+mysql.escape(body.Country)+`, `+mysql.escape(body.Notification)+`)`
    );
    
    return result;
}

async function update(key_type, key_value, body){
    const result = await db.query(
        `UPDATE settings 
        SET Profile_ID=`+mysql.escape(body.Profile_ID)+`, Date_Format=`+mysql.escape(body.Date_Format)+`, Time_Format=`+mysql.escape(body.Time_Format)+`, TimeZone=`+mysql.escape(body.TimeZone)+`, Language=`+mysql.escape(body.Language)+`, Theme=`+mysql.escape(body.Theme)+`, Country=`+mysql.escape(body.Country)+`, Notification=`+mysql.escape(body.Notification)+`
        WHERE ${key_type}=`+mysql.escape(key_value)+`` 
    );
    
    return result;
}

async function remove(key_type, key_value){
    const result = await db.query(
        `DELETE FROM settings WHERE ${key_type}=`+mysql.escape(key_value)+``
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
