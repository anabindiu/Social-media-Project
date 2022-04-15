const db = require('./db');
const mysql = require('mysql');

async function getAll(){
    const data = await db.query(
        `SELECT ID, Profile_ID
        FROM notes`
    );
    return(data);
}

async function getOne(key_type, key_value){
    const data = await db.query(
        `SELECT ID, Profile_ID
        FROM notes
        WHERE ${key_type}=`+mysql.escape(key_value)
    );
    return(data);
}

async function create(body){
    const result = await db.query(
        `INSERT INTO notes 
        (Profile_ID) 
        VALUES 
        (`+mysql.escape(body.Profile_ID)+`)`
    );
    
    return result;
}

async function update(key_type, key_value, body){
    const result = await db.query(
        `UPDATE notes 
        SET Profile_ID=`+mysql.escape(body.Profile_ID)+`
        WHERE ${key_type}=`+mysql.escape(key_value)+`` 
    );
    
    return result;
}

async function remove(key_type, key_value){
    const result = await db.query(
        `DELETE FROM notes WHERE ${key_type}=`+mysql.escape(key_value)+``
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